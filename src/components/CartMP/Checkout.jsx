import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Context } from "./ContextProvider";
import { getCookiesByName } from "../../utils/formsUtils";
import { Link } from "react-router-dom";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";

const Checkout = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const {
    preferenceId,
    isLoading: disabled,
    orderData,
    setOrderData,
  } = useContext(Context);
  const [products, setProducts] = useState([]);

  const token = getCookiesByName("jwtCookie");
  const { user } = JSON.parse(atob(token.split(".")[1]));
  const cid = user.cart;
  const userRol = user.rol;

  useEffect(() => {
    const quantityChanged = products.some(
      (product) => product.quantity !== product.initialQuantity
    );

    if (quantityChanged) {
      const fetchData = async () => {
        try {
          const token = getCookiesByName("jwtCookie");
          if (!cid) return;
          const response = await fetch(`${HOST}/api/carts/${cid}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              rol: userRol,
            },
            body: JSON.stringify(products),
            credentials: "include",
          });

          const result = await response.json();
          Swal.fire({
            position: "center-start",
            title: ` ${result.respuesta} `,
            icon: "info",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          console.error(`Hubo un error al actualizar, ${error}`);
        }
      };
      fetchData();
    }
  }, [products, cid, userRol]);

  const shoppingCartClass = classnames("shopping-cart dark", {
    "shopping-cart--hidden": !isVisible,
  });

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId]);

  const updatePrice = (event, productId) => {
    const quantity = parseInt(event.target.value);

    // Validar que la cantidad
    if (isNaN(quantity) || quantity <= 0) {
      Swal.fire({
        title: `Cantidad inválida. Por favor, ingrese un número positivo`,
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    }

    // Actualiza solo el producto específico
    const updatedProducts = orderData.products.map((product) => {
      if (product.id === productId) {
        setProducts([{ id_prod: product.id, quantity: quantity }]);

        if (quantity > product.stock) {
          Swal.fire({
            title: `Cantidad inválida. Supera el stock disponible`,
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });

          return;
        }

        return {
          ...product,
          quantity: quantity,
        };
      }
      return product;
    });

    // Calcular el nuevo total y actualizar el estado
    const totalPrice = updatedProducts.reduce(
      (acc, product) => acc + product.unit_price * product.quantity,
      0
    );

    setOrderData({
      ...orderData,
      products: updatedProducts,
      quantity: updatedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      ),
      amount: totalPrice,
    });
  };

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(
        `${HOST}/api/carts/${cid}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            rol: userRol,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const updatedProducts = orderData.products.filter(
          (product) => product.id !== productId
        );
        const totalPrice = updatedProducts.reduce(
          (acc, product) => acc + product.unit_price * product.quantity,
          0
        );

        setOrderData({
          ...orderData,
          products: updatedProducts,
          amount: totalPrice,
        });
        Swal.fire({
          title: `Se elimino un producto del carrito.`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error al eliminar producto: ${errorData}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(`${error}`);
    }
  };

  const emptyCart = async () => {
    try {
      const response = await fetch(`${HOST}/api/carts/${cid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          rol: userRol,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        // Vaciar exitosamente
        setOrderData({
          ...orderData,
          products: [],
          amount: 0,
        });
        Swal.fire({
          position: "center-start",
          title: `Carrito vacio`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error al vaciar el carrito: ${errorData}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(`${error}`);
    }
  };

  return (
    <section className={shoppingCartClass}>
      <div className="containerPayment" id="containerPayment">
        <div className="block-heading">
          <h2>Carrito de compra</h2>
          <p>Checkout Pro con Mercado Pago</p>
        </div>
        <div className="content">
          {orderData.products.length === 0 ? (
            <>
              <p>Su carrito se encuentra vacío</p>
              <Link to={`/`}>Ver más productos</Link>
            </>
          ) : (
            <div className="row">
              <div className="col-md-12 col-lg-8">
                {orderData.products.map((product) => (
                  <div className="items" key={product.id}>
                    <div className="product">
                      <div className="info">
                        <div className="product-details">
                          <div className="row justify-content-md-center">
                            <div className="col-md-3">
                              <img
                                className="img-fluid mx-auto d-block image"
                                alt="Image of a product"
                                src={`${HOST}/static/products/img/${product.img}`}
                              />
                            </div>
                            <div className="col-md-4 product-detail">
                              <h5>Producto</h5>
                              <div className="product-info">
                                <b>Titulo: </b>
                                <span id="product-description">
                                  {product.title}
                                </span>
                                <br />
                                <b>Descripción: </b> {product.description}
                                <br />
                                <b>Precio unitario:</b> $
                                <span id="unit-price">
                                  {" "}
                                  {product.unit_price}
                                </span>
                                <br />
                              </div>
                            </div>
                            <div className="col-md-3 product-detail">
                              <label htmlFor="quantity">
                                <b>Quantity</b>
                              </label>
                              <input
                                onChange={(event) =>
                                  updatePrice(event, product.id)
                                }
                                type="number"
                                id="quantity"
                                value={product.quantity}
                                min="1"
                                max={product.stock}
                                className="form-control"
                              />
                              <button
                                className="btn btn-danger"
                                onClick={() => removeProduct(product.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-12 col-lg-4">
                <button
                  className="btn btn-danger btn-lg btn-block"
                  onClick={emptyCart}
                  disabled={disabled}
                >
                  Vaciar Carrito
                </button>
                <div className="summary">
                  <h3>Carrito</h3>
                  <div className="summary-item">
                    <span className="text">Subtotal</span>
                    <span className="price" id="cart-total">
                      ${orderData.amount}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={onClick}
                    id="checkout-btn"
                    disabled={disabled}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Checkout.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Checkout;

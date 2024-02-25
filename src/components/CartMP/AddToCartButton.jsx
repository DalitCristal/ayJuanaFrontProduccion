import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST } from "../../config/config";
import { getInfoProduct } from "../../utils/getInfoProduct";
import Swal from "sweetalert2";

const AddToCartButton = ({ productId, quantity, onClick }) => {
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const token = getCookiesByName("jwtCookie");
  const user = token ? JSON.parse(atob(token.split(".")[1])).user : null;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cid = user.cart;
        if (!cid) return;

        const response = await fetch(`${HOST}/api/carts/${cid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.status === 200) {
          setCartProducts(data.mensaje.products);
        } else {
          console.error(`Error al obtener datos del carrito: ${data.mensaje}`);
        }
      } catch (error) {
        console.error(
          `Error inesperado al obtener datos del carrito: ${error} `
        );
      }
    };

    fetchCart();
  }, [user.cart, token]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      const existingProduct = cartProducts.find(
        (product) => product.id_prod._id === productId
      );

      if (existingProduct) {
        Swal.fire({
          text: "Este producto ya se encuentra dentro del carrito, desea actualizar su cantidad?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, agregar!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const newQuantity = existingProduct.quantity + quantity;

            try {
              const response = await fetch(
                `${HOST}/api/carts/${user.cart}/products/${productId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ quantity: newQuantity }),
                  credentials: "include",
                }
              );

              if (response.status === 200) {
                // Cantidad del producto actualizada exitosamente en el carrito
                const infoResponse = await response.json();

                Swal.fire({
                  title: infoResponse.respuesta,
                  icon: "success",
                });
              } else {
                // Manejar otros casos si es necesario
                const errorData = await response.json();
                Swal.fire({
                  title: `Error al actualizar la cantidad del producto en el carrito: ${errorData} `,
                  icon: "error",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            } catch (error) {
              console.error(`${error}`);
            }
          }
        });
      } else {
        if (user.rol === "premium") {
          // Validar si el producto pertenece al usuario premium
          const product = await getInfoProduct(productId);

          if (product.owner === user._id) {
            Swal.fire({
              title: "No puedes comprar tus propios productos",
              confirmButtonColor: "#ce5b83",
            });
            return;
          }
        }

        const response = await fetch(
          `${HOST}/api/carts/${user.cart}/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
            credentials: "include",
          }
        );

        if (response.status === 200) {
          // Producto agregado exitosamente al carrito
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado exitosamente al carrito",
            showConfirmButton: false,
            timer: 1500,
          });

          if (onClick) {
            onClick();
          }
        } else {
          // Manejar otros casos si es necesario
          const errorData = await response.json();
          Swal.fire({
            title: `Error al agregar producto al carrito: ${errorData} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (error) {
      console.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        "Agregando al carrito..."
      ) : (
        <button
          className="btnItemCount"
          onClick={handleAddToCart}
          disabled={loading}
        >
          Agregar al carrito
        </button>
      )}
    </>
  );
};

AddToCartButton.propTypes = {
  productId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default AddToCartButton;

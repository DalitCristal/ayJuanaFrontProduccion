import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { getCookiesByName } from "../../utils/formsUtils.js";
import Payment from "./Payment.jsx";
import Checkout from "./Checkout.jsx";
import Footer from "./Footer.jsx";
import InternalProvider from "./ContextProvider.jsx";
import { SpinnerCircular } from "spinners-react";
import { HOST } from "../../config/config.js";
import "./PaymentMP.css";
import Swal from "sweetalert2";

initMercadoPago("TEST-407be8c1-5b10-4b61-9b70-8373e6ee14f4", {
  locale: "es-AR",
});

const PaymentMP = () => {
  const { userId } = useParams();
  const [preferenceId, setPreferenceId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    products: [],
    quantity: 0,
    amount: 0,
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = getCookiesByName("jwtCookie");
        if (!token) return;

        const { user } = JSON.parse(atob(token.split(".")[1]));
        const cid = user.cart;

        const response = await fetch(`${HOST}/api/carts/${cid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 200) {
          const totalPrice = data.mensaje.products.reduce(
            (acc, product) => acc + product.id_prod.price * product.quantity,
            0
          );
          const totalQuantity = data.mensaje.products.reduce(
            (acc, product) => acc + product.quantity,
            0
          );

          setOrderData((prevOrderData) => ({
            ...prevOrderData,
            quantity: totalQuantity,
            amount: totalPrice,
            products: data.mensaje.products.map((product) => ({
              id: product.id_prod._id,
              title: product.id_prod.title,
              description: product.id_prod.description,
              unit_price: Number(product.id_prod.price),
              quantity: product.quantity,
              img: product.id_prod.thumbnails[0].name,
              stock: product.id_prod.stock,
              category: product.id_prod.category,
            })),
          }));
        } else {
          Swal.fire({
            title: `${data.mensaje} `,
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error inesperado, ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    fetchCart();
  }, [userId]);

  const createPreference = async () => {
    setIsLoading(true);
    fetch(`${HOST}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPreferenceId(data);
        return data;
      })
      .catch((error) => {
        Swal.fire({
          title: `${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular сolor="#009EE3" />
        </div>
      );
    }
  };

  return (
    <>
      <InternalProvider
        context={{ preferenceId, isLoading, orderData, setOrderData }}
      >
        <main className="mainPayment">
          {renderSpinner()}
          <Checkout onClick={createPreference} />
          <Payment />
        </main>
        <Footer />
      </InternalProvider>
    </>
  );
};

export default PaymentMP;

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";

const CartWidget = () => {
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = getCookiesByName("jwtCookie");
        console.log("TOKEN", token);
        if (!token) return;
        const { user } = JSON.parse(atob(token.split(".")[1]));
        console.log("TOKEN DECODIFICADO", user);
        const id = user.cart;
        setUserId(user._id);

        const response = await fetch(`${HOST}/api/carts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            rol: user.rol,
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.status === 200) {
          console.log(data.mensaje);
          setTotalQuantity(
            data.mensaje.products.reduce(
              (acc, product) => acc + product.quantity,
              0
            )
          );
        } else {
          console.log(data);
          Swal.fire({
            title: `Error al obtener la cantidad total del carrito `,
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error(
          `Error inesperado al obtener la cantidad total del carrito: ${error}`
        );
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="cartMenu">
      <Link to={`/cart/${userId}`}>
        <ShoppingCartIcon />
        {totalQuantity}
      </Link>
    </div>
  );
};

export default CartWidget;

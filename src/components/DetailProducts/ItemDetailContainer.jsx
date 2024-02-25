//STYLES
import "./ItemDetailContainer.css";
//COMPONENTS
import ItemDetail from "./ItemDetail.jsx";
//HOOKS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HOST } from "../../config/config.js";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${HOST}/api/products/${id}`, {
          method: "GET",
        });

        if (response.status === 200) {
          const productData = await response.json();
          setProduct(productData.mensaje);
        } else {
          console.error(
            `Error en la solicitud de información: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`Error en la solicitud de información: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="ItemDetailContainer" key={id}>
      {loading ? (
        "Cargando..."
      ) : product ? (
        <ItemDetail product={product} />
      ) : null}
    </div>
  );
};

export default ItemDetailContainer;

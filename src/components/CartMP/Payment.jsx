import classnames from "classnames";
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";
import { useContext, useState } from "react";

const Payment = () => {
  const { preferenceId, orderData } = useContext(Context);

  const [isReady, setIsReady] = useState(false);

  const paymentClass = classnames("payment-form dark", {
    "payment-form--hidden": !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId, redirectMode: "self" }}
        onReady={handleOnReady}
      />
    );
  };

  return (
    <div className={paymentClass}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Pago de caja</h2>
          <p>Este es un ejemplo de integración de Mercado Pago</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Resumen</h2>
            {orderData.products.map((product) => (
              <div key={product.id} className="item">
                <span className="price" id="summary-price">
                  ${product.unit_price}
                </span>
                <p className="item-name">
                  {product.title} X
                  <span id="summary-quantity">{product.quantity}</span>
                </p>
              </div>
            ))}
            <div className="total">
              Total
              <span className="price" id="summary-total">
                ${orderData.amount}
              </span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

import Header from "../Header/Header";

const Failure = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h1>¡Oops! Hubo un problema.</h1>
        <p>Lamentablemente, no pudimos procesar tu pago en este momento.</p>
        <p>
          Por favor, verifica la información de tu tarjeta y asegúrate de que
          haya suficientes fondos disponibles. Si todo parece estar en orden, te
          recomendamos intentarlo nuevamente más tarde.
        </p>
      </div>
    </>
  );
};

export default Failure;

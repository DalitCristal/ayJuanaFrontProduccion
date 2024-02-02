import Header from "../../components/Header/Header";

const Unauthorized = () => {
  const style = {
    titulo: {
      color: "#ff0000",
      textAlign: "center",
      marginTop: "50px",
    },
  };
  return (
    <>
      <Header />
      <h1 style={style.titulo}>Usuario no autorizado</h1>
    </>
  );
};

export default Unauthorized;

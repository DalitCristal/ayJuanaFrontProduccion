import NewProductForm from "../../components/ProductsAdmin/Create/NewProductForm.jsx";
import Header from "../../components/Header/Header.jsx";

const NewProduct = () => {
  const handleSubmit = (e, formSubmitCallback) => {
    formSubmitCallback(e);
  };

  return (
    <>
      <Header />
      <NewProductForm onSubmit={handleSubmit} />
    </>
  );
};

export default NewProduct;

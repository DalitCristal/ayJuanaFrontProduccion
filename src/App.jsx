//REACT
import { BrowserRouter, Route, Routes } from "react-router-dom";

//PAGES
import Home from "./pages/Home/Home.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword.jsx";
import SignOff from "./pages/SignOff/SignOff.jsx";
import Details from "./pages/Products/Details.jsx";
import Category from "./pages/Products/Category.jsx";
import PutPassword from "./pages/Profile/PutPassword.jsx";
//import Contact from "./pages/Contact.jsx";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";
import Error from "./pages/Error.jsx";

//PÁGINAS PROTEGIDAS
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import AdminProducts from "./pages/Products/AdminProducts.jsx";
import NewProduct from "./pages/Products/NewProduct.jsx";
import EditProd from "./pages/Products/EditProd.jsx";
import DeleteProd from "./pages/Products/DeleteProd.jsx";
import GetUsersAdmin from "./pages/UsersAdmin/GetUsersAdmin.jsx";
import EditRol from "./pages/UsersAdmin/EditRol.jsx";
import DeleteUsersAdmin from "./pages/UsersAdmin/DeleteUsersAdmin.jsx";
import GetProfile from "./pages/Profile/GetProfile.jsx";
import DeleteProfile from "./pages/Profile/DeleteProfile.jsx";
import LogViewer from "./pages/Loggers/LogViewer.jsx";
import { LoggerProvider } from "./components/AdminDashboard/LoggerContext.jsx";

//STYLES
import "./App.css";

import PaymentSuccess from "./components/CartMP/PaymentSuccess.jsx";
import Failure from "./components/CartMP/Failure.jsx";
import Pending from "./components/CartMP/Pending.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <LoggerProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/login/forgot-password"
              element={<RecoverPassword />}
            />
            <Route path="/logout" element={<SignOff />} />

            <Route path="/product/:id" element={<Details />} />
            <Route path="/category/:categoryName" element={<Category />} />

            <Route path="/edit-profile/:userId" element={<PutPassword />} />

            <Route
              path="/cart/:userId"
              element={
                <ProtectedRoute role={["admin", "user", "premium"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/success"
              element={
                <ProtectedRoute role={["admin", "user", "premium"]}>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/failure"
              element={
                <ProtectedRoute role={["admin", "user", "premium"]}>
                  <Failure />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/pending"
              element={
                <ProtectedRoute role={["admin", "user", "premium"]}>
                  <Pending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute role={["admin", "premium"]}>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/create"
              element={
                <ProtectedRoute role={["admin", "premium"]}>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/edit/:productId"
              element={
                <ProtectedRoute role={["admin", "premium"]}>
                  <EditProd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/delete/:productId"
              element={
                <ProtectedRoute role={["admin", "premium"]}>
                  <DeleteProd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute role={"admin"}>
                  <GetUsersAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <ProtectedRoute role={"admin"}>
                  <EditRol />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/delete"
              element={
                <ProtectedRoute role={"admin"}>
                  <DeleteUsersAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <GetProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/delete/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <DeleteProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/loggers"
              element={
                <ProtectedRoute role={"admin"}>
                  <LogViewer />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </LoggerProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

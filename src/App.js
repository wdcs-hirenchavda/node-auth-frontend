import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupNew from "./components/SignupNew";
import "./App.css";
import Login from "./components/Login";
import About from "./components/About";
import Navbar1 from "./components/Navbar1";
import Products from "./components/Products";
import User from "./components/User";
import { productContext } from "./components/Context";
import { useState } from "react";
import CartItems from "./components/CartItems";
import SetNewPassword from "./components/SetNewPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const [cartCount, setCartCount] = useState(
    localStorage.cartCounter ? JSON.parse(localStorage.cartCounter) : []
  );
  const counter = (data) => {
    setCartCount(data);
    localStorage.setItem("cartCounter", JSON.stringify(data));
  };

  return (
    <div className="App">
      <productContext.Provider
        value={{
          cartCount,
          counter,
        }}
      >
        <BrowserRouter>
          <Navbar1 />
          <Routes>
            <Route element={<PrivateRoutes/>}>
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Products />} />
            <Route path="/user" element={<User />} />
            <Route path="/cartItems" element={<CartItems />} />
            <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/setNewPassword" element={<SetNewPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupNew />} />
          </Routes>
        </BrowserRouter>
      </productContext.Provider>
    </div>
  );
}

export default App;

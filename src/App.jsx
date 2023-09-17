import "./App.css";
import React, { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../src/Components/Layout/Layout";
import Home from "../src/Components/Home/Home";
import Login from "../src/Components/Login/Login";
import Register from "../src/Components/Register/Register";
import error from "../src/images/error.svg";
import Brands from "./Components/Brands/Brands";
import Product from "./Components/Product/Product";
import ProductsOfBrand from "./Components/ProductsOfBrand/ProductsOfBrand";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const getUserData = function () {
    const userData = jwtDecode(localStorage.getItem("tkn"));
    setCurrentUser(userData);
  };
  const clearUserData = function () {
    localStorage.removeItem("tkn");
    setCurrentUser(null);
  };
  const ProtectedRoute = function ({ children }) {
    if (currentUser == null) {
      return <Navigate to="/login" />;
    } else {
      return <>{children}</>;
    }
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Layout currentUser={currentUser} clearUserData={clearUserData} />
      ),
      children: [
        {
          path: "",
          element: (
            <WishlistContextProvider>
              <Home />
            </WishlistContextProvider>
          ),
        },
        {
          path: "home",
          element: (
            <WishlistContextProvider>
              <Home />
            </WishlistContextProvider>
          ),
        },
        { path: "login", element: <Login getUserData={getUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <WishlistContextProvider>
                <Product />
              </WishlistContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "productsofbrand/:id",
          element: (
            <ProtectedRoute>
              <WishlistContextProvider>
                <ProductsOfBrand />
              </WishlistContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishlistContextProvider>
                <Wishlist currentUser={currentUser} />
              </WishlistContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <div className="text-center py-2">
              <img src={error} alt="error 404" />
            </div>
          ),
        },
      ],
    },
  ]);
  useEffect(function () {
    if (localStorage.getItem("tkn") != null && currentUser == null) {
      getUserData();
    }
  }, []);
  return (
    <>
      <Toaster />
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </>
  );
};

export default App;

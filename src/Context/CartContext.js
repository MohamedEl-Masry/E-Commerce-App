import axios from "axios";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [numOfCartItems, setNumOfCartItem] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [statusRes, setStatusRes] = useState(false);

  const addToCart = async function (proId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: proId,
        },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setNumOfCartItem(data.numOfCartItems);
      getLoggedUserCart();
      if (data.status === "success") {
        toast.success(data.message, { duration: 2000, className: "mt-5" });
      }
    } catch (error) {
      toast.error("Error", { duration: 2000, className: "mt-5" });
    }
  };
  const clearItem = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      getLoggedUserCart();

      if (data.status === "success") {
        toast.success("You have deleted a product", {
          duration: 2000,
          className: "mt-5",
        });
      }
    } catch (error) {
      toast.error("Error", { duration: 2000, className: "mt-5" });
    }
  };
  const updateProductCount = async (id, count) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      getLoggedUserCart();
      if (data.status === "success") {
        toast.success("You clear Item", {
          duration: 2000,
          className: "mt-5",
        });
      }
    } catch (error) {
      toast.error("Error", { duration: 2000, className: "mt-5" });
    }
  };
  const onlinePayment = async (cartId, shippingAddress) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      if (data.status === "success") window.location.href = data.session.url;
      getLoggedUserCart();
      toast.success(data.message, { duration: 2000, className: "mt-5" });
    } catch (error) {
      toast.error("Error", { duration: 2000, className: "mt-5" });
    }
  };
  const getLoggedUserCart = async function () {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("tkn") } }
      );
      if (data.status === "success") {
        setNumOfCartItem(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartId(data.data._id);
        setStatusRes(true);
      }
    } catch (error) {
      if (!localStorage.getItem("") === "") {
        toast.error("Error", { duration: 2000, className: "mt-5" });
      }
    }
  };
  useEffect(() => {
    getLoggedUserCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        addToCart,
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        clearItem,
        updateProductCount,
        onlinePayment,
        cartId,
        setNumOfCartItem,
        getLoggedUserCart,
        statusRes,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;

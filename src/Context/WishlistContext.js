import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const wishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [allMyWishlist, setAllMyWishlist] = useState([]);
  const [count, setCount] = useState(null);

  const addToWishlist = async (proId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: proId },
        { headers: { token: localStorage.getItem("tkn") } }
      );

      setAllMyWishlist(data.data);
      getLoggedUserWishlist();
      if (data.status === "success") {
        toast.success(data.message, {
          duration: 2000,
          className: "mt-5",
        });
      }
    } catch (error) {
      toast.error("Please sign in", { duration: 2000, className: "mt-5" });
    }
  };
  const getLoggedUserWishlist = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("tkn") } }
      );
      if (data.status === "success") {
        setCount(data.count);
        setAllMyWishlist(data.data);
      }
    } catch (error) {
      if (!localStorage.getItem("") === "") {
        toast.error("Error", { duration: 2000, className: "mt-5" });
      }
    }
  };
  const removProductFromWishlist = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      getLoggedUserWishlist();
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

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);
  return (
    <>
      <wishlistContext.Provider
        value={{
          addToWishlist,
          allMyWishlist,
          count,
          removProductFromWishlist,
        }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
};

export default WishlistContextProvider;

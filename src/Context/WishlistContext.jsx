import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState({});
  const [token, setToken] = useState(localStorage.getItem("user") || "");
  let headers = {
    token: localStorage.getItem("user"),
  };

  async function getProductinWishlist() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then(response => response)
      .catch(error => error);
  }

  useEffect(() => {
    if (token) {
      getProductinWishlist().then(response => {
        if (response && response.data) {
          const wishlistItems = response.data.data.reduce((acc, item) => {
            acc[item._id] = true;
            return acc;
          }, {});
          setWishlist(wishlistItems);
          localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
      });
    } else {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
      setWishlist(savedWishlist);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  async function addProductWishlist(productId) {
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers })
      .then(response => {
        setWishlist(prevWishlist => ({
          ...prevWishlist,
          [productId]: true,
        }));
        toast.success("Product added to wishlist");
        return response;
      })
      .catch(error => {
        return error;
      });
  }

  async function deleteProductinWishlist(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
      .then(response => {
        setWishlist(prevWishlist => {
          const updatedWishlist = { ...prevWishlist };
          delete updatedWishlist[productId];
          return updatedWishlist;
        });
        toast.error("Product removed from wishlist");
        return response;
      })
      .catch(error => {
        return error;
      });
  }

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("user", newToken);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addProductWishlist,
        getProductinWishlist,
        deleteProductinWishlist,
        updateToken,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}

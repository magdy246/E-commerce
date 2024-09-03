import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";


export let WishlistContext = createContext();
export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("user"),
  };
  async function addProductWishlist(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("success");
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function getProductinWishlist() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function deleteProductinWishlist(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductWishlist,
        getProductinWishlist,
        deleteProductinWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}

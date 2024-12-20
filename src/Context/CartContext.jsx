import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [numOfCart, setNumOfCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  let headers = {
    token: localStorage.getItem("user"),
  };

  async function addProductCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setCartId(response?.data?.data?._id);
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        toast.success("success");
        return response;
      })
      .catch((error) => {
        toast.error(error);
        error;
      });
  }

  async function getProductinCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => {
        setCartId(response?.data?.data?._id);
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function deleteProductinCart(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        toast.error("removed");
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function updateProductinCart(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setCartId(response?.data?.data?._id);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function deleteAllCart() {
    return await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => {
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        toast.error("Cart already deleted");
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function onlinPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-one-tau-30.vercel.app`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => {
        window.location.href = response.data.session.url;
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function cashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setNumOfCart(response?.data?.numOfCartItems);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        window.location.href = "https://e-commerce-one-tau-30.vercel.app";
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <CartContext.Provider
      value={{
        addProductCart,
        getProductinCart,
        deleteProductinCart,
        updateProductinCart,
        deleteAllCart,
        onlinPayment,
        cashPayment,
        numOfCart,
        totalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

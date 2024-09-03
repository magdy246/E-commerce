import { createContext, useEffect, useState } from "react";

export let WishlistClassContext = createContext();

export default function WishlistClassContextProvider(props) {
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistClassContext.Provider value={{ wishlist, setWishlist }}>
      {props.children}
    </WishlistClassContext.Provider>
  );
}

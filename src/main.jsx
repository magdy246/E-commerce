import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterContextProvider from "./Context/CounterContext.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";
import WishlistClassContextProvider from "./Context/WishlistClassContext.jsx";

createRoot(document.getElementById("root")).render(
  <WishlistClassContextProvider>
    <WishlistContextProvider>
      <CartContextProvider>
        <TokenContextProvider>
          <CounterContextProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </CounterContextProvider>
        </TokenContextProvider>
      </CartContextProvider>
    </WishlistContextProvider>
  </WishlistClassContextProvider>
);

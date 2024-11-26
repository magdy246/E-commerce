import "./App.css";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Categories from "./components/Categories/Categories";
import Product from "./components/Product/Product";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import ProtectedRouterLog from "./components/ProtectedRouterLog/ProtectedRouterLog";
import ProductDetails from "./components/ProductDeatils/ProductDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ToasterComponent from "./components/ToasterComponent/ToasterComponent";
import SpacificProducts from "./components/SpacificProducts/SpacificProducts";
import AllOrders from "./components/AllOrders/AllOrders";
import CheckOut from "./components/CheckOut/CheckOut";
import SpacificBrands from "./components/SpacificBrands/SpacificBrands";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetCode from "./components/ResetCode/ResetCode";
import NewPassword from "./components/NewPassword/NewPassword";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: "login", element: <ProtectedRouterLog><Login /></ProtectedRouterLog> },
        { path: "forgetpassword", element: <ProtectedRouterLog><ForgetPassword /></ProtectedRouterLog> },
        { path: "newpassword", element: <ProtectedRouterLog><NewPassword /></ProtectedRouterLog> },
        { path: "resetcode", element: <ProtectedRouterLog><ResetCode /></ProtectedRouterLog> },
        { path: "register", element: <ProtectedRouterLog><Register /></ProtectedRouterLog> },
        { path: "products", element: <ProtectedRouter><Product /></ProtectedRouter> },
        { path: "/cate/:category", element: <ProtectedRouter><SpacificProducts /></ProtectedRouter> },
        { path: "/brand/:brand", element: <ProtectedRouter><SpacificBrands /></ProtectedRouter> },
        { path: "productdetails/:id/:category", element: <ProtectedRouter><ProductDetails /></ProtectedRouter> },
        { path: "cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
        { path: "wishlist", element: <ProtectedRouter><Wishlist /></ProtectedRouter> },
        { path: "categories", element: <ProtectedRouter><Categories /></ProtectedRouter> },
        { path: "brands", element: <ProtectedRouter><Brands /></ProtectedRouter> },
        { path: "allorders", element: <ProtectedRouter><AllOrders /></ProtectedRouter> },
        { path: "checkout", element: <ProtectedRouter><CheckOut /></ProtectedRouter> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToasterComponent />
    </QueryClientProvider>
  );
}

export default App;

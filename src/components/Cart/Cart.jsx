import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import FullScreenLoader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleDot,
  faCreditCard,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "flowbite";

export default function Cart() {
  const [cartitem, setCartitem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let {
    getProductinCart,
    deleteProductinCart,
    updateProductinCart,
    deleteAllCart,
    totalPrice,
  } = useContext(CartContext);

  async function getCart() {
    let response = await getProductinCart();
    setCartitem(response?.data?.data?.products);
    setIsLoading(false);
  }

  async function deleteOneItem(productId) {
    let resu = await deleteProductinCart(productId);
    setCartitem(resu?.data?.data?.products);
    setIsLoading(false);
  }

  async function updateOneItem(productId, count) {
    let resu = await updateProductinCart(productId, count);
    setCartitem(resu?.data?.data?.products);
    setIsLoading(false);
  }

  async function deleteCart() {
    await deleteAllCart();
    setCartitem([]);
    setIsLoading(false);
    window.location.reload();
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <div className="p-4 sm:ml-64 min-h-screen">
        <div
          className="shadow-black shadow-lg text-4xl md:text-5xl h-1/3 md:ms-10 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>
            Cart <FontAwesomeIcon className="text-4xl" icon={faCartShopping} />
          </h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading ? (
            FullScreenLoader()
          ) : (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-[#647A67] dark:text-gray-800 font-[Roboto-Bold]">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-20 py-3 text-center">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Total
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartitem.map((items) => (
                    <>
                      <tr
                        key={items?.product?.id}
                        className="border-b dark:bg-[#3C433B] dark:border-[#647A67] dark:hover:bg-[#758173] font-[Roboto-bold]"
                      >
                        <Link
                          to={`/productdetails/${items?.product?._id}/${items?.product?.category.name}`}
                        >
                          <td className="cursor-pointer px-4 py-5 sm:px-2 sm:py-5 dark:bg-[#3C433B] dark:border-[#647A67] text-xs sm:text-sm">
                            <div
                              key={items?.product?.id}
                              className="flex justify-center items-center"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="rounded-lg w-16 h-20 sm:w-24 sm:h-32 md:w-32 md:h-40 lg:w-36 lg:h-48 shadow-sm"
                                  src={items?.product?.imageCover}
                                  alt="Product"
                                />
                              </div>
                            </div>
                          </td>
                        </Link>
                        <td className="px-6 py-4 font-semibold text-xl dark:text-white">
                          {items?.product?.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() =>
                                updateOneItem(
                                  items?.product?.id,
                                  items?.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-[#3C433B] dark:text-gray-400 dark:border-gray-600 dark:hover:bg-[#647A67] dark:hover:border-gray-600 dark:focus:ring-[#647A67]"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>{items?.count}</div>
                            <button
                              onClick={
                                items.count != 0
                                  ? () =>
                                      updateOneItem(
                                        items?.product?.id,
                                        items?.count + 1
                                      )
                                  : deleteOneItem(items?.product?.id)
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-[#3C433B] dark:text-gray-400 dark:border-gray-600 dark:hover:bg-[#647A67] dark:hover:border-gray-600 dark:focus:ring-[#647A67]"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold dark:text-white">
                          <span className="text-gray-300 text-xs md:text-sm">
                            EGP{" "}
                          </span>
                          <span className="text-xl">
                            {items?.price?.toLocaleString()}
                          </span>
                          <span className="text-gray-300 text-xs md:text-sm">
                            {items?.price % 10 === 9 ? ".99" : ".00"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold dark:text-white">
                          <span className="text-gray-300 text-xs md:text-sm">
                            EGP{" "}
                          </span>
                          <span className="text-xl">
                            {(items?.price * items?.count).toLocaleString()}
                          </span>
                          <span className="text-gray-300 text-xs md:text-sm">
                            {(items?.price * items?.count) % 10 === 9
                              ? ".99"
                              : ".00"}
                          </span>{" "}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteOneItem(items?.product?.id)}
                            className="flex justify-center items-center font-medium text-white rounded-lg bg-red-600 dark:bg-red-500 hover:bg-red-600 px-3 py-2"
                          >
                            Remove
                            <FontAwesomeIcon
                              className="ms-3"
                              icon={faTrashCan}
                            />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row  justify-center items-center my-2 md:justify-around md:my-0 font-[Roboto-Bold]">
          {cartitem.length === 0 ? (
            <Link
              to="/"
              className="font-medium mt-7 ms-3 text-white rounded-lg bg-green-600 dark:bg-green-500 hover:bg-green-600 px-3 py-2"
            >
              Go shopping
              <FontAwesomeIcon className="ms-3" icon={faCartShopping} />
            </Link>
          ) : (
            <button
              onClick={() => deleteCart()}
              className="font-medium mt-7 ms-3 text-white rounded-lg bg-red-600 dark:bg-red-500 hover:bg-red-600 px-3 py-2"
            >
              Clear all
              <FontAwesomeIcon className="ms-3" icon={faTrash} />
            </button>
          )}

          <h3 className="font-medium mt-7 ms-3 text-white rounded-lg bg-[#1F241F] dark:bg-[#1F241F] px-3 py-2">
            Total :{" "}
            <span className="text-gray-300 text-xs md:text-sm">EGP </span>
            <span className="text-xl">{totalPrice?.toLocaleString()}</span>
            <span className="text-gray-300 text-xs md:text-sm">
              {totalPrice % 10 === 9 ? ".99" : ".00"}
            </span>
          </h3>

          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="font-medium mt-7 ms-3 text-white rounded-lg bg-blue-600 dark:bg-blue-500 hover:bg-blue-600 px-7 py-2 flex justify-center items-center"
            type="button"
            disabled={cartitem.length === 0}
          >
            Check out
            <FontAwesomeIcon className="ms-3" icon={faCreditCard} />
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-[#1F241F] divide-y divide-[#647A67] rounded-lg shadow w-44 absolute mt-2"
          >
            <ul
              className="py-2 text-sm text-[#3C433B] dark:text-[#8FA38A]"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/checkout"
                  state={{ type: "Online Payment" }}
                  className="block px-4 py-2 hover:bg-[#C5EFCB] dark:hover:bg-[#758173] dark:hover:text-[#B8D2B3]"
                >
                  Online Payment
                  <FontAwesomeIcon
                    className="ms-3 text-sm fa-beat-fade"
                    icon={faCircleDot}
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  state={{ type: "Cash on Delivery" }}
                  className="block px-4 py-2 hover:bg-[#C5EFCB] dark:hover:bg-[#758173] dark:hover:text-[#B8D2B3]"
                >
                  Cash on Delivery
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

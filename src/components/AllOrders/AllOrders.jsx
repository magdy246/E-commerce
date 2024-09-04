import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FullScreenLoader from "../Loader/Loader";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export default function AllOrders() {
  let {id} = jwtDecode(localStorage.getItem("user"))
  

  function getAllorders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }

  const { isLoading, data } = useQuery({
    queryKey: ["getAllorders"],
    queryFn: getAllorders,
  });

  const orders = data?.data
  console.log(orders);

  return (
    <div className="p-4 sm:ml-64 h-full bg-[#Eerie-Black-color] font-[Roboto-bold]">
      <div className="p-4 sm:px-0 2xl:mx-auto">
        <div
          className="text-3xl md:text-5xl h-1/3 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>
            All Orders <FontAwesomeIcon icon={faBasketShopping} />
          </h1>
        </div>
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <div className="space-y-6">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-[#C6DEC6] rounded-lg shadow-lg overflow-x-scroll"
              >
                <h2 className="text-xl font-semibold text-[#3C433B] mb-2">
                  Order ID: {order.id}
                </h2>
                <p className="text-[#020402] mb-1">
                  Customer:{" "}
                  <span className="text-[#647A67]">{order.user.name}</span>
                </p>
                <p className="text-[#020402] mb-1">
                  Total Amount:{" "}
                  <span className="text-[#647A67] text-xs md:text-sm">
                    EGP{" "}
                  </span>
                  <span className="text-xl">
                    {order.totalOrderPrice.toLocaleString()}
                  </span>
                  <span className="text-[#647A67] text-xs md:text-sm">
                    {order.totalOrderPrice % 10 === 9 ? ".99" : ".00"}
                  </span>
                </p>
                <p className="text-[#020402] mb-1">
                  Payment Method:<span className="text-[#647A67]"> {order.paymentMethodType}</span>
                </p>
                <p className="text-[#020402] mb-4">
                  Date:{" "}
                  <span className="text-[#647A67]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

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
                      <th scope="col" className="px-11 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems?.map((item) => (
                      <tr
                        key={item.product.id}
                        className="border-b dark:bg-[#3C433B] dark:border-[#647A67] dark:hover:bg-[#758173] font-[Roboto-bold]"
                      >
                        <Link
                          to={`/productdetails/${item.product._id}/${item.product.category.name}`}
                        >
                          <td className="cursor-pointer px-4 py-5 sm:px-2 sm:py-5 dark:bg-[#3C433B] dark:border-[#647A67] text-xs sm:text-sm">
                            <div className="flex justify-center items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="rounded-lg w-16 h-16 sm:w-36 sm:h-36 shadow-sm"
                                  src={item.product.imageCover}
                                  alt="Product"
                                />
                              </div>
                            </div>
                          </td>
                        </Link>
                        <td className="px-6 py-4 font-semibold text-xl dark:text-white">
                          {item.product.title.split(" ").slice(0, 2).join(" ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <h3 className="text-xl">{item.count}</h3>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold dark:text-white">
                          <span className="text-gray-300 text-xs md:text-sm">
                            EGP{" "}
                          </span>
                          <span className="text-xl">
                            {item.price.toLocaleString()}
                          </span>
                          <span className="text-gray-300 text-xs md:text-sm">
                            {item.price % 10 === 9 ? ".99" : ".00"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold dark:text-white">
                          <span className="text-gray-300 text-xs md:text-sm">
                            EGP{" "}
                          </span>
                          <span className="text-xl">
                            {(item.price * item.count).toLocaleString()}
                          </span>
                          <span className="text-gray-300 text-xs md:text-sm">
                            {(item.price * item.count) % 10 === 9
                              ? ".99"
                              : ".00"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

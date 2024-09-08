import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import { useLocation } from "react-router-dom";

export default function CheckOut() {
  const [usermsg, setUsermsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const { onlinPayment, cashPayment } = useContext(CartContext);
  let { state } = useLocation();
  useEffect(() => {
    setPaymentType(state.type);
  }, []);

  const formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: (values) => {
      payOnline(values);
    },
  });

  async function payOnline(values) {
    setLoading(true);
    setUsermsg("");
    setErrormsg("");
    paymentType == "Online Payment"
      ? await onlinPayment(values)
      : await cashPayment(values)
          .then((response) => {
            setUsermsg("Payment successful!");
          })
          .catch((error) => {
            setErrormsg("Payment failed. Please try again.");
          })
          .finally(() => {
            setLoading(false);
          });
  }

  return (
    <div className="p-4 sm:ml-64 h-full">
      <div
        className="shadow-black shadow-lg text-5xl md:ms-10 px-3 pb-2 mb-11 font-[Roboto-Bold] text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
        id="animation-register"
      >
        <h1>Check out <FontAwesomeIcon className="text-4xl" icon={faCreditCard} /></h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto">
        <h1
          id="animation-payment"
          className="text-2xl mb-3 px-3 py-1 font-[Roboto-Bold] text-[#C5EFCB] bg-[#647A67] w-fit rounded-lg"
        >
          {paymentType}
        </h1>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
          >
            Your city
          </label>
          <input
            placeholder="Enter your city.."
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
          >
            Your details
          </label>
          <input
            placeholder="Enter your details.."
            type="text"
            name="details"
            id="details"
            onChange={formik.handleChange}
            value={formik.values.details}
            className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
          >
            Your phone
          </label>
          <input
            placeholder="0127-4567-078"
            type="tel"
            name="phone"
            id="phone"
            maxLength={11}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center">
          {loading ? (
            <button
              type="submit"
              disabled
              className="font-[Roboto-bold] mt-3 ms-1 text-white rounded-lg bg-blue-600 dark:bg-blue-500 hover:bg-blue-600 text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            </button>
          ) : (
            <button
              type="submit"
              className="font-[Roboto-bold] mt-3 ms-1 text-white rounded-lg bg-blue-600 dark:bg-blue-500 hover:bg-blue-600 text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Pay now
            </button>
          )}
          {errormsg && (
            <span
              className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-red-800 rounded-lg bg-[#3C433B] dark:text-red-400"
              role="alert"
            >
              <span className="font-[Roboto-Bold]">{errormsg}</span>
            </span>
          )}
          {usermsg && (
            <span
              className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-green-800 rounded-lg bg-[#3C433B] dark:text-green-400"
              role="alert"
            >
              <span className="font-[Roboto-Bold]">{usermsg}</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

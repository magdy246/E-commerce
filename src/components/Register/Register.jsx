import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [usermsg, setUsermsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required...!")
      .min(3, "Name should be 3 characters or more...!")
      .max(10, "Maximum length is 10 characters...!"),

    email: Yup.string()
      .required("Email is required...!")
      .email("Invalid email address...!"),

    password: Yup.string()
      .required("Password is required...!")
      .min(6, "Password should be at least 6 characters long...!"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match...!")
      .required("Confirm password is required...!"),

    phone: Yup.string()
      .required("Phone number is required...!")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number format...!"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registering(values);
    },
  });

  async function registering(values) {
    setLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        setUsermsg(data.data.message);
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setErrormsg(error.response.data.message);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="p-4 sm:ml-64 h-full">
        <div
          className="shadow-black shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-[Roboto-Bold] text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>Register <FontAwesomeIcon icon={faArrowRightToBracket} /></h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
            >
              Your name
            </label>
            <input
              placeholder="Enter full name.."
              type="text"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
            >
              Your email
            </label>
            <input
              placeholder="Enter a email address.."
              type="email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
            >
              Your password
            </label>
            <input
              placeholder="Enter your password.."
              type="password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-[Roboto-Bold] text-[#1F241F]"
            >
              Repassword
            </label>
            <input
              placeholder="Confirm your password.."
              type="password"
              name="rePassword"
              id="rePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.rePassword && formik.errors.rePassword}
            </div>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.phone && formik.errors.phone}
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between items-center">
            {loading ? (
              <button
                type="submit"
                className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
              </button>
            ) : (
              <button
                type="submit"
                className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            )}
            {errormsg ? (
              <span
                className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-red-800 rounded-lg bg-[#3C433B] dark:text-red-400"
                role="alert"
              >
                <span className="font-[Roboto-Bold]">{errormsg}</span>
              </span>
            ) : null}
            {usermsg ? (
              <span
                className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-green-800 rounded-lg bg-[#3C433B] dark:text-green-400"
                role="alert"
              >
                <span className="font-[Roboto-Bold]">{usermsg}</span>
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}

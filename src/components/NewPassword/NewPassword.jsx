import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../Context/TokenContext";

export default function NewPassword() {
  const [usermsg, setUsermsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required...!")
      .email("Invalid email address...!"),

    newPassword: Yup.string()
      .required("Password is required...!")
      .min(6, "Password should be at least 6 characters long...!"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      newPasswordForm(values);
    },
  });

  async function newPasswordForm(values) {
    setLoading(true);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        setUsermsg(data?.data?.statusMsg);
        setLoading(false);
        if (data.data.token) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrormsg(error?.response?.data?.statusMsg);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="p-4 sm:ml-64 md:h-screen h-full">
        <div
          className="shadow-black shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-[Roboto-Bold] text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>New Password</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto">
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
              Your newPassword
            </label>
            <input
              placeholder="Enter your new password.."
              type="password"
              name="newPassword"
              id="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              className="bg-[#C6DEC6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-2 focus:border-[#758173] block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:font-[Roboto-bold]"
            />
            <div className="ps-3 text-red-700 font-[Roboto-Bold]">
              {formik.touched.newPassword && formik.errors.newPassword}
            </div>
          </div>
          {loading ? (
            <div className="flex md:flex-row flex-col justify-between items-center">
              <button
                type="submit"
                className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-between">
                <button
                  type="submit"
                  className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
            </>
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
        </form>
      </div>
    </>
  );
}

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ForgetPassword() {
  const [usermsg, setUsermsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required...!")
      .email("Invalid email address...!"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      forgetPasswordForm(values);
    },
  });

  async function forgetPasswordForm(values) {
    setLoading(true);
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((data) => {
        setUsermsg(data?.data?.message);
        setLoading(false);
        navigate("/resetcode");
      })
      .catch((error) => {
        setErrormsg(error?.response?.data?.message);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="p-4 sm:ml-64 md:h-screen h-full">
        <div
          className="text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-[Roboto-Bold] text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>Forget password</h1>
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
              <div className="flex md:flex-row flex-col justify-between items-center mb-3">
                <button
                  type="submit"
                  className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <div className="text-sm md:mt-0 mt-2 font-[Roboto-Bold] text-[#1F241F]">
                  Not registered yet?{" "}
                  <Link
                    to="/register"
                    className="text-[#758173] hover:underline"
                  >
                    Create account
                  </Link>
                </div>
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

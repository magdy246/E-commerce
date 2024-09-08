import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  const [usermsg, setUsermsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required...!")
      .email("Invalid email address...!"),

    password: Yup.string()
      .required("Password is required...!")
      .min(6, "Password should be at least 6 characters long...!"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setUsermsg(response.data.message);
        localStorage.setItem("user", response.data.token);
        setUserToken(response.data.token);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setErrormsg(error.response.data.message);
        setLoading(false);
      });
  }

  let { userToken, setUserToken } = useContext(TokenContext);
  console.log(userToken);

  return (
    <>
      <div className="p-4 sm:ml-64 md:h-screen h-full">
        <div
          className="shadow-black shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-[Roboto-Bold] text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>
            Login <FontAwesomeIcon icon={faRightToBracket} />
          </h1>
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
              <div className="flex flex-col justify-between items-center md:items-stretch">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <button
                    type="submit"
                    className="text-[#1F241F] bg-[#647A67] hover:bg-[#758173] focus:bg-[#647A67] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                  <div className="text-sm mt-2 md:mt-0 font-[Roboto-Bold] text-[#1F241F]">
                    Not registered yet?{" "}
                    <Link
                      to="/register"
                      className="text-[#758173] hover:underline"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    to="/forgetpassword"
                    className="text-md font-[Roboto-Bold] text-[#1F241F] hover:underline"
                  >
                    Lost Password?
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

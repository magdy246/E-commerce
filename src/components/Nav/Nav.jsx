import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faDolly,
  faHeart,
  faHouse,
  faLayerGroup,
  faRightFromBracket,
  faRightToBracket,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import cartImg from "../../assets/Cart.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  let { numOfCart, getProductinCart } = useContext(CartContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getProductinCart();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let { userToken, setUserToken } = useContext(TokenContext);
  // console.log(token);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("user");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#647A67] dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6 text-[#1F241F]"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#C5EFCB]">
          <div>
            <img src={cartImg} className="mx-auto h-6 sm:h-11" alt="Logo" />
          </div>
          <Link
            onClick={handleItemClick}
            to=""
            className="flex items-center ps-2.5 mb-5"
          >
            <span className="mx-auto self-center text-2xl font-semibold font-[Oswald-V] whitespace-nowrap text-[#020402] shadow-black shadow-inner px-3 py-1 rounded-xl">
              FreshCart
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {userToken ? (
              <>
                <div className="flex flex-col justify-between highet-screen">
                  <div>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to=""
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faHouse} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Home
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to="cart"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Cart
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-[#3C433B] bg-blue-100 rounded-full dark:bg-[#3C433B] dark:text-white">
                          {numOfCart}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to="categories"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Categories
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to="products"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faDolly} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Products
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to="brands"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faRocket} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Brands
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleItemClick}
                        to="wishlist"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Wishlist
                        </span>
                      </NavLink>
                    </li>
                  </div>
                  <div>
                    <li>
                      <a
                        onClick={() => logOut()}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500 cursor-pointer"
                      >
                        <span
                          className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />
                        </span>
                        <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                          Log Out
                        </span>
                      </a>
                    </li>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    onClick={handleItemClick}
                    to="register"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                  >
                    <span
                      className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </span>
                    <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                      Sign In
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleItemClick}
                    to="login"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#647A67] group transition-all duration-500"
                  >
                    <span
                      className="mb-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </span>
                    <span className="flex-1 ms-3 text-[#020402] whitespace-nowrap font-[Roboto-Bold]">
                      Sign Up
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}

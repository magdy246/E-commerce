import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBasketShopping,
  faCartShopping,
  faDolly,
  faHeart,
  faHouse,
  faLayerGroup,
  faRightFromBracket,
  faRightToBracket,
  faRocket,
  faInfoCircle,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import cartImg from "../../assets/Cart.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { jwtDecode } from "jwt-decode";

export default function Nav() {
  let name = "Guest";

  try {
    const token = localStorage.getItem("user");
    if (token) {
      const decoded = jwtDecode(token);
      name = decoded.name || "Guest";
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

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
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-[#C5EFCB] to-[#8FA38A]">
          <div className="flex items-center justify-center mb-5 transform hover:scale-110 transition-transform duration-300">
            <img src={cartImg} className="h-11" alt="Logo" />
          </div>
          <Link
            onClick={handleItemClick}
            to=""
            className="flex items-center justify-center mb-8"
          >
            <span className="text-2xl font-semibold font-[Oswald-V] text-[#020402] bg-white/80 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              FreshCart
            </span>
          </Link>

          <div className="space-y-2">
            {userToken ? (
              <>
                <div className="bg-white/30 rounded-xl p-4 mb-8 text-center">
                  <h1 className="text-2xl font-[RobotoSlab-B] text-[#3C433B]">
                    Welcome {name}
                  </h1>
                </div>

                <div className="space-y-2">
                  <NavLink
                    to=""
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faHouse} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Home</span>
                  </NavLink>

                  <NavLink
                    to="cart"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Cart</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-[#3C433B] bg-blue-100 rounded-full dark:bg-[#3C433B] dark:text-white">
                      {numOfCart}
                    </span>
                  </NavLink>

                  <NavLink
                    to="categories"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faLayerGroup} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Categories</span>
                  </NavLink>

                  <NavLink
                    to="products"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faDolly} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Products</span>
                  </NavLink>

                  <NavLink
                    to="brands"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Brands</span>
                  </NavLink>

                  <NavLink
                    to="wishlist"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Wishlist</span>
                  </NavLink>

                  <NavLink
                    to="allorders"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faBasketShopping} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">All Orders</span>
                  </NavLink>

                  <NavLink
                    to="about"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">About</span>
                  </NavLink>

                  <NavLink
                    to="contact"
                    onClick={handleItemClick}
                    className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
                    <span className="ml-3 font-[Roboto-Bold]">Contact</span>
                  </NavLink>

                  <div className="pt-8">
                    <button
                      onClick={logOut}
                      className="flex items-center w-full p-3 text-[#020402] rounded-lg hover:bg-red-100 transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                      <span className="ml-3 font-[Roboto-Bold]">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <NavLink
                  to="register"
                  onClick={handleItemClick}
                  className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faArrowRightToBracket} className="w-5 h-5" />
                  <span className="ml-3 font-[Roboto-Bold]">Sign In</span>
                </NavLink>

                <NavLink
                  to="login"
                  onClick={handleItemClick}
                  className="flex items-center p-3 text-[#020402] rounded-lg hover:bg-white/50 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5" />
                  <span className="ml-3 font-[Roboto-Bold]">Sign Up</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
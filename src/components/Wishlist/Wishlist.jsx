import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import FullScreenLoader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import { WishlistClassContext } from "../../Context/WishlistClassContext";

export default function Wishlist() {
  const [wishProduct, setWishProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { getProductinWishlist, deleteProductinWishlist, addProductWishlist } =
    useContext(WishlistContext);

  async function getWishlist() {
    let response = await getProductinWishlist();
    console.log(response?.data?.data);
    setWishProduct(response?.data?.data);
    setIsLoading(false);
  }

  let { addProductCart } = useContext(CartContext);
  async function addToCart(productId) {
    let res = await addProductCart(productId);
    console.log(res);
  }

  let { wishlist, setWishlist } = useContext(WishlistClassContext);

  async function toggleWishlist(productId) {
    if (wishlist[productId]) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }

  async function addToWishlist(productId) {
    let res = await addProductWishlist(productId);
    console.log(res?.data?.data);
    setWishlist((prev) => ({ ...prev, [productId]: true }));
  }

  async function removeFromWishlist(productId) {
    let res = await deleteProductinWishlist(productId);
    console.log(res?.data?.data);
    setWishlist((prev) => {
      const updatedWishlist = { ...prev };
      delete updatedWishlist[productId];
      return updatedWishlist;
    });
  }

  const getStarRating = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    return (
      <>
        {[...Array(filledStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`filled-${i}`}
            icon={faStar}
            className="text-yellow-300 w-4 h-4"
          />
        ))}
        {halfStar === 1 && (
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            className="text-yellow-300 w-4 h-4"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={faStar}
            className="text-gray-200 dark:text-gray-600 w-4 h-4"
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      <div className="p-4 sm:ml-64 md:h-screen h-full">
        <div className="container 2xl:mx-auto">
      <div
          className="text-4xl md:text-5xl h-1/3 md:ms-10 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>Wishlist <FontAwesomeIcon icon={faHeart} /></h1>
        </div>
          <div className="row">
            <div className="flex flex-wrap justify-center items-center">
              {isLoading ? (
                FullScreenLoader()
              ) : (
                <>
                  {wishProduct.map((product) => (
                    <div key={product?.id} className="px-2 pb-3 mb-2">
                      <div className="w-full max-w-80 sm:max-w-60 bg-white border rounded-lg shadow dark:bg-[#647A67] dark:border-[#1F241F] hover:scale-105 transition-all duration-500">
                        <Link
                          to={`/productdetails/${product?.id}/${product?.category?.name}`}
                        >
                          <div className="p-5">
                            <img
                              className="rounded-md"
                              src={product?.imageCover}
                              alt={product?.title}
                            />
                          </div>
                        </Link>
                        <div className="px-5 pb-5">
                          <div
                            id="Title"
                            className="flex justify-between items-center"
                          >
                            <Link
                              to={`/productdetails/${product?.id}/${product?.category?.name}`}
                            >
                              <h5 className="text-xl font-[Roboto-Bold] tracking-tight text-gray-900 dark:text-white">
                                {product?.title.split("").slice(0, 14).join("")}
                              </h5>
                              <h5 className="mt-1 text-white bg-[#758173] font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-2 py-1.5 text-center w-fit">
                                {product?.category?.name}
                              </h5>
                            </Link>
                            <button onClick={() => toggleWishlist(product?.id)}>
                              <FontAwesomeIcon
                                className={`text-xl cursor-pointer ${
                                  wishlist[product?.id]
                                    ? "text-red-600"
                                    : "animation-wilshite text_shadow text-transparent"
                                }`}
                                icon={faHeart}
                              />
                            </button>
                          </div>
                          <div className="flex items-center mt-2.5 mb-5">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              {getStarRating(product?.ratingsAverage)}
                            </div>
                            <span className="text-white text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-[#3C433B] dark:text-white ms-3">
                              {product?.ratingsAverage}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-[Roboto-Bold] max-text-3xl font-bold text-gray-900 dark:text-white">
                              <span className="text-gray-300 text-xs md:text-sm">
                                EGP{" "}
                              </span>
                              {product?.price.toLocaleString()}
                              <span className="text-gray-300 text-xs md:text-sm">
                                {product?.price % 10 === 9 ? ".99" : ".00"}
                              </span>
                            </span>
                            <button
                              onClick={() => addToCart(product?.id)}
                              className="text-white bg-[#1F241F] hover:bg-[#758173] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-[#1F241F] font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-[#1F241F] dark:hover:bg-[#758173] dark:focus:ring-[#8FA38A]"
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import {
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faHeart,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import FullScreenLoader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { WishlistClassContext } from "../../Context/WishlistClassContext";

export default function ProductDetails() {
  let { addProductCart } = useContext(CartContext);
  const [page, setPage] = useState(1);

  function addToCart(productId) {
    addProductCart(productId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let { addProductWishlist, deleteProductinWishlist } =
    useContext(WishlistContext);

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
    console.log(res.data.data);
    setWishlist((prev) => ({ ...prev, [productId]: true }));
  }

  async function removeFromWishlist(productId) {
    let res = await deleteProductinWishlist(productId);
    console.log(res.data.data);
    setWishlist((prev) => {
      const updatedWishlist = { ...prev };
      delete updatedWishlist[productId];
      return updatedWishlist;
    });
  }

  const getStarRate = (rate) => {
    if (typeof rate !== "number" || isNaN(rate)) {
      return null;
    }

    const filledStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5 ? 1 : 0;
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

  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [, setErrormsg] = useState("");

  function getDetailsProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response?.data?.data);
        setLoader(false);
      })
      .catch((error) => {
        setErrormsg(error.message);
        console.log(error);
        setLoader(false);
      });
  }

  function getRelatedProducts(page) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      .then((response) => {
        let related = response?.data?.data?.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((error) => {
        setErrormsg(error.message);
        console.log(error);
        setLoader(false);
      });
  }

  useEffect(() => {
    getDetailsProduct();
    getRelatedProducts(page);
  }, [id, page]);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <>
      <div className="p-4 sm:ml-64 h-full">
        <div
          className="text-4xl md:text-5xl h-1/3 md:ms-10 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>Product Details <FontAwesomeIcon icon={faCircleInfo} /></h1>
        </div>

        {loader ? (
          <FullScreenLoader />
        ) : (
          <>
            <div className="my-12 flex justify-center items-center bg-[#8FA38A] h-auto md:h-2/3 shadow-2xl rounded-3xl">
              <div className="container w-full px-4 md:px-12 flex flex-col md:flex-row justify-center items-center">
                <div className="w-full md:w-1/3 p-4 md:p-8">
                  {productDetails?.images.length === 1 ? (
                    <img
                      className="rounded-xl w-full max-w-[300px] md:max-w-full"
                      src={productDetails?.images[0]}
                      alt={productDetails?.title}
                    />
                  ) : (
                    <Slider {...settings}>
                      {productDetails?.images.map((src) => (
                        <img
                          className="rounded-xl w-full max-w-[300px] md:max-w-full"
                          key={src}
                          src={src}
                          alt={productDetails?.title}
                        />
                      ))}
                    </Slider>
                  )}
                </div>
                <div className="w-full md:w-2/3 flex flex-col p-4 md:p-8">
                  <h3 className="text-lg md:text-3xl font-[Roboto-Bold] tracking-tight text-gray-900">
                    {productDetails?.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base">
                    {productDetails?.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <h5 className="mt-1 text-white bg-[#758173] font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-2 py-1.5 text-center w-fit">
                      {productDetails?.category?.name}
                    </h5>
                    <button onClick={() => toggleWishlist(productDetails?.id)}>
                      <FontAwesomeIcon
                        className={`text-xl cursor-pointer ${
                          wishlist[productDetails?.id]
                            ? "text-red-600"
                            : "animation-wilshite text_shadow text-transparent"
                        }`}
                        icon={faHeart}
                      />
                    </button>
                  </div>
                  <div className="my-3 flex justify-between items-center">
                    <span className="font-[Roboto-Bold] text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      <span className="text-gray-300 text-xs md:text-sm">
                        EGP{" "}
                      </span>
                      {productDetails?.price?.toLocaleString()}
                      <span className="text-gray-300 text-xs md:text-sm">
                        {productDetails?.price % 10 === 9 ? ".99" : ".00"}
                      </span>
                    </span>
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {getStarRate(productDetails?.ratingsAverage)}
                      </div>
                      <span className="text-white text-xs md:text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-[#3C433B] dark:text-white ms-3">
                        {productDetails?.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(productDetails?.id)}
                    className="mt-4 text-white bg-[#1F241F] hover:bg-[#758173] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-[#1F241F] font-medium rounded-lg text-xs md:text-sm px-2 py-1.5 text-center dark:bg-[#1F241F] dark:hover:bg-[#758173] dark:focus:ring-[#8FA38A]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {relatedProducts.length > 0 && (
              <>
                <div className="flex justify-center">
                  <div
                    className=" text-4xl md:text-5xl h-1/3 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
                    id="animation-register"
                  >
                    <h1>-Related Products-</h1>
                  </div>
                </div>
                <div className="container 2xl:mx-auto">
                  <div className="row">
                    <div className="flex flex-wrap justify-center items-center">
                      {relatedProducts?.map((related) => (
                        <div key={related?.id} className="px-2 pb-3 mb-2">
                          <div className="w-full max-w-80 sm:max-w-60 bg-white border rounded-lg shadow dark:bg-[#647A67] dark:border-[#1F241F] hover:scale-105 transition-all duration-500">
                            <Link
                              to={`/productdetails/${related?.id}/${related?.category?.name}`}
                            >
                              <div className="p-5">
                                <img
                                  className="rounded-md"
                                  src={related?.imageCover}
                                  alt={related?.title}
                                />
                              </div>
                            </Link>
                            <div className="px-5 pb-5">
                              <div
                                id="Title"
                                className="flex justify-between items-center"
                              >
                                <Link
                                  to={`/productdetails/${related?.id}/${related?.category?.name}`}
                                >
                                  <h5 className="text-xl font-[Roboto-Bold] tracking-tight text-gray-900 dark:text-white">
                                    {related?.title
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ")}
                                  </h5>
                                  <h5 className="mt-1 text-white bg-[#758173] font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-2 py-1.5 text-center w-fit">
                                    {related?.category?.name}
                                  </h5>
                                </Link>
                              </div>
                              <div className="flex items-center mt-2.5 mb-5">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  {getStarRate(related?.ratingsAverage)}
                                </div>
                                <span className="text-white text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-[#3C433B] dark:text-white ms-3">
                                  {related?.ratingsAverage}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-[Roboto-Bold] max-text-3xl font-bold text-gray-900 dark:text-white">
                                  <span className="text-gray-300 text-xs md:text-sm">
                                    EGP{" "}
                                  </span>
                                  {related?.price.toLocaleString()}
                                  <span className="text-gray-300 text-xs md:text-sm">
                                    {related?.price % 10 === 9 ? ".99" : ".00"}
                                  </span>
                                </span>
                                <button
                                  onClick={() => addToCart(related?.id)}
                                  className="text-white bg-[#1F241F] hover:bg-[#758173] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-[#1F241F] font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-[#1F241F] dark:hover:bg-[#758173] dark:focus:ring-[#8FA38A]"
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-5 space-x-4">
                      <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="text-white bg-[#1F241F] hover:bg-[#758173] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-[#1F241F] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#1F241F] dark:hover:bg-[#758173] dark:focus:ring-[#8FA38A]"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        onClick={() => setPage((old) => old + 1)}
                        disabled={page === 2}
                        className="text-white bg-[#1F241F] hover:bg-[#758173] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-[#1F241F] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#1F241F] dark:hover:bg-[#758173] dark:focus:ring-[#8FA38A]"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

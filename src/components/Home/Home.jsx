import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import Featureprodects from "../Featureprodects/Featureprodects";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  let { userToken, setUserToken } = useContext(TokenContext);
  
  // You'll need to implement these functions and state
  const products = []; // Replace with your actual products data
  const wishlist = {}; // Replace with your actual wishlist state
  const toggleWishlist = (id) => {}; // Replace with your actual wishlist toggle function
  const addToCart = (id) => {}; // Replace with your actual add to cart function
  const getStarRating = (rating) => {}; // Replace with your actual star rating function

  return (
    <>
      <div className="md:p-4 p-0 sm:ml-64 flex flex-col ">
        <div
          className="shadow-black shadow-lg text-4xl md:text-5xl h-1/3 md:ms-10 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>Home <FontAwesomeIcon icon={faHouse} /></h1>
        </div>
        <MainSlider />
        <CategoriesSlider />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Featureprodects
              key={product._id}
              product={product}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              addToCart={addToCart}
              getStarRating={getStarRating}
            />
          ))}
        </div>
      </div>
    </>
  );
}
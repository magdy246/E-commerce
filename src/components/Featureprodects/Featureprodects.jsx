import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Featureprodects() {
  return (
    <div key={product?._id} className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
      <Link to={`/productdetails/${product?._id}/${product?.category?.name}`}>
        <div className="relative">
          <img 
            className="w-full h-64 object-cover"
            src={product?.imageCover}
            alt={product?.title}
          />
          <div className="absolute top-4 right-4">
            <button onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product?._id);
            }}>
              <FontAwesomeIcon
                className={`text-2xl ${
                  wishlist[product?._id]
                    ? "text-red-600"
                    : "text-white/70 hover:text-white"
                }`}
                icon={faHeart}
              />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link to={`/productdetails/${product?._id}/${product?.category?.name}`}>
              <h5 className="text-xl font-bold text-gray-900 mb-2">
                {product?.title.split("").slice(0, 14).join("")}
              </h5>
            </Link>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-[#647A67] rounded-full">
              {product?.category?.name}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {getStarRating(product?.ratingsAverage)}
          <span className="ml-2 text-sm font-semibold text-gray-600">
            ({product?.ratingsAverage})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            <span className="text-sm font-normal">EGP </span>
            {product?.price.toLocaleString()}
            <span className="text-sm font-normal">
              {product?.price % 10 === 9 ? ".99" : ".00"}
            </span>
          </span>
          
          <button
            onClick={() => addToCart(product?._id)}
            className="px-4 py-2 text-white bg-[#3C433B] rounded-lg hover:bg-[#647A67] transition-colors duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FullScreenLoader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { isLoading, data } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
  });
  let brands = data?.data?.data;
    

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 sm:px-0 2xl:mx-auto">
          <div
            className="shadow-black shadow-lg text-3xl md:text-5xl h-1/3 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
            id="animation-register"
          >
            <h1>All Brands <FontAwesomeIcon icon={faRocket} /></h1>
          </div>
          {isLoading ? (
            <FullScreenLoader />
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {brands?.map((brand) => (
                <Link
                  key={brand?.name}
                  to={`/brand/${brand?.slug}`}
                  className="bg-[#647a67] border border-[#3C433B] rounded-lg shadow-lg p-4 flex flex-col items-center w-[95%] sm:w-[70%] lg:w-[48%] xl:w-[28%] mx-auto mb-6"
                >
                  <img
                    className="w-full cursor-pointer h-[250px] sm:h-[280px] md:h-[300px] lg:h-[220px] xl:h-[240px] border border-[#3C433B] object-cover rounded-md"
                    src={brand?.image}
                    alt={brand?.name}
                  />
                  <h3 className="mt-4 text-center text-white bg-[#1F241F] cursor-pointer hover:bg-[#B8D2B3] transition-all duration-300 font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-4 py-2 w-full">
                    {brand?.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

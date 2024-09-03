import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FullScreenLoader from "../Loader/Loader";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllCategories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  let categories = data?.data?.data;

  return (
    <>
      <div className="p-4 sm:px-0 2xl:mx-auto">
        <div
          className="text-3xl md:text-5xl h-1/3 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>All Categories <FontAwesomeIcon icon={faLayerGroup} /></h1>
        </div>
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {categories?.map((category) => (
              <Link
                key={category?.name}
                to={`/cate/${category?.name}`}
                className="bg-[#647a67] border border-[#3C433B] rounded-lg shadow-lg p-4 flex flex-col items-center w-[80%] sm:w-[45%] lg:w-[30%] xl:w-[22%]"
              >
                <img
                  className="w-full cursor-pointer h-[150px] md:h-[200px] lg:h-[250px] border border-[#3C433B] object-cover rounded-md"
                  src={category?.image}
                  alt={category?.name}
                />
                <h3 className="mt-4 text-center text-white bg-[#1F241F] cursor-pointer hover:bg-[#B8D2B3] transition-all duration-300 font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-4 py-2 w-full">
                  {category?.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

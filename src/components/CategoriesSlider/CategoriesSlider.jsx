import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
  function getCategoriesSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesSlider,
  });

  let categories = data?.data?.data;

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    arrows: false,
    adaptiveHeight: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="md:p-4 py-4 px-0 md:my-0 my-3 sm:px-0 2xl:mx-auto">
        <div className="flex justify-center">
          <div
            className="shadow-black shadow-lg text-3xl md:text-5xl h-1/3 px-3 pb-2 mb-11 md:mt-11 mt-0 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
            id="animation-register"
          >
            <h1>-Popular Categories-</h1>
          </div>
        </div>
        <div className="container border border-black">
          <Slider {...settings}>
            {categories?.map((category) => (
              <Link
              to={`/cate/${category?.name}`}
                key={category?.name}
                className="md:w-[100px] w-[300px] flex flex-col items-center mx-auto"
              >
                <img
                  className="w-full md:h-[150px] h-[300px] border border-x border-black object-fill"
                  src={category?.image}
                  alt={category?.name}
                />
                <div className="border border-black bg-[#3C433B]">
                  <h3 className="my-3 mx-auto text-white bg-[#758173] cursor-pointer hover:bg-[#B8D2B3] transition-all duration-300 font-[Roboto-Regular] rounded-lg text-xs md:text-sm px-2 py-1.5 text-center w-fit">
                    {category?.name}
                  </h3>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

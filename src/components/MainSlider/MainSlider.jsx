import img1 from "../../assets/bread1.jpeg";
import img2 from "../../assets/caocao1.jpeg";
import img3 from "../../assets/caocao2.jpeg";
import img4 from "../../assets/vegetables1.png";
import img5 from "../../assets/vegetables2.jpeg";
import img6 from "../../assets/vegetables3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    arrows: false,
  };
  return (
    <>
      <div className="p-4 sm:px-0 2xl:mx-auto">
        <div className="container flex flex-col md:flex-row border border-black">
          <div className="md:w-3/4 w-full mb-7 md:mb-0 border border-black">
            <Slider {...settings}>
              <img src={img1} className="h-[300px] w-full" alt="slider" />
              <img src={img4} className="h-[300px] w-full" alt="slider" />
              <img src={img5} className="h-[300px] w-full" alt="slider" />
            </Slider>
          </div>
          <div className="md:w-1/4 w-full flex flex-col">
            <div className="flex justify-between">
              <img
                src={img2}
                className="h-[150px] w-1/2 object-cover border border-black"
                alt="slider"
              />
              <img
                src={img3}
                className="h-[150px] w-1/2 object-cover border border-black"
                alt="slider"
              />
            </div>
            <div>
              <img
                src={img6}
                className="h-[152px] w-full object-cover border border-black"
                alt="slider"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

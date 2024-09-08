import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import Featureprodects from "../Featureprodects/Featureprodects";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  let { userToken, setUserToken } = useContext(TokenContext);
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
        <Featureprodects />
      </div>
    </>
  );
}

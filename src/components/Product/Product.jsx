import { faDolly } from "@fortawesome/free-solid-svg-icons";
import Featureprodects from "../Featureprodects/Featureprodects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  return (
    <>
      <div className="p-4 sm:ml-64">
      <div
          className="shadow-black shadow-lg text-4xl md:text-5xl h-1/3 md:ms-10 px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg"
          id="animation-register"
        >
          <h1>All Products <FontAwesomeIcon icon={faDolly} /></h1>
        </div>
        <Featureprodects />
      </div>
    </>
  );
}

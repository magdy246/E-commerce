import { PropagateLoader } from "react-spinners";

const FullScreenLoader = () => {
  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PropagateLoader color="#3C433B" />
    </div>
  );
};

export default FullScreenLoader;

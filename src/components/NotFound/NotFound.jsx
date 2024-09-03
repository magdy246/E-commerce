import Error from "../../assets/not-found.gif";

export default function NotFound() {
  return (
    <>
      <div className="sm:ml-64">
        <img className="w-full" src={Error} alt="eroor" />
      </div>
    </>
  );
}

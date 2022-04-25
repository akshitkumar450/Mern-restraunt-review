import { PacmanLoader } from "react-spinners";

function Loader({ loading }) {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <PacmanLoader color="#0075cc" loading={loading} speedMultiplier="0.9" />
    </div>
  );
}

export default Loader;

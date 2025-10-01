import logo from "../assets/play.png";
import { IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-l from-black to-gray-700 max-h-screen p-2 sm:p-4 flex flex-col items-center">
      {/* Logo */}
      <div className="w-full flex justify-center mt-2 sm:mt-3">
        <img
          src={logo}
          className="w-24 sm:w-32 md:w-44 cursor-pointer"
          alt="Logo"
        />
      </div>

      {/* Home Button */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 py-2 w-full mt-4">
        <div
          className="bg-blue-600 w-full flex flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-3 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoMdHome className="text-xl sm:text-2xl text-white" />
          <p className="text-sm sm:text-lg font-semibold text-white hidden sm:block">
            Home
          </p>
        </div>
      </div>

      {/* Upload Songs Button */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 py-2 w-full">
        <Link
          to="/add-music"
          className="bg-blue-600 w-full flex flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-3 rounded-lg cursor-pointer"
        >
          <p className="text-sm sm:text-lg font-semibold text-white hidden sm:block">
            Upload Songs
          </p>
        </Link>
      </div>
    </div>
  );
};

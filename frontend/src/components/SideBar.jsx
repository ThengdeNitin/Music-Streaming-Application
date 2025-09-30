import logo from "../assets/play.png";
import { IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook

  return (
    <div className="bg-gradient-to-l from-black to-gray-700">
      <div className="mt-3 py-p px-2">
        <img src={logo} className="mt-1 w-44 hidden md:block cursor-pointer" />
      </div>

      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2 mt-5">
        <div
          className="bg-blue-600 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/")} 
        >
          <IoMdHome className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">Home</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        <Link
          to="/add-music"
          className="bg-blue-600 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <p className="text-lg font-semibold hidden md:block text-white">Upload Songs</p>
        </Link>
      </div>
    </div>
  );
};

import logo from "../assets/play.png";
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="bg-gradient-to-l from-black to-gray-700 p-2 flex flex-col items-center">
      {/* Logo */}
      <div className="w-full flex justify-center mt-2 sm:mt-3">
        <img
          src={logo}
          className="w-24 sm:w-32 md:w-44 cursor-pointer"
          alt="Logo"
        />
      </div>

      <div className="flex flex-col items-center gap-3 sm:gap-5 mt-6 sm:mt-10 w-full">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base font-medium rounded-xl cursor-pointer py-2 px-3 sm:py-3 sm:px-4 w-full
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
        >
          <IoMdHome className="w-6 h-6 sm:w-8 sm:h-8" />
          <p className="sm:block">Home</p>
        </NavLink>

        {/* Upload Songs */}
        <NavLink
          to="/add-music"
          className={({ isActive }) =>
            `flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base font-medium rounded-xl cursor-pointer py-2 px-3 sm:py-3 sm:px-4 w-full
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
        >
          <IoIosAddCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <p className="sm:block">Upload Songs</p>
        </NavLink>
      </div>
    </div>
  );
};

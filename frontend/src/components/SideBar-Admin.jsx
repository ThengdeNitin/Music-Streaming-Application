import logo from "../assets/play.png";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdMusicalNote } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

export const SideBarAdmin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/list-songs");
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-t from-black to-gray-500 max-h-screen p-2 sm:p-4 flex flex-col items-center">
      {/* Logo */}
      <img
        src={logo}
        className="mt-2 w-28 sm:w-36 md:w-44 cursor-pointer"
        alt="Logo"
      />

      {/* Navigation */}
      <div className="flex flex-col items-center gap-3 sm:gap-5 mt-6 sm:mt-10 w-full">
        <NavLink
          to={"/"}
          className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base font-medium rounded-xl cursor-pointer hover:bg-gray-700 py-2 px-3 sm:py-3 sm:px-4 w-full"
        >
          <IoMdHome className="w-6 h-6 sm:w-8 sm:h-8" />
          <p>Home</p>
        </NavLink>

        <NavLink
          to={"/add-music"}
          className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base font-medium rounded-xl cursor-pointer hover:bg-gray-700 py-2 px-3 sm:py-3 sm:px-4 w-full"
        >
          <IoIosAddCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <p>Add Music</p>
        </NavLink>

        <div
          onClick={handleClick}
          className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base font-medium rounded-xl cursor-pointer hover:bg-gray-700 py-2 px-3 sm:py-3 sm:px-4 w-full"
        >
          <IoMdMusicalNote className="w-6 h-6 sm:w-8 sm:h-8" />
          <p>List Of Songs</p>
        </div>
      </div>
    </div>
  );
};

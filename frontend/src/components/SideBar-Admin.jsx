import { useState } from "react";
import logo from "../assets/play.png";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdMusicalNote, IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const SideBarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="sm:hidden flex items-center justify-between bg-black px-4 py-3 shadow-md h-full">
        <img src={logo} alt="Logo" className="w-20 cursor-pointer" />
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-64 sm:w-60 md:w-72 bg-gradient-to-t from-black to-gray-500 
        p-4 flex flex-col items-center transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        {/* Logo */}
        <img
          src={logo}
          className="mt-2 w-24 sm:w-28 md:w-36 cursor-pointer"
          alt="Logo"
        />

        {/* Nav Links */}
        <div className="flex flex-col items-center gap-4 mt-8 w-full">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-3 text-white text-sm md:text-base font-medium rounded-xl cursor-pointer 
              hover:bg-gray-700 py-2 px-4 w-full transition-all duration-200 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <IoMdHome className="w-6 h-6 md:w-7 md:h-7" />
            <p>Home</p>
          </NavLink>

          <NavLink
            to={"/add-music"}
            className={({ isActive }) =>
              `flex items-center gap-3 text-white text-sm md:text-base font-medium rounded-xl cursor-pointer 
              hover:bg-gray-700 py-2 px-4 w-full transition-all duration-200 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <IoIosAddCircle className="w-6 h-6 md:w-7 md:h-7" />
            <p>Add Music</p>
          </NavLink>

          <NavLink
            to={"/list-songs"}
            className={({ isActive }) =>
              `flex items-center gap-3 text-white text-sm md:text-base font-medium rounded-xl cursor-pointer 
              hover:bg-gray-700 py-2 px-4 w-full transition-all duration-200 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <IoMdMusicalNote className="w-6 h-6 md:w-7 md:h-7" />
            <p>List Of Songs</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

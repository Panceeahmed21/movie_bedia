import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar_Comp() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white border-gray-200 bg-logoColor fixed top-0 w-full z-[999999]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/movie_bedia"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            MovieBedia
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={` w-full md:block md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">

          <li>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
                to="/movie_bedia/movies"
                className="block  rounded-md p-2 transition-all duration-700     "
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
                to="/movie_bedia/watchList"
                className="block  rounded-md p-2 transition-all duration-700     "
              >
                WatchList
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
                to="/movie_bedia/nowPlaying"
                className="block  rounded-md p-2 transition-all duration-700     "
              >
                Now Playing
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

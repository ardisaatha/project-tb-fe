import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  return (
    <div className="md:px-20 min-[240px]:pt-4 md:pt-12 pb-9 bg-none text-white">
      <div className="navbar">
        <div className="navbar-start">
          <a href="/">
            <div className="flex items-center">
              <img src="/logo_dkk.png" alt="logo" className="w-28 h-24" />
              <h2 className="md:hidden text-xl w-72">SDKPT Kota Semarang</h2>
              <div className="flex-col min-[240px]:hidden md:flex">
                <div className="font-semibold text-2xl">SDKPT</div>
                <div className="font-semibold text-2xl">Kota Semarang</div>
              </div>
            </div>
          </a>
        </div>
        <div className="navbar-end md:gap-12">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] text-black p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <a href="#stats" className="hover:text-[#FFB800]">
                  Manual Book
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#FFB800]">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-[#FFB800]">
                  Peta
                </a>
              </li>
              <li>
                <button
                  onClick={() => dispatch(logout(history))}
                  className="hover:text-[#FFB800]"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <a
            href="https://drive.google.com/file/d/17LyMeseOLjPV2ojri0wxJQapeNh-aJd5/view?usp=sharing"
            target="_blank"
            className="text-2xl font-semibold scroll-smooth min-[240px]:hidden md:flex"
          >
            Manual Book
          </a>
          <a
            href="#stats"
            className="text-2xl font-semibold scroll-smooth min-[240px]:hidden md:flex"
          >
            Tentang
          </a>
          <a
            href="#map"
            className="text-2xl font-semibold scroll-smooth min-[240px]:hidden md:flex"
          >
            Peta
          </a>
          <button className="min-[240px]:hidden md:flex">
            <div
              onClick={() => dispatch(logout(history))}
              className="text-2xl font-semibold scroll-smooth"
            >
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

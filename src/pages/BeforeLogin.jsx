import React, { useState, useEffect } from "react";
import logo from "../assets/main-logo.png";
import Banner from "../components/Banner";
import Map from "../components/Map";
import Service from "../components/Service";
import HowTo from "../components/HowTo";
import Artikel from "../components/Artikel";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import LoadPage from "../components/UI/LoadPage";
import { logout } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../store/actions/location";
import { getPasien } from "../store/actions/pasien";
import { getAllKerentanan } from "../store/actions/predict";

const BeforeLogin = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const history = useNavigate();
  // console.log(window.location)
  const pathName = window.location.pathname;
  const [color, setColor] = useState(false);
  const [colorNav, setColorNav] = useState("text-white");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    // dispatch(getPasien());
    dispatch(getLocation());
    dispatch(getPasien())
    dispatch(getAllKerentanan());
    // dispatch(getFaskes());
    // dispatch(getLocationFaskes());
  }, [dispatch]);

  // for loading
  setInterval(function () {
    setLoad(false);
  }, 700);

  // for change color navbar
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  const scroll = window.scrollY >= 90;
  useEffect(() => {
    if (pathName === "/") {
      if (scroll) {
        return setColorNav("text-black");
      }
      setColorNav("text-white");
    } else {
      setColorNav("text-black");
    }
  }, [pathName, scroll]);
  return (
    <>
      {load ? (
        <LoadPage />
      ) : (
        <>
          <div className="bg-[#F6F6F6] text-black ">
            <div
              className={
                color
                  ? `navbar fixed top-0 bg-[#F6F6F6] z-[1500] shadow-md`
                  : `navbar fixed top-0 z-50`
              }
            >
              <div className="navbar-start">
                <a
                  href="/#"
                  className={` ${colorNav} min-[240px]:mx-4 md:ml-24 md:my-4`}
                >
                  <img src={logo} alt="" />
                </a>
              </div>
              <div className="navbar-end mt-4 mb-4">
                <ul className="menu-horizontal space-x-[46px] mr-[67px] min-[240px]:hidden md:flex">
                  <li>
                    <a href="/#service" className="font-bold text-lg">
                      Tentang
                    </a>
                  </li>
                  <li tabIndex={0}>
                    <a href="/#artikel" className="font-bold text-lg">
                      Artikel
                    </a>
                  </li>
                </ul>
                <div className="dropdown dropdown-end md:mr-24 ">
                  {/* navbar phone */}
                  <label tabIndex={1} className="btn btn-ghost lg:hidden">
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
                    tabIndex={1}
                    className="menu menu-sm dropdown-content mt-3 z-[1] text-black p-2 shadow bg-white rounded-box w-52 md:hidden"
                  >
                    <li>
                      <a href="/#service" className="font-bold text-lg">
                        Tentang
                      </a>
                    </li>
                    <li>
                      <a href="/#artikel" className="font-bold text-lg">
                        Artikel
                      </a>
                    </li>
                    {accessToken ? (
                      <label className="btn m-1 text-base font-bold border-[#EE6C4D] bg-[#EE6C4D] text-white hover:bg-[#EE6C4D] hover:border-[#EE6C4D]">
                        <div onClick={() => dispatch(logout(history))}>
                          Logout
                        </div>
                      </label>
                    ) : (
                      <>
                        <h2 className="px-3 pt-4 pb-3 text-yellow-400 font-bold text-lg">
                          Login
                        </h2>
                        <li>
                          <a
                            href="/login"
                            className="mb-2 font-semibold border-white bg-white text-[#293241] hover:bg-[#EE6C4D] hover:border-[#EE6C4D] hover:text-white"
                          >
                            SDKPT
                          </a>
                        </li>
                        <li>
                          <a
                            href="http://119.2.50.170:9093/tb/index.php/login"
                            className="font-semibold border-white bg-white text-[#293241] hover:bg-[#EE6C4D] hover:border-[#EE6C4D] hover:text-white"
                          >
                            Semar Betul
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                  {accessToken ? (
                    <label className="min-[240px]:hidden md:flex btn m-1 text-base font-bold border-[#EE6C4D] bg-[#EE6C4D] text-white hover:bg-[#EE6C4D] hover:border-[#EE6C4D]">
                      <div onClick={() => dispatch(logout(history))}>
                        Logout
                      </div>
                    </label>
                  ) : (
                    <>
                      <label
                        tabIndex={0}
                        className="btn m-1 text-base font-bold border-[#EE6C4D] bg-[#EE6C4D] text-white hover:bg-[#EE6C4D] hover:border-[#EE6C4D] min-[240px]:hidden md:flex"
                      >
                        Login
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 mt-1 border-white bg-white text-white min-[240px]:hidden md:flex"
                      >
                        <li>
                          <a
                            href="/login"
                            className="mb-2 font-semibold border-white bg-white text-[#293241] hover:bg-[#EE6C4D] hover:border-[#EE6C4D] hover:text-white"
                          >
                            SDKPT
                          </a>
                        </li>
                        <li>
                          <a
                            href="http://119.2.50.170:9093/tb/index.php/login"
                            className="font-semibold border-white bg-white text-[#293241] hover:bg-[#EE6C4D] hover:border-[#EE6C4D] hover:text-white"
                          >
                            Semar Betul
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Banner />
            <div className="flex space-x-8 justify-center items-center flex-col">
              <div className="md:-mt-[75px] min-[240px]:-mt-[150px] card rounded-3xl w-fit bg-[#4F709C] drop-shadow-lg">
                <div className="flex pb-4 pt-3 px-10 flex-col">
                  <div>
                    <Stats />
                  </div>
                </div>
              </div>
            </div>
            <Service />
            <HowTo />
            <div className="md:px-36 min-[244px]:px-4 mt-20">
              <h2 className="font-bold text-2xl mb-8">Persebaran Kasus</h2>
              <Map />
            </div>
            <Artikel />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default BeforeLogin;

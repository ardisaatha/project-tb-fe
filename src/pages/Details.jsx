import React, { useEffect, useState } from "react";
import OrderTerms from "../components/Accordion";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";
import TableDet from "../components/TabelDet";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocationById } from "../store/actions/location";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth";
import { getPasienByIdKel } from "../store/actions/pasien";
import Ews from "../components/Ews";
import Predict from "../components/Predict";
import { getIntervention } from "../store/actions/predict";

const Details = () => {
  const { state } = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [token, setToken] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(getLocationById(state.areaId));
    dispatch(getPasienByIdKel(state.areaId));
    dispatch(getIntervention(state.areaId));
    setToken(jwtDecode(accessToken));
  }, [dispatch, state, accessToken]);
  const { dataById, totalPas } = useSelector((state) => state.locationReducers);
  const { dataByIdKel } = useSelector((state) => state.pasienReducers);
  // console.log(totalPas);
  let sembuh = {};
  let gagal = {};
  let meninggal = {};
  if (dataByIdKel) {
    sembuh = dataByIdKel.filter((data) => data.hasil_akhir === "Sembuh");
    gagal = dataByIdKel.filter((data) => data.hasil_akhir === "Gagal");
    meninggal = dataByIdKel.filter((data) => data.hasil_akhir === "Meninggal");
  }
  return (
    <>
      <div className="bg-[#F6F6F6] m-auto items-center justify-center max-w-screen min-h-screen">
        {/* Navbar */}
        <div className="md:px-20 md:pt-12 md:pb-9 bg-[#213555] text-white">
          <div className="navbar ">
            <div className="navbar-start">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img src="/logo_dkk.png" alt="logo" className="w-28 h-24" />
                  <h2 className="md:hidden text-xl w-72">
                    SDKPT Kota Semarang
                  </h2>
                  <div className="flex-col min-[240px]:hidden md:flex">
                    <div className="font-semibold text-2xl">SDKPT</div>
                    <div className="font-semibold text-2xl">Kota Semarang</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-end gap-12">
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
                    <a href="/dashboard" className="hover:text-[#FFB800]">
                      Home
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
                href="/dashboard"
                className="text-2xl font-semibold min-[240px]:hidden md:flex"
              >
                Home
              </a>
              <button className="min-[240px]:hidden md:flex">
                <div
                  className="text-2xl font-semibold scroll-smooth"
                  onClick={() => dispatch(logout(history))}
                >
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Daerah */}
        <div className="md:py-12 min-[240px]:py-8 md:px-40 min-[240px]:px-4">
          <div>
            <div className="text-4xl font-bold text-black min-[240px]:text-center md:text-left">
              Detail Daerah {dataById.nama_kelurahan}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 justify-center items-center flex-col">
          <div className="rounded-3xl w-fit bg-[#FFFFFF] drop-shadow-lg">
            <div className="flex pb-4 pt-3 min-[240px]:px-16 md:px-10 flex-col">
              <div>
                <div className="stats stats-vertical lg:stats-horizontal bg-[#FFFFFF] ">
                  <div className="stat">
                    <div className="flex justify-center">
                      <div className="flex-col text-center  pt-2">
                        <div className="stat-value text-black font-bold text-5xl">
                          {totalPas}
                        </div>
                        <div className="stat-title text-black text-lg">
                          Jumlah Kasus
                        </div>
                      </div>
                      <div className="text-warning min-[240px]:hidden md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-8 h-8 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="flex justify-center">
                      <div className="flex-col text-center  pt-2">
                        <div className="stat-value text-black font-bold text-5xl">
                          {sembuh.length}
                        </div>
                        <div className="stat-title text-black text-lg">
                          Pasien Sembuh
                        </div>
                      </div>
                      <div className="text-warning min-[240px]:hidden md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-8 h-8 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="flex justify-center">
                      <div className="flex-col text-center  pt-2">
                        <div className="stat-value text-black font-bold text-5xl">
                          {gagal.length}
                        </div>
                        <div className="stat-title text-black text-lg">
                          Pengobatan Gagal
                        </div>
                      </div>
                      <div className="text-warning min-[240px]:hidden md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-8 h-8 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="flex justify-center">
                      <div className="flex-col text-center  pt-2">
                        <div className="stat-value text-black font-bold text-5xl">
                          {meninggal.length}
                        </div>
                        <div className="stat-title text-black text-lg">
                          Pasien Meninggal
                        </div>
                      </div>
                      <div className="text-warning min-[240px]:hidden md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-8 h-8 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Ews />
        <Predict />
        {token.role !== "stackholder" && <TableDet />}
        <OrderTerms />
        <Footer />
        {/* Intervensi */}
      </div>
    </>
  );
};

export default Details;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { getFaskesById } from "../store/actions/location";

const Penilaian = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();
  //   console.log(state.id_pusk)
  useEffect(() => {
    dispatch(getFaskesById(state.id_pusk));
  }, [dispatch, state]);
  const { dataFasId } = useSelector((state) => state.locationReducers);
  // console.log(dataFasId);

  const groupDataByMonth = (penilaians) => {
    const groupedData = {};

    for (const item of penilaians) {
      const month = item.bulan;
      const year = item.tahun;
      const key = `${year}-${month}`;

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      groupedData[key].push(item);
    }

    return groupedData;
  };

  const groupedPenilaians = dataFasId
    ? groupDataByMonth(dataFasId.penilaians)
    : {};
  // console.log(groupedPenilaians);

  return (
    <>
      <div className="bg-[#F6F6F6] m-auto items-center justify-center max-w-screen min-h-screen">
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
        <h2 className="md:mx-20 min-[244px]:mx-4 mt-8 font-bold text-2xl text-center">
          History Penilaian Puskesmas {dataFasId.nama_pusk} <br /> P2TB
        </h2>
        {Object.keys(groupedPenilaians).map((key, index) => {
          const [year, month] = key.split("-");
          const monthYearData = groupedPenilaians[key];
          return (
            <div
              key={index}
              className=" bg-white rounded-lg shadow-md py-4 md:px-8 min-[244px]:px-4 md:mx-20 min-[244px]:mx-4 mt-10"
            >
              <h2 className="text-2xl font-bold">Bulan {month}</h2>
              <h2 className="text-xl font-semibold">Tahun {year}</h2>
              <div className="grid auto-cols-[308px] grid-flow-col gap-6 overflow-x-auto mt-4">
                {monthYearData.map((item) => (
                  <div key={item.id} className="border-2 p-3 rounded-md">
                    <h2 className="font-bold">{item.kegiatan}</h2>
                    <div className="flex flex-row mt-4">
                      <div className="space-y-4">
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">Satuan</h2>
                          <p>{item.satuan}</p>
                        </button>
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">ABS Target Sasaran</h2>
                          <p>{item.target_sasaran}</p>
                        </button>
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">Realisasi</h2>
                          <p>{item.realisasi}</p>
                        </button>
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">Capaian</h2>
                          <p>{item.capaian}</p>
                        </button>
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">Nilai</h2>
                          <p>{Math.round(item.nilai * 100)}%</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Penilaian;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import symbol from "../assets/search.svg";
// import { getFaskesById } from "../store/actions/location";
import { getNilaiPusk } from "../store/actions/penilaian";
import { useNavigate } from "react-router-dom";
// import icon from "../assets/plusIcon.svg";

const Pkp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataFas } = useSelector((state) => state.locationReducers);

  const { nilaiPusk } = useSelector((state) => state.penilaianReducers);
  // console.log(nilaiPusk);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  // Filter the data based on the search query
  const filteredData = dataFas.filter((item) =>
    item.nama_pusk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faskesById = async (id) => {
    const res = await dispatch(getNilaiPusk(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
    // console.log(res);
    if (res.error) {
      setError(res.error.response.data.message);
    } else {
      setError(false);
    }
  };

  const throwIdPus = () => {
    navigate("/penilaian", {
      state: { id_pusk: nilaiPusk.id },
    });
  };

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });

  return (
    <div className="mt-20" id="pkp">
      <h2 className="text-xl font-bold mb-4 text-[#293241] underline">
        Penilaian Puskesmas
      </h2>
      <div className="flex min-[240px]:flex-col md:flex-row md:space-x-10 min-[240px]:space-y-8 md:space-y-0">
        <div className=" bg-white shadow-md rounded-lg ">
          <div className="flex flex-row space-x-4 bg-[#4F709C] p-3 rounded-t-md justify-between">
            <h4 className="text-xl font-semibold text-white">Puskesmas</h4>
            <div className="flex bg-white input input-sm input-bordered border-gray-300 rounded-md space-x-3 mx-5 w-44">
              <img src={symbol} className="w-4" alt="" />
              <input
                type="text"
                placeholder="Cari"
                className="focus:outline-none bg-white w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
            </div>
          </div>
          <div className="divide-y-2 overflow-auto h-[340px] px-4">
            {filteredData?.map((item) => (
              <div key={item.id} className="py-2">
                <button
                  onClick={() => faskesById(item.id)}
                  className="text-left w-full"
                >
                  <h2 className="text-lg font-semibold">
                    Puskesmas {item.nama_pusk}
                  </h2>
                  <p className="text-zinc-400">
                    Kode Puskesmas {item.kode_pusk}
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-[1000px] min-[244px]:w-full bg-white rounded-lg shadow-md py-4 px-8">
          {!nilaiPusk && !error && (
            <div className=" rounded-lg w-full p-4 text-center bg-[#CFE2FF] border-[#9EC5FE] border-2">
              <h2 className="text-2xl font-semibold text-[#052C65]">
                Pilih Puskesmas
              </h2>
            </div>
          )}
          {!error && nilaiPusk ? (
            <>
              <div className="flex flex-row justify-between border-b-2 pb-2">
                <div>
                  <h2 className="text-xl font-semibold ">
                    Puskesmas {nilaiPusk.nama_pusk}
                  </h2>
                  <p>Bulan {currentMonth}</p>
                </div>
                <button
                  onClick={() => throwIdPus()}
                  className="place-self-center underline font-bold"
                >
                  Selengkapnya
                </button>
              </div>
              <div className="grid auto-cols-[308px] grid-flow-col gap-6 overflow-x-auto mt-4">
                {nilaiPusk.penilaians?.map((item) => (
                  <div key={item.id} className="border-2 p-3 rounded-md">
                    <h2 className="font-bold">{item.kegiatan}</h2>
                    <div className="flex flex-row mt-4">
                      <div className="space-y-4">
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">ABS Target Sasaran</h2>
                          <p>{item.target_sasaran}</p>
                        </button>
                        <button className="text-left border-2 rounded-md w-full px-4 py-1">
                          <h2 className="font-semibold">Realisasi</h2>
                          <p>{item.realisasi}</p>
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
            </>
          ) : error ? (
            <div className=" rounded-lg w-full p-4 text-center bg-[#FFF5DC]">
              <h2 className="text-2xl font-semibold text-[#FFB800]">{error}</h2>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pkp;

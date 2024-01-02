import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { logout } from "../store/actions/auth";
import { getFaskes, getFaskesById, getLocationFaskes } from "../store/actions/location";
import * as XLSX from "xlsx";
import {
  createNilai,
  deleteNilaiPusk,
  getNilaiPusk,
  updateNilaiPusk,
} from "../store/actions/penilaian";

const itemsPerPage = 8;
const EditAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataFas, dataFasId } = useSelector(
    (state) => state.locationReducers
  );
  const { nilaiPusk } = useSelector((state) => state.penilaianReducers);
  // console.log(nilaiPusk);

  useEffect(() => {
    dispatch(getFaskes());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [penilaian, setPenilaian] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [popUpDel, setPopUpDel] = useState(false);
  const [id, setId] = useState(false);
  // const [kegiatan, setKegiatan] = useState("");
  // const [sasaran, setSasaran] = useState("");
  // const [target, setTarget] = useState("");
  // const [realisasi, setRealisasi] = useState("");
  // const [capaian, setCapaian] = useState("");
  // const [nilai, setNilai] = useState("");

  const [clickedArrow, setClickedArrow] = useState(null);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigateToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setClickedArrow("previous");
  };

  const navigateToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setClickedArrow("next");
  };

  const columnMappings = {
    "Table 1": "kegiatan",
    __EMPTY: "satuan",
    __EMPTY_1: "target",
    __EMPTY_2: "sasaran",
    __EMPTY_3: "target_sasaran",
    __EMPTY_4: "realisasi",
    __EMPTY_5: "capaian",
    __EMPTY_6: "nilai",
    __EMPTY_7: "bulan",
    __EMPTY_8: "tahun",
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          const specificRows = json.slice(1, 20);
          // console.log(specificRows)
          const updatedJsonData = specificRows.map((item) => {
            for (const originalColumnName in columnMappings) {
              const newColumnName = columnMappings[originalColumnName];
              if (item[originalColumnName] !== undefined) {
                item[newColumnName] = item[originalColumnName];
                delete item[originalColumnName];
              }
            }
            // console.log(typeof item);
            // alert("data masuk")
            return item;
          });
          setPenilaian(updatedJsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Silakan unggah file Excel (.xls atau .xlsx) yang valid.");
      }
    }
  };

  // console.log(penilaian);

  const formPenilaian = (event) => {
    // const getScore = dispatch(getNilaiPusk(id));
    if (!penilaian) {
      // console.log(getScore);
      alert("Silakan unggah file Excel (.xls atau .xlsx) yang valid.");
    } else {
      penilaian?.forEach(async (item) => {
        const satuan = item.satuan.toString();
        const target = item.target.toString();
        const sasaran = item.sasaran.toString();
        const target_sasaran = item.target_sasaran.toString();
        const realisasi = item.realisasi.toString();
        const capaian = item.capaian.toString();
        const nilai = item.nilai.toString();
        const bulan = item.bulan;
        const tahun = item.tahun;
        // console.log(item.kegiatan);
        const data = {
          id_pusk: id,
          kegiatan: item.kegiatan,
          satuan,
          target,
          sasaran,
          target_sasaran,
          realisasi,
          capaian,
          nilai,
          bulan,
          tahun
        };
        const res = await dispatch(createNilai(data))
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
        // console.log(res);
        if (!res.error) {
          setModal(false);
          setError(false);
          setPopUp(true);
          setTimeout(() => {
            setPopUp(false);
          }, 2000);
        }
      });
    }
  };

  // const updateNilaiForm = () => {
  //   console.log(id);
  //   console.log(penilaian);
  //   if (!penilaian) {
  //     alert("Silakan unggah file Excel (.xls atau .xlsx) yang valid.");
  //   } else {
  //     penilaian?.forEach(async (item) => {
  //       const sasaran = item.sasaran.toString();
  //       const target = item.abs_target.toString();
  //       const realisasi = item.realisasi.toString();
  //       const capaian = item.capaian.toString();
  //       const nilai = item.nilai.toString();
  //       // console.log(item.kegiatan);
  //       const data = {
  //         // id_pusk: id,
  //         kegiatan: item.kegiatan,
  //         sasaran,
  //         target,
  //         realisasi,
  //         capaian,
  //         nilai,
  //       };
  //       console.log(data);
  //       const res = await dispatch(updateNilaiPusk(id, data))
  //         .then((response) => ({ response }))
  //         .catch((error) => ({ error }));
  //       console.log(res);
  //       if (!res.error) {
  //         setModal(false);
  //         setError(false);
  //         setPopUp(true);
  //         setTimeout(() => {
  //           setPopUp(false);
  //         }, 2000);
  //       }
  //     });
  //   }
  // };

  const modalHandler = async (id) => {
    setId(id);
    const res = await dispatch(getFaskesById(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
    // console.log(res);

    if (res.response) {
      setError(false);
      setModal(true);
    }
    if (res.error) {
      setError(true);
      setModal(res.error.response.data.message);
    }
  };

  const deleteById = async (id) => {
    const res = await dispatch(deleteNilaiPusk(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
    if (!res.error) {
      setModal(false);
      setError(false);
      setPopUpDel(true);
      setTimeout(() => {
        setPopUpDel(false);
      }, 2000);
    }
  };

  // console.log(id);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataFas?.slice(startIndex, endIndex);
  const totalPages = Math.ceil((dataFas?.length || 0) / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <div className="relative bg-white">
        <div>
          <div className="px-20 pt-12 pb-9 bg-[#213555] text-white">
            <div className="navbar ">
              <div className="navbar-start">
                <div className="flex items-center">
                  <div>
                    <img src="/logo_dkk.png" alt="logo" className="w-28 h-24" />
                  </div>
                  <div className="flex-col">
                    <div className="font-semibold text-2xl">
                      Dashboard Admin
                    </div>
                    <div className="font-semibold text-2xl">SDKPT</div>
                  </div>
                </div>
              </div>
              <div className="navbar-end gap-12 relative">
                <button className="flex items-center">
                  <a
                    href="/dashboard"
                    className="text-2xl font-semibold scroll-smooth text-white"
                  >
                    Dashboard
                  </a>
                </button>
                <button className="flex items-center">
                  <a
                    href="/admin"
                    className="text-2xl font-semibold scroll-smooth text-white"
                  >
                    User
                  </a>
                </button>
                <button>
                  <div
                    onClick={() => dispatch(logout(navigate))}
                    className="text-2xl font-semibold scroll-smooth"
                  >
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-center mt-20 mb-5">
              <div className="flex flex-col">
                <a className="w-fit" href="/admin">
                  <button className="bg-[#4F709C] text-left px-4 py-2 rounded-md text-white">
                    Kembali
                  </button>
                </a>
                <p className="text-xl font-bold text-black mr-[200px] mt-4">
                  Nilai Puskesmas
                </p>
                {popUp && (
                  <div className=" rounded-lg w-full p-4 text-center bg-[#D1E7DD] border-[#A6D0BD] border-2 transition-opacity duration-1000">
                    <h2 className="text-2xl font-semibold text-[#0A3622]">
                      Berhasil Input Nilai Baru
                    </h2>
                  </div>
                )}
                {popUpDel && (
                  <div className=" rounded-lg w-full p-4 text-center bg-[#F8D7DA] border-[#F1AEB5] border-2 transition-opacity duration-1000">
                    <h2 className="text-2xl font-semibold text-[#58151C]">
                      Berhasil Hapus Data
                    </h2>
                  </div>
                )}
                <div className="flex justify-center mt-6 mb-5">
                  <div className="flex flex-col">
                    <table
                      style={{ borderCollapse: "collapse", width: "800px" }}
                    >
                      <thead>
                        <tr className="text-white bg-[#213555]">
                          <th className=" py-2 px-3 ">No</th>
                          <th className=" py-2 px-3 text-left">Puskesmas</th>
                          <th className=" py-2 px-3 text-left">Kode</th>
                          <th className=" py-2 px-3 ">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-black">
                        {currentData && currentData.length > 0 ? (
                          currentData.map((item, index) => (
                            <tr key={item.id}>
                              <td
                                className={`border py-2 px-3 ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-300" // Menentukan warna latar belakang berdasarkan nomor ganjil/genap
                                }`}
                              >
                                {startIndex + index + 1}
                              </td>
                              <td
                                className={`border py-2 px-3 ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-300" // Menentukan warna latar belakang berdasarkan nomor ganjil/genap
                                }`}
                              >
                                <span className="flex items-center">
                                  Puskesmas {item.nama_pusk}
                                </span>
                              </td>
                              <td
                                className={`border py-2 px-3 text-left ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-300" // Menentukan warna latar belakang berdasarkan nomor ganjil/genap
                                }`}
                              >
                                <span className="flex items-center">
                                  {item.kode_pusk}
                                </span>
                              </td>
                              <td
                                className={`border py-2  text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-300" // Menentukan warna latar belakang berdasarkan nomor ganjil/genap
                                }`}
                              >
                                <div className="flex items-center justify-center space-x-2">
                                  <button
                                    onClick={() => modalHandler(item.id)}
                                    className="px-3 py-1 bg-[#5CB85F] text-white rounded-md"
                                    type="submit"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="p-2 border-b border-solid border-[#ddd] text-center"
                            >
                              No data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="flex justify-end text-black mt-5 mb-5 space-x-2">
                      <button
                        onClick={navigateToPreviousPage}
                        className={`${
                          clickedArrow === "previous" && currentPage !== 1
                            ? "bg-[#4F709C] text-white"
                            : currentPage === 1
                            ? "bg-[#4F709C] text-white"
                            : "bg-zinc-200 text-black"
                        } w-fit px-3 m-0`}
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </button>

                      {pageNumbers.map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`${
                            pageNumber === currentPage
                              ? "bg-[#4F709C] text-white"
                              : "bg-zinc-200 text-black"
                          } w-8 h-8 m-0`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={navigateToNextPage}
                        className={`${
                          clickedArrow === "next" && currentPage !== totalPages
                            ? "bg-[#4F709C] text-white"
                            : currentPage === totalPages
                            ? "bg-[#4F709C] text-white"
                            : "bg-zinc-200 text-black"
                        } w-fit px-3 m-0`}
                        disabled={currentPage === totalPages}
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Footer></Footer>
        </div>

        {modal && !error && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="p-6 rounded-md bg-white  h-fit relative">
              <div className=" rounded-lg w-fit p-4 text-center bg-[#CFE2FF] border-[#9EC5FE] border-2">
                <div className="flex flex-col self-center text-center justify-center">
                  <h2 className="font-bold text-2xl">
                    Puskesmas {dataFasId.nama_pusk} Sudah Dinilai
                  </h2>
                  <h2 className="font-bold">
                    Silahkan Cek Pada Dashboard Utama
                  </h2>
                  <div className="flex flex-col space-y-2 mt-3 justify-between w-fit self-center">
                    <button className="px-4 py-2 bg-[#4F709C] w-fit self-center text-white font-semibold text-md rounded-md ">
                      <a href="/dashboard">Lihat Dashboard</a>
                    </button>
                    <div className="divider">OR</div>
                    <form>
                      <label htmlFor="upload">
                        <input
                          type="file"
                          name="upload"
                          accept=".xls, .xlsx"
                          id="upload"
                          required
                          onChange={readUploadFile}
                          className="file-input w-full max-w-xs"
                        />
                      </label>
                    </form>
                    <button
                      onClick={() => formPenilaian(id)}
                      className="px-4 py-2 bg-[#DC3545] text-white font-semibold text-md rounded-md"
                      type="submit"
                    >
                      Upload Penilaian baru
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fixed inset-0 bg-black opacity-50"
              onClick={() => setModal(false)}
            ></div>
          </div>
        )}
        {modal && error && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="p-6 rounded-md bg-white  h-fit relative">
              <div className=" rounded-lg w-fit p-4 text-center bg-[#FFF3CD] text-[#664D03] border-[#FFE69E] border-2">
                <div className="flex flex-col self-center text-center justify-center">
                  <h2 className="font-bold text-2xl">{modal}</h2>
                  <h2 className="font-bold">
                    Silahkan input nilai berupa excel
                  </h2>
                  <div className="flex flex-col space-y-2 mt-3 justify-between w-fit self-center">
                    <form>
                      <label htmlFor="upload">
                        <input
                          type="file"
                          name="upload"
                          accept=".xls, .xlsx"
                          id="upload"
                          required
                          onChange={readUploadFile}
                          className="file-input w-full max-w-xs text-black"
                        />
                      </label>
                    </form>
                    <button
                      onClick={() => formPenilaian(id)}
                      className="px-4 py-2 bg-[#5CB85F] text-white font-semibold text-md rounded-md"
                      type="submit"
                    >
                      Upload Penilaian Baru
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fixed inset-0 bg-black opacity-50"
              onClick={() => setModal(false)}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditAccount;

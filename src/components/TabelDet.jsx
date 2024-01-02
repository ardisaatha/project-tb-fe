import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPasienById } from "../store/actions/pasien";

const itemsPerPage = 10;

const TableDet = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { dataByIdKel, dataById, fasyankes } = useSelector(
    (state) => state.pasienReducers
  );
  // console.log(dataByIdKel);

  const totalPages = Math.ceil(dataByIdKel.length / itemsPerPage);

  const getCurrentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = startIndex + itemsPerPage - 1;
    return dataByIdKel.slice(startIndex - 1, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showModal = (itemId) => {
    dispatch(getPasienById(itemId));
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5; // Jumlah tombol yang terlihat sekaligus
    const totalButtons = Math.min(totalPages, maxVisibleButtons); // Total tombol yang ditampilkan
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2); // Setengah dari jumlah tombol yang ditampilkan

    let startPage = currentPage - halfVisibleButtons; // Halaman awal yang ditampilkan
    if (startPage <= 0) {
      startPage = 1;
    }

    let endPage = startPage + totalButtons - 1; // Halaman akhir yang ditampilkan
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          style={buttonStyle}
        >
          1
        </button>
      );

      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" style={{ padding: "2px 5px" }}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          style={buttonStyle}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" style={{ padding: "2px 5px" }}>
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={buttonStyle}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="md:px-52 min-[240px]:px-4">
      <div className="flex justify-center mt-20 mb-5">
        <div className="flex flex-col">
          <div className="text-xl font-bold mb-4 text-[#293241]">
            <p>Tabel</p>
          </div>
          <div className="min-[240px]:w-screen md:w-fit overflow-auto">
			<table className="border-collapse md:w-[1000px] min-[240px]:w-72">
			  <thead>
				<tr className="text-white bg-[#213555]">
				  <th className="p-3 border-b-2 border-gray-700">No</th>
				  <th className="p-3 border-b-2 border-gray-700">Kode Pasien</th>
				  <th className="p-3 border-b-2 border-gray-700">Umur</th>
				  <th className="p-3 border-b-2 border-gray-700">
					Jenis Kelamin
				  </th>
				  <th className="p-3 border-b-2 border-gray-700">Alamat </th>
				  <th className="p-3 border-b-2 border-gray-700">
					Pengobatan Terakhir
				  </th>
				  <th className="p-3 border-b-2 border-gray-700">
					Detail Pasien
				  </th>
				</tr>
			  </thead>
			  {dataByIdKel && (
				<tbody className="text-black">
				  {getCurrentData().map((item, index) => (
					<tr key={item.id} className="bg-white">
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{(currentPage - 1) * itemsPerPage + index + 1}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{item.kode_pasien}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{item.umur}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{item.jenis_kelamin}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{item.kelurahan.nama_kelurahan}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						{item.hasil_akhir}
					  </td>
					  <td className="p-3 border-b-[1px] border-[#727d90] text-center">
						<button
						  className="btn w-20 h-9 text-xs bg-[#5CB85F] text-white hover:bg-[#4F709C] hover:border-[#4F709C]"
						  onClick={() => showModal(item.id)}
						>
						  Lihat Detail
						</button>
						<dialog
						  open={isModalOpen}
						  onClose={handleCloseModal}
						  className="modal bg-transparent"
						>
						  <form
							method="dialog"
							className="modal-box bg-[#F6F6F6] text-[#213555] text-justify"
						  >
							<h2 className="p-2 pl-2 rounded-sm font-bold text-lg text-white bg-[#213555]">
							  Detail Pasien
							</h2>
							<table className="w-full">
							  <tbody>
								<tr className="border-b-[1px] border-black">
								  <td className="">Kode Pasien</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.kode_pasien}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Kode Fasyankes</td>
								  <td className="pr-3">:</td>
								  <td>{fasyankes.kode_fasyankes}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Tahun</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.tahun}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Bulan</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.bulan}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Tipe Diagnosis</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.tipe_diagnosis}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Anatomi TBC</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.anatomi_tb}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Riwayat TBC</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.riwayat_tb}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Riwayat Diabetes Melitus</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.riwayat_dm}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Riwayat HIV</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.riwayat_hiv}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Panduan Obat</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.panduan_oat}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Sumber Obat</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.sumber_obat}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Status Pengobatan</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.status_pengobatan}</td>
								</tr>
								<tr className="border-b-[1px] border-black">
								  <td className="">Pengobatan Terakhir</td>
								  <td className="pr-3">:</td>
								  <td>{dataById.hasil_akhir}</td>
								</tr>
							  </tbody>
							</table>
						  </form>
						  <form method="dialog" className="modal-backdrop">
							<button>close</button>
						  </form>
						</dialog>
					  </td>
					</tr>
				  ))}
				</tbody>
			  )}
			</table>
		  </div>
          <div className="flex justify-end text-black mt-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isPreviousDisabled}
              style={buttonStyle}
            >
              &lt;
            </button>

            {renderPaginationButtons()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isNextDisabled}
              style={buttonStyle}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <div
          className="btn border-[#4F709C] bg-[#4F709C] text-white hover:bg-[#4F709C] hover:border-[#4F709C] mb-2"
          onClick={() => navigate("/dashboard")}
        >
          Kembali ke Dashboard
        </div>
      </div>
      
    </div>
  );
};

// Gaya untuk tombol pagination
const buttonStyle = {
  padding: "2px 10px",
  margin: "0 2px",
  border: "1px solid black",
  backgroundColor: "white",
  color: "#293241",
  cursor: "pointer",
};

export default TableDet;

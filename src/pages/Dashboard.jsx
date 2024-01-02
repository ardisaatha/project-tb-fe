import Navbar from "../components/navbar";
import Stats from "../components/Stats";
import Map from "../components/Map";
import bgHero from "../assets/bg-hero.png";
// import iconTb from '../assets/icon-tb.png';
import iconInfo from "../assets/icon-info.png";
import Footer from "../components/Footer";
import LineGraph from "../components/LineGraph";
import Pkp from "../components/Pkp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFaskes,
  getKelurahan,
  getLocation,
  getLocationFaskes,
} from "../store/actions/location";
import { getPasien } from "../store/actions/pasien";
import { getAllKerentanan } from "../store/actions/predict";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPasien());
    dispatch(getLocation());
    dispatch(getKelurahan());
    dispatch(getFaskes());
    dispatch(getAllKerentanan())
    dispatch(getLocationFaskes());
  }, [dispatch]);
  return (
    <div className="bg-[#F6F6F6]">
      <div>
        <div
          className="flex flex-col min-[240px]:h-[600px] md:min-h-screen text-white bg-center bg-cover bg-blend-overlay bg-fixed bg-black/30"
          style={{
            backgroundImage: `url(${bgHero})`,
          }}
        >
          <Navbar />
          <div className="min-[240px]:pt-8 md:pt-16 md:px-40 min-[240px]:px-4">
            <div>
              <div className="min-[240px]:text-2xl md:text-4xl font-bold text-[#FFB800]">
                Selamat Datang,
              </div>
              <div className="min-[240px]:text-4xl md:text-6xl font-bold">
                Sistem Distribusi Kerentanan Penyakit Tuberkulosis
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-8 justify-center items-center flex-col">
          <div className="md:-mt-[75px] min-[240px]:-mt-[150px] card rounded-3xl w-fit bg-[#4F709C] drop-shadow-lg">
            <div className="flex pb-4 pt-3 px-10 flex-col">
              <div>
                <Stats />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-20 min-[240px]:px-4 text-black ">
        <div className="md:mt-28 min-[240px]:mt-10">
          <div className="text-xl font-bold mb-4 text-[#293241]">
            <u>Grafik</u>
          </div>
          <LineGraph />
        </div>
        <Pkp />
        <div className="w-full mt-20">
          <div className="text-xl font-bold mb-4 text-[#293241]">
            <u>Pemetaan</u>
          </div>
          <Map />
        </div>
        <div className="mt-10 bg-[#E3F2FD] rounded-lg py-4 pl-4 border border-[#1565C0]">
          <div className="flex gap-2 items-center">
            <img src={iconInfo} alt="icon info" className="h-[20px] w-[20px]" />
            <h1>Disclaimer:</h1>
          </div>
          <p className="text-base px-11 text-justify">
            Peta di atas merupakan Peta Sebaran Kasus Tuberkulosis di Kota
            Semarang dan bukan merupakan Peta Level Kewaspadaan Covid-19.
            <br />
            Tidak seluruh data kasus memiliki kelengkapan alamat Kota/Kab,
            Kecamatan dan Kelurahan/Desa (butuh proses verifikasi) sehingga
            tidak seluruhnya dapat divisualisasikan.
            <br />
            Data kasus diatas diupdate setiap 6 bulan sekali, dan silahkan cek
            kembali secara reguler untuk mendapatkan informasi terbaru.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import bannerBg from "../assets/bannerBg.png";
import bannerIcon from "../assets/bannerIcon.png";

const Banner = () => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <div
      className="h-full bg-no-repeat w-full bg-cover bg-bottom"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="flex md:flex-row min-[240px]:flex-col md:gap-20 min-[240px]:mx-4 md:mx-28">
        <div className="flex flex-col gap-3 min-[240px]:mt-40 md:mt-56 md:pl-10">
          <p className="text-4xl font-bold">Berantas Tuberkulosis!</p>
          <p className="text-sm md:w-[468px] font-sans">
            Bersama-sama, mari kita berantas tuberkulosis (TBC) dan menjaga
            dunia bebas dari penyakit yang mengancam ini! Wujudkan dalam gerakan
            kami untuk vaksinasi, edukasi, dan perawatan yang menyeluruh, demi
            mewujudkan masa depan yang sehat bagi semua.
          </p>
          <p className="text-[#EE6C4D] text-lg font-bold">
            Bersatu Kita Kalahkan TBC
          </p>
          <div className="my-7">
            {accessToken && (
              <a
                href="/dashboard"
                className="bg-[#EE6C4D] rounded-md py-2 px-4 text-white font-bold text-lg "
              >
                Lihat Dashboard
              </a>
            )}
          </div>
        </div>
        <div className="drop-shadow-md md:ml-24 md:mt-[230px] mb-[100px]">
          <img src={bannerIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

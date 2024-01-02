import React from "react";
import serviceImg from "../assets/serviceImg.png";
import serviceVec from "../assets/serviceVec.svg";

const Service = () => {
  return (
    <div className="mt-[101px] flex min-[240px]:flex-col md:flex-row md:space-x-[103px] md:px-[210px] min-[240px]:px-4" id="service">
      <div>
        <img src={serviceImg} alt="" className="drop-shadow-lg" />
      </div>
      <div>
        <h4 className="font-bold text-[24px] my-8">
          Kenali Gejala Tuberkulosis
        </h4>
        <p className=" mt-6 md:w-[468px]">
          Tuberkulosis (TB) adalah penyakit menular yang disebabkan oleh infeksi
          bakteri Mycobacterium tuberculosis. Meskipun biasanya menyerang
          paru-paru, TB juga dapat mempengaruhi organ lain dalam tubuh. Berikut
          adalah beberapa gejala umum tuberkulosis:
        </p>
        <div className=" mt-5 space-y-4">
          <div className="flex flex-row space-x-4">
            <img src={serviceVec} alt="" />
            <p>Batuk yang berlangsung lebih dari 3 minggu</p>
          </div>
          <div className="flex flex-row space-x-4">
            <img src={serviceVec} alt="" />
            <p>Mengalami penurunan berat badan yang tidak dapat dijelaskan</p>
          </div>
          <div className="flex flex-row space-x-4">
            <img src={serviceVec} alt="" />
            <p>Sering mengalami demam yang terus-menerus</p>
          </div>
          <div className="flex flex-row space-x-4">
            <img src={serviceVec} alt="" />
            <p>Nyeri atau ketidaknyamanan pada dada saat bernapas atau batuk</p>
          </div>
          <div className="flex flex-row space-x-4">
            <img src={serviceVec} alt="" />
            <p>Sering merasa sangat lelah dan lemah sepanjang waktu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

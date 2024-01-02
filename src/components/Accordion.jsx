import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrderTerms = () => {
  // const { state } = useLocation();
  // const dispatch = useDispatch()
  const { intervensi } = useSelector((state) => state.predictReducers);
  return (
    <div className="min-[240px]:px-4 md:px-52 text-black">
      <div className="card card-large bg-[#F6F6F6] ">
        <div className="text-2xl font-medium">Kebijakan</div>
        <div className="mt-4">
          <div className="flex-col space-y-5">
            {intervensi &&
              intervensi.map((item) => (
                <div key={item.judul_intervensi} className="card w-full bg-[white] border-2 text-black">
                  <div className="p-5">
                    <h2 className="card-title">{item.judul_intervensi}</h2>
                    <p>{item.isi_intervensi}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderTerms;

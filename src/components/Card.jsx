import React from "react";

export default function Card({ cardTitle, cardProp }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 xl:mb-0 border-2">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full max-w-full">
              <h4 className="text-gray-600 text-md font-bold mb-2">
                {cardTitle}
              </h4>
              <h6 className="text-gray-800 text-lg">{cardProp}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Card.defaultProps = {
  cardTitle: "judul",
  cardProp: 0,
};

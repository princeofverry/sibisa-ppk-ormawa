import Image from "next/image";
import React from "react";
import maps from "/public/images/maps.png";

const Denah = () => {
  return (
    <>
      <h1 className="text-[#3C5480] text-3xl font-medium text-center">
        Titik Rumah <span className="font-bold">Digital</span>
      </h1>
      <div className="flex flex-col items-center mt-8">
        <div className="bg-white px-36 py-8 rounded-2xl shadow-2xl">
          <Image src={maps} alt="maps" />
        </div>
      </div>
    </>
  );
};

export default Denah;

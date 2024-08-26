import Image from "next/image";
import React from "react";
import element from "/public/images/element-titik.png";

const Box3R = () => {
  return (
    <>
      <div className="relative flex md:flex-row flex-col justify-evenly items-center">
        <Image
          src={element}
          alt="titik"
          height={50}
          width={330}
          className="absolute left-0 top-0 z-0"
        />
        <div className="bg-white text-[#3C5480] w-80 h-80 space-y-4 shadow-2xl px-6 py-16 rounded-2xl z-10">
          <h1 className="font-semibold text-3xl text-center">Reduce</h1>
          <p className="text-justify text-2xl">
            Mengurangi jumlah sampah yang dihasilkan dengan menggunakan produk
            lebih sedikit atau memilih produk yang tahan lama.
          </p>
        </div>
        <div className="bg-white text-[#3C5480] w-80 h-80 space-y-4 shadow-2xl px-6 py-16 rounded-2xl">
          <h1 className="font-semibold text-3xl text-center">Reuse</h1>
          <p className="text-justify text-2xl">
            Memanfaatkan kembali barang-barang yang masih bisa digunakan
            daripada membuangnya.
          </p>
        </div>
        <div className="bg-white text-[#3C5480] w-80 h-80 space-y-4 shadow-2xl px-6 py-16 rounded-2xl">
          <h1 className="font-semibold text-3xl text-center">Recycle</h1>
          <p className="text-justify text-2xl">
            Mengolah kembali sampah menjadi produk baru untuk mengurangi
            kebutuhan akan bahan baku baru.
          </p>
        </div>
      </div>
    </>
  );
};

export default Box3R;

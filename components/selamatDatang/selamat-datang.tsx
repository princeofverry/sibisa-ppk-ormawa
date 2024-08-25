import Image from "next/image";
import React from "react";
import gambar from "/public/images/sibisa.jpg";
import logo from "/public/images/logo-sibisa.png";

const SelamatDatang = () => {
  return (
    <div>
      <div className=" mx-auto flex items-center w-10/12 mb-4">
        <div className="border-t-4 border-[#BF5638] w-9/12"></div>
        <div className="border-t-4 border-transparent w-1/12"></div>
        <div className="border-t-4 border-[#BF5638] w-2/12"></div>
      </div>
      <h1 className="text-[#3C5480] text-center text-4xl font-medium my-12">
        Selamat Datang Di <span className="font-bold">Desa Sriwulan</span>
      </h1>
      <div className="flex flex-row justify-center gap-8">
        <p className="text-pretty text-justify w-1/3 text-2xl text-[#3C5480]">
          Desa Sriwulan terletak di Kecamatan Limbangan, Kendal, Jawa Tengah,
          terkenal dengan keindahan alamnya, terutama di Desa Wisata Arenan
          Kalikesek. Namun, masalah limbah dari aktivitas masyarakat, wisata,
          dan peternakan menjadi tantangan besar. Tim PPK Ormawa BEM FT Undip
          berkolaborasi dengan masyarakat untuk merumuskan solusi melalui
          program pembentukan Rumah Sampah Digital.
        </p>
        <Image src={gambar} alt="gambar" width={700} className="rounded-xl" />
      </div>
    </div>
  );
};

export default SelamatDatang;

import Image from "next/image";
import React from "react";
import logo from "/public/images/logo-sibisa.png";

const About = () => {
  return (
    <>
      <div className="bg-[#C9FFFF]">
        <div className="flex flex-row justify-center items-center">
          <Image src={logo} alt="logo" width={400} />
          <div className="text-[#3C5480] w-1/2 space-y-12">
            <h1 className="font-medium text-4xl">
              Tentang <span className="font-bold">SIBISA</span>
            </h1>
            <p className="text-2xl text-pretty text-justify w-full">
              SIBISA adalah program berbasis IoT yang dirancang dengan cinta dan
              dedikasi untuk mengelola limbah di Desa Sriwulan. Aplikasi ini
              memonitor pengelolaan limbah anorganik dan fermentasi pupuk kompos
              dari limbah peternakan. Dilengkapi dengan kader SIBISA, program
              ini menciptakan sistem pengelolaan limbah yang terintegrasi dan
              efektif, memberi manfaat material dan lingkungan bagi masyarakat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

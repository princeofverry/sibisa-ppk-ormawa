import React from "react";
import city from "/public/images/city.png";

const LandingPage = () => {
  return (
    <div
      className="h-screen w-full bg-[#EBFFFF] flex flex-col justify-center bg-cover"
      style={{
        backgroundImage: `url(${city.src})`,
      }}
    >
      <div
        className="text-[#3C5480] text-center  space-y-4"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h1 className="md:text-8xl text-4xl font-bold">DESA SRIWULAN</h1>
        <h2 className="md:text-4xl text-2xl">The land of enchantment</h2>
      </div>
    </div>
  );
};

export default LandingPage;

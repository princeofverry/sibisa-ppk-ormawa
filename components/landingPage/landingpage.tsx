import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import delivery from "/public/images/delivery.png";

const LandingPage = () => {
  return (
    <>
      <div className="bg-[#D4D5D5] w-full h-screen py-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Innovative Waste Management</h1>
          <h2 className="text-xl">IoT-Driven Waste Solutions</h2>
        </div>
        <Image className="py-8" src={delivery} alt="delivery" />
        <Link href="/login">
          <Button className="px-16 rounded-2xl bg-[#3C5480]">Next</Button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;

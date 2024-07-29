import React from "react";
import writing from "/public/images/writing.png";
import Image from "next/image";
import { Search } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-[#D4D5D5] h-screen w-full px-4">
      <div className="flex flex-row items-center justify-center md:space-x-56 space-x-12">
        <h1 className="font-bold md:text-4xl text-2xl">Hi, Admin!</h1>
        <Image src={writing} alt="alt" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start">
          <label className="text-xl">Search by name or number phone</label>
          <div className="flex flex-col relative">
            <input
              type="email"
              placeholder="Enter name"
              className="bg-blue rounded-xl px-12 py-2 border-2 border-[#3C5480] text-xl"
            />
            <Search className="absolute left-2 bottom-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";
import React, { useState, ChangeEvent } from "react";
import writing from "/public/images/writing.png";
import Image from "next/image";
import { Pencil, Search, Trash, UserRound } from "lucide-react";
import dummyNames from "@/lib/constant/name";

interface NameItem {
  name: string;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredNames = dummyNames.filter((item: NameItem) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#D4D5D5] h-screen w-full px-4">
      <div className="flex flex-row items-center justify-center md:space-x-56 space-x-8">
        <h1 className="font-bold md:text-4xl text-2xl">Hi, Admin!</h1>
        <Image src={writing} alt="alt" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start">
          <label className="md:text-xl text-lg">
            Search by name or number phone
          </label>
          <div className="flex flex-col relative mb-6 w-72">
            <input
              type="text"
              placeholder="Enter name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-blue rounded-xl px-12 py-2 border-2 border-[#3C5480] text-xl"
            />
            <Search className="absolute left-2 bottom-3" />
          </div>
        </div>
        <div className="h-60 overflow-y-auto no-scrollbar">
          {filteredNames.map((item, index) => (
            <div
              key={index}
              className="py-3 w-72 px-2 bg-[#BACC58] rounded-xl text-white mb-4"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-center gap-2">
                  <UserRound />
                  <h1>{item.name}</h1>
                </div>
                <div className="flex flex-row justify-center gap-2">
                  <Pencil />
                  <Trash />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

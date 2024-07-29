import React from "react";
import { Compass, House } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="bottom-0 fixed w-full p-4 z-10">
        <div className="flex flex-row justify-center items-center space-x-8 md:space-x-48 bg-transparent">
          <Link href="/">
            <div className="flex flex-col items-center">
              <House />
              House
            </div>
          </Link>
          <Link href="/explore">
            <div className="flex flex-col items-center">
              <Compass />
              Explore
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
import { House } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="bottom-0 fixed w-full p-4">
        <div className="flex flex-row justify-center items-center space-x-8 md:space-x-48 bg-transparent">
          <Link href="/">
            <House />
          </Link>
          <House />
          <House />
        </div>
      </div>
    </>
  );
};

export default Navbar;

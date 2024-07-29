import React from "react";
import { House } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="bottom-0 fixed w-full">
        <div className="flex flex-row justify-around items-center gap-8 bg-blue-200">
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

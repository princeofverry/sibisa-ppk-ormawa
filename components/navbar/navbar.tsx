import React from "react";
import { Activity, Compass, House, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/logout/actions";

const Navbar = () => {
  return (
    <>
      <div className="bottom-0 sticky w-full p-4 z-10">
        <div className="flex flex-row justify-center items-center space-x-8 md:space-x-32 bg-transparent">
          <Link href="/dashboard">
            <div className="flex flex-col items-center">
              <House />
              Home
            </div>
          </Link>
          <Link href="/dashboard/monitoring">
            <div className="flex flex-col items-center">
              <Activity />
              Monitoring
            </div>
          </Link>
          <Link href="/">
            <div className="flex flex-col items-center">
              <Compass />
              Explore
            </div>
          </Link>
          <form action={logout} className="flex flex-col items-center">
            <LogOutIcon />
            <button type="submit">logout</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;

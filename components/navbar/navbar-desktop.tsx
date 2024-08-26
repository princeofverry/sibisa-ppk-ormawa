"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const NavbarDesktop = () => {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (
      pathname === "/dashboard" ||
      pathname === "/dashboard/monitoring" ||
      pathname === "/login"
    ) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <nav className="flex mx-auto flex-row items-center justify-center bg-[#EBFFFF] rounded-3xl shadow-xl my-4 fixed top-0 left-0 right-0 z-50 w-2/5">
        <div className="flex flex-row items-center justify-center gap-8 p-4 text-xl text-[#3C5480] font-medium">
          <h1>Home</h1>
          <h1>lorem</h1>
          <h1>lorem</h1>
          <h1>lorem</h1>
          <h1>lorem</h1>
          <Link href="/login">
            <Button className="bg-[#45ADFF] rounded-3xl text-lg hover:bg-[#3090da]">
              Monitoring
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavbarDesktop;

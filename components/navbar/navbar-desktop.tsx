"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const NavbarDesktop = () => {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const isDashboardSlug =
      pathname.startsWith("/dashboard/") && pathname.split("/").length === 3;

    if (
      pathname === "/dashboard" ||
      pathname === "/dashboard/monitoring" ||
      pathname === "/login" ||
      isDashboardSlug
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
      <nav className="md:flex mx-auto flex-row items-center justify-center bg-[#EBFFFF] rounded-3xl shadow-xl my-4 fixed top-0 left-0 right-0 z-50 w-2/5 hidden">
        <div className="flex flex-row items-center justify-center gap-6 p-4 text-lg text-[#3C5480] font-medium">
          <h1>Home</h1>
          <h1>About</h1>
          <h1>3R</h1>
          <h1>Denah</h1>
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

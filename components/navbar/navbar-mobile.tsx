"use client";
import { Activity, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavMobile = () => {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(true);
  // const [showNavbar, setShowNavbar] = useState(false);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setShowNavbar(true);
  //     } else {
  //       setShowNavbar(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // if (!shouldRender || !showNavbar) {
  if (!shouldRender) {
    return null;
  }

  return (
    <nav className="bg-secondary w-full md:hidden block fixed bottom-0 pad-x py-4 z-50">
      <div className="text-white justify-around items-center flex w-full text-sm">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-primary" : "text-neutral-400"
          }`}
        >
          <div className="flex flex-col justify-center items-center gap-y-1.5 text-sm">
            <Home />
            <p className="text-xs">Home</p>
          </div>
        </Link>
        <Link
          href="/login"
          className={`${
            pathname === "/about" ? "text-primary" : "text-neutral-400"
          }`}
        >
          <div className="flex flex-col justify-center items-center gap-y-1.5 text-sm">
            <Activity />
            <p className="text-xs">Monitoring</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavMobile;

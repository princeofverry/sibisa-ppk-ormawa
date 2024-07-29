"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "/public/images/logo-sibisa.png";
import LandingPage from "@/components/landingPage/landingpage";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#3C5480]">
        <Image
          alt="logo"
          src={logo}
          width={500}
          height={500}
          className="mb-4"
        />
        <div className="spinner"></div>
        <style jsx>{`
          .spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <LandingPage />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { login, signup } from "./actions"; // Mengimpor login dan signup actions
import React from "react";
import logo from "/public/images/logo-sibisa.png";
import Image from "next/image";

const Auth = () => {
  return (
    <>
      <div className="bg-[#D4D5D5] w-full h-screen px-4 flex flex-col">
        <div className="text-4xl space-y-4 py-8 flex flex-col justify-center max-w-screen-sm mx-auto">
          {/* <h1 className="font-bold">Let’s sign you in.</h1>
          <div className="text-[#3C5480]">
            <h2>Welcome back</h2>
            <h2>You’ve been missed!</h2>
          </div> */}
          <Image src={logo} alt="logo" width={200} />
        </div>
        <form className="flex flex-col items-center text-lg flex-grow">
          <div className="flex flex-col items-start">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
              required
            />
          </div>
          <div className="flex flex-col items-start mt-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
              required
            />
          </div>
          <h2 className="text-[#3C5480] mt-4">Forget Password?</h2>
          <Button
            formAction={login}
            className="px-16 mt-12 rounded-2xl bg-[#3C5480]"
          >
            Login
          </Button>
        </form>
        <h2 className="text-[#3C5480] self-center mb-4">Login as guest</h2>
      </div>
    </>
  );
};

export default Auth;

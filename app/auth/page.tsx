import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Auth = () => {
  return (
    <>
      <div className="bg-[#D4D5D5] max-w-screen-sm h-screen px-4 flex flex-col">
        <div className="text-4xl space-y-4 py-8">
          <h1 className="font-bold">Let’s sign you in.</h1>
          <div className="text-[#3C5480]">
            <h2>Welcome back</h2>
            <h2>You’ve been missed!</h2>
          </div>
        </div>
        <div className="flex flex-col items-center text-lg flex-grow">
          <div className="flex flex-col items-start">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
            />
          </div>
          <div className="flex flex-col items-start">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
            />
          </div>
          <h2 className="text-[#3C5480]">Forget Password?</h2>
          <Link href="/dashboard">
            <Button className="px-16 mt-12 rounded-2xl bg-[#3C5480]">
              Login
            </Button>
          </Link>
        </div>
        <h2 className="text-[#3C5480] self-center mb-4">Login as guest</h2>
      </div>
    </>
  );
};

export default Auth;

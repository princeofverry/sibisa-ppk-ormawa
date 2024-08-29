import { Instagram, Mail } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-[#232D40] text-[#D4D5D5] flex lg:flex-row flex-col justify-evenly py-4">
        <div>
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">DESA SRIWULAN</h1>
            <p>The land of enchantment</p>
          </div>
          <div className="space-y-4 mt-4">
            <h1 className="font-bold text-xl">CONTACT US</h1>
            <div className="flex flex-row space-x-2">
              <Instagram color="#ffffff" />
              <p>@ppkormawa_bemftundip</p>
            </div>
            <div className="flex flex-row space-x-2">
              <Mail color="#ffffff" />
              <p>ppkormawabemftundip2024@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">FITUR</h1>
          <ul className="space-y-2">
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-bold mb-2">LOCATION</h1>
          <div className="max-w-full overflow-hidden text-[#D4D5D5] md:w-[500px] h-[160px] rounded-xl">
            <div id="embedded-map-display" className="h-full w-full max-w-full">
              <iframe
                className="h-full w-full border-0"
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?q=sriwulan+kendal&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              ></iframe>
            </div>
            <a
              className="code-for-google-map"
              href="https://www.bootstrapskins.com/themes"
              id="grab-maps-authorization"
            >
              premium bootstrap themes
            </a>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center font-medium text-lg">
          © Copyright 2024 | PPK ORMAWA BEM FT UNDIP
        </h1>
      </div>
    </>
  );
};

export default Footer;

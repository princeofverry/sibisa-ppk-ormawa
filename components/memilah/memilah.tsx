import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import accordionData from "@/lib/constant/accordion";
import Box3R from "../box/box";
import Points from "../points/points";

const memilah = () => {
  return (
    <>
      <div className="mx-auto flex items-center w-10/12 my-8">
        <div className="border-t-4 border-[#BF5638] w-9/12"></div>
        <div className="border-t-4 border-transparent w-1/12"></div>
        <div className="border-t-4 border-[#BF5638] w-2/12"></div>
      </div>
      <div>
        <h1 className="text-[#3C5480] font-medium text-4xl text-center my-8">
          Tahapan Memilah <span className="font-bold">Sampah</span>
        </h1>
      </div>
      <div className="w-10/12 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="text-[#122745] bg-[#C9FFFF] border-4 border-blue-400 rounded-2xl p-2 mb-4"
            >
              <AccordionTrigger className="font-bold text-2xl">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <hr className="border-t-4 border-[#94B1E8]" />
                <p className="text-justify text-xl mt-4 text-[#3C5480]">
                  {item.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-col items-center text-[#3C5480]">
        <h1 className="font-medium text-3xl text-center mt-8">
          Memilah Sampah <span className="font-bold">Anorganik</span>
        </h1>
        <p className="text-2xl text-pretty text-justify w-10/12 my-8">
          SIBISA adalah program berbasis IoT yang dirancang dengan cinta dan
          dedikasi untuk mengelola limbah di Desa Sriwulan. Aplikasi ini
          memonitor pengelolaan limbah anorganik dan fermentasi pupuk kompos
          dari limbah peternakan. Dilengkapi dengan kader SIBISA, program ini
          menciptakan sistem pengelolaan limbah yang terintegrasi dan efektif,
          memberi manfaat material dan lingkungan bagi masyarakat.
        </p>
        <p className="text-2xl text-pretty text-justify w-10/12 mb-8">
          Sampah anorganik yang telah dipilah dapat diolah dengan prinsip 3R
          (reuse, reduce, dan recycle)
        </p>
      </div>
      <Box3R />
      <div className="z-10 relative mt-20 flex flex-col items-center text-[#3C5480] space-y-8 ">
        <h1 className=" text-4xl font-medium">
          Pengolahan Limbah Organik Atau{" "}
          <span className="font-bold">Fermentasi Pupuk</span>
        </h1>
        <p className="w-10/12 text-justify text-2xl tracking-wide">
          Desa Sriwulan memiliki limbah organik berupa kotoran sapi yang cukup
          menjadi perhatian khusus bagi masyarakat setempat. Penumpukan limbah
          kotoran sapi ternyata menyimpan potensi besar dengan kita alih
          fungsikan menjadi pupuk yang bermanfaat untuk pertumbuhan tanaman.
        </p>
      </div>
      <Points />
    </>
  );
};

export default memilah;

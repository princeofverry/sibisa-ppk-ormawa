import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import accordionData from "@/lib/constant/accordion";

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
    </>
  );
};

export default memilah;

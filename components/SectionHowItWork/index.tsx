import Heading from "../../components/Heading/Heading";
import React, { FC } from "react";
import NcImage from "../../public/images/NcImage";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: string;
    imgDark?: string;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
    {
        id: 1,
        img: "/images/Data_processing_Monochromatic.svg",
        title: "Agilidad",
        desc: "Nuestro proceso es agil para brindar una experiencia más rápida y segura.",
    },
    {
        id: 2,
        img: "/images/Analyzing_process_Two_Color.svg",
        title: "Facilidad",
        desc: "Todo en un solo sitio de forma intuitiva y al alcance",
    },
    {
        id: 3,
        img: "/images/Quality_Check_Outline.svg",
        title: "Calidad",
        desc: "Nos centramos en la satisfaccion de nuestros clientes",
    },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
      <div
          className={`nc-SectionHowItWork  ${className}`}
          data-nc-id="SectionHowItWork"
      >
          <Heading
              isCenter
              desc="Nuestro proceso nos ayuda a innovar cada dia más"
          >
              Nos destaca
          </Heading>
          <div className="relative grid gap-20 mt-20 md:grid-cols-3">
              <img
                  className="absolute inset-x-0 hidden md:block top-10"
                  src={"/images/VectorHIW.svg"}
                  alt=""
              />
              {data.map((item) => (
                  <div
                      key={item.id}
                      className="relative flex flex-col items-center max-w-xs mx-auto"
                  >
                      {item.imgDark ? (
                          <>
                              <NcImage
                                  containerClassName="dark:hidden block mb-8 max-w-[200px] mx-auto"
                                  src={item.img}
                              />
                              <NcImage
                                  containerClassName="hidden dark:block mb-8 max-w-[200px] mx-auto"
                                  src={item.imgDark}
                              />
                          </>
                      ) : (
                          <NcImage
                              containerClassName="mb-8 max-w-[200px] mx-auto"
                              src={item.img}
                          />
                      )}
                      <div className="mt-auto text-center">
                          <h3 className="text-xl font-semibold">
                              {item.title}
                          </h3>
                          <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
                              {item.desc}
                          </span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default SectionHowItWork;

import Glide from "@glidejs/glide";
import React, { FC } from "react";
import { useEffect } from "react";
import useNcId from "../../hooks/useNcId";
import Heading from "../Heading/Heading";

export interface SectionClientSayProps {
  className?: string;
  uniqueClassName: string;
}

const DEMO_DATA = [
    {
        id: 1,
        clientName: "Sergio Muñoz",
        clientAddress: "Medellin",
        content:
            "Todo el proceso fue realmente fácil y rápido, me senti bien atendido. Totalmente recomendado",
    },
    {
        id: 2,
        clientName: "Milena Sanchez",
        clientAddress: "Envigado",
        content: "Me senti muy bien atendido por los asesores!",
    },
    {
        id: 3,
        clientName: "Carlos Vasquez",
        clientAddress: "Bello",
        content:
            "Los recomiendo si quieren comprar inmuebles en el Bello, esta es la mejor opción",
    },
];

const SectionClientSay: FC<SectionClientSayProps> = ({
  className = "",
  uniqueClassName = "",
}) => {
  const UNIQUE_CLASS = `SectionClientSay_glide_${uniqueClassName}` + useNcId();

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      setTimeout(() => {
        new Glide(`.${UNIQUE_CLASS}`, {
          perView: 1,
        }).mount();
      }, 10);
    }
  }, []);

  const renderBg = () => {
    return (
        <div className="hidden md:block">
            <img
                className="absolute top-9 -left-20"
                src={"images/clientSay1.png"}
                alt=""
            />
            <img
                className="absolute bottom-[100px] right-full mr-40"
                src={"images/clientSay2.png"}
                alt=""
            />
            <img
                className="absolute top-full left-[140px]"
                src={"images/clientSay2.png"}
                alt=""
            />
            <img
                className="absolute -bottom-10 right-[140px]"
                src={"images/clientSay4.png"}
                alt=""
            />
            <img
                className="absolute left-full ml-32 bottom-[80px]"
                src={"images/clientSay5.png"}
                alt=""
            />
            <img
                className="absolute -right-10 top-10 "
                src={"images/clientSay6.png"}
                alt=""
            />
        </div>
    );
  };

  return (
      <div
          className={`nc-SectionClientSay relative ${className} `}
          data-nc-id="SectionClientSay"
      >
          <Heading desc="Conoce la opinion de nuestros clientes" isCenter>
              Testimonios de nuestros clientes
          </Heading>
          <div className="relative max-w-2xl mx-auto md:mb-16">
              {renderBg()}
              <img className="mx-auto" src={"images/clientSayMain.png"} alt="" />
              <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
                  <img
                      className="absolute -mr-16 opacity-50 md:opacity-100 lg:mr-3 right-full top-1"
                      src={"images/quotation.png"}
                      alt=""
                  />
                  <img
                      className="absolute -ml-16 opacity-50 md:opacity-100 lg:ml-3 left-full top-1"
                      src={"images/quotation2.png"}
                      alt=""
                  />
                  <div className="glide__track " data-glide-el="track">
                      <ul className="glide__slides ">
                          {DEMO_DATA.map((item) => (
                              <li
                                  key={item.id}
                                  className="flex flex-col items-center text-center glide__slide"
                              >
                                  <span className="block text-2xl">
                                      {item.content}
                                  </span>
                                  <span className="block mt-8 text-2xl font-semibold">
                                      {item.clientName}
                                  </span>
                                  <div className="flex items-center mt-2 space-x-2 text-lg text-neutral-400">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={1.5}
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                          />
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={1.5}
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                      </svg>
                                      <span>{item.clientAddress}</span>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div
                      className="flex items-center justify-center mt-10 glide__bullets"
                      data-glide-el="controls[nav]"
                  >
                      {DEMO_DATA.map((item, index) => (
                          <button
                              key={item.id}
                              className="w-2 h-2 mx-1 rounded-full glide__bullet bg-neutral-300 focus:outline-none"
                              data-glide-dir={`=${index}`}
                          ></button>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default SectionClientSay;

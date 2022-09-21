import React, { FC } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";

import HeroSearchForm from "../HeroSearchForm";
import { useRouter } from "next/router";
import { motion } from "framer-motion"

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
 const router = useRouter();
  return (
      <div
          className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
          data-nc-id="SectionHero"
      >
          <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="flex flex-col items-start flex-shrink-0 space-y-8 lg:w-1/2 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
                  <motion.div
                      initial={{translateY: -12 , scale: 1 }}
                      animate={{ translateY: 0 ,scale: 1 }}
                      transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 20,
                      }}
                  >
                      <h2 className=" text-4xl md:text-5xl xl:text-7xl !leading-[114%] font-bold">
                          El inmueble que buscas, aquí
                      </h2>
                  </motion.div>
                  <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                      Si busca casa, apartamento, local o quieres vender tu
                      inmueble, tenemos las mejores opciones para ti.
                  </span>
                  <button
                      className="px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
                      onClick={() => router.push("/properties")}
                  >
                      Buscar
                  </button>
              </div>
              <div className="flex-grow">
                  <motion.div
                      initial={{ translateY: 12 }}
                      animate={{ translateY: 0 }}
                      transition={{
                          duration: 200,
                          type: "spring",
                          stiffness: 60,
                          damping: 20,
                      }}
                  >
                      <img
                          className="w-full"
                          src={"images/hero-right.png"}
                          alt="hero"
                      />
                  </motion.div>
              </div>
          </div>

          <div className="z-10 w-full mb-12 lg:mb-0 lg:-mt-40">
              <HeroSearchForm />
          </div>
      </div>
  );
};

export default SectionHero;

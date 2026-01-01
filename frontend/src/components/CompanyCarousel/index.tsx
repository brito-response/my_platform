"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface Company {
  name: string;
  logo: string;
  coloredLogo?: string;
}

const companies: Company[] = [
  { name: "Trilon", logo: "/companies/valor_software.png", coloredLogo: "/companies/valor_software.png" },
  { name: "Microsoft", logo: "/companies/valor_software.png", coloredLogo: "/companies/valor_software.png" },
  { name: "Meta", logo: "/companies/valor_software.png", coloredLogo: "/companies/valor_software.png" },
  { name: "Valor Software", logo: "/companies/valor_software.png", coloredLogo: "/companies/valor_software.png" },
];

export const CompanyCarousel: React.FC = () => {
  return (
    <section className="w-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-200 overflow-hidden flex flex-col items-center justify-center rounded-t-2xl">
      {/* Linha animada */}
      <motion.div className="flex items-center gap-6 sm:gap-10 md:gap-12" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
        {[...companies, ...companies].map((company, i) => (
          <div key={i} className=" flex items-center justify-center group w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 shrink-0">
            <div className=" relative w-full aspect-3/1 grayscale group-hover:grayscale-0 transition duration-300">
              {/* Logo cinza */}
              <Image src={company.logo} alt={company.name} fill className="object-contain opacity-80 group-hover:opacity-0 transition-all duration-300" />
              {/* Logo colorida */}
              {company.coloredLogo && (
                <Image src={company.coloredLogo} alt={`${company.name} color`} fill className="object-contain opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-all duration-300" />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

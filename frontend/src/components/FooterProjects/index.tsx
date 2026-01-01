"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonCreate, ButtonView } from "../Buttons";
import { ProjectOutput } from "@/utils/data_types/projects";
import { Portfolio } from "@/utils/data_types/portifolios";
import { motion, AnimatePresence } from "framer-motion";

type FooterProjectsProps = { portfolio: Portfolio | null };

export const FooterProjects: React.FC<FooterProjectsProps> = ({ portfolio }) => {
  const [projects, setProjects] = useState<ProjectOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (!portfolio || !portfolio.projects) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const list = Array.isArray(portfolio.projects)
      ? (portfolio.projects as ProjectOutput[])
      : [];

    setProjects(list);
    setLoading(false);
  }, [portfolio]);

  // Troca automática de imagem (efeito "parallax" suave)
  useEffect(() => {
    if (projects.length === 0) return;
    const images = projects[currentIndex]?.images || [];
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [projects, currentIndex]);

  const nextProject = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setImageIndex(0);
  };

  const prevProject = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setImageIndex(0);
  };

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <footer className="bg-blueGray-200 py-8 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-blueGray-700 mb-6">
          Seus Projetos
        </h2>

        <div className="relative w-full flex justify-center items-center h-[550px]">
          {/* Botão esquerdo */}
          <button onClick={prevProject} className="absolute left-5 z-10 bg-white/80 hover:bg-white text-gray-600 rounded-full shadow-md p-3 transition">
            <ChevronLeft size={28} />
          </button>

          {/* Card com transição */}
          <div className="w-[350px] h-[450px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {!loading && projects.length > 0 && (
                <motion.div key={currentIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: "easeInOut" }} className="absolute inset-0 flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* Imagem com leve efeito parallax */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={imageIndex}
                        src={projects[currentIndex]?.images?.[imageIndex] ? `http://localhost:3000${projects[currentIndex].images?.[imageIndex]}` : "/placeholder.png"}
                        alt={projects[currentIndex]?.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.05, opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Conteúdo do card */}
                  <div className="flex flex-col flex-1 p-5 justify-between">
                    <div>
                      <h3 className="font-semibold text-blueGray-700 text-xl mb-2 text-center">
                        {projects[currentIndex]?.title}
                      </h3>
                      <p className="text-blueGray-500 text-sm text-center line-clamp-4">
                        {projects[currentIndex]?.description}
                      </p>
                      <a href={projects[currentIndex]?.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm line-clamp-1 hover:underline transition">
                        {projects[currentIndex]?.link}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botão direito */}
          <button onClick={nextProject} className="absolute right-5 z-10 bg-white/80 hover:bg-white text-gray-600 rounded-full shadow-md p-3 transition">
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-x-5 mb-8">
          <ButtonView link={"/projects"} />
          <ButtonCreate link={"/projects/new"} />
        </div>

        <div className="text-center text-xs text-blueGray-500 font-medium mt-10">
          Atualizado em © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

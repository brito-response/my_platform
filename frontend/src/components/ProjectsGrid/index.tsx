"use client";

import React, { useState, useEffect } from "react";
import { CardJob } from "../Cards/CardJob";
import Pagination from "../Shared/Pagination";
import { JobOutput } from "@/utils/data_types/jobs";
import { Loader } from "../Shared/Loader";

const levelColors: Record<JobOutput["level"], string> = {
  LOW: "bg-[#f9b234]",
  MEDIUM: "bg-[#3ecd5e]",
  JUNIOR: "bg-[#e44002]",
  PLENO: "bg-[#952aff]",
  SENIOR: "bg-[#cd3e94]",
  EXPERT: "bg-[#4c49ea]",
};

export const JobsGrid: React.FC = () => {
  const [jobs, setJobs] = useState<JobOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const pageSize = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/jobs", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar jobs.");
        }

        const data: JobOutput[] = await response.json();
        setJobs(data);
      } catch (err: any) {
        console.error("Erro ao buscar jobs:", err);
        setError("Não foi possível carregar os jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔹 Exibe loader enquanto carrega
  if (isLoading) {
    return (<div className="w-full h-[80vh] flex justify-center items-center"><Loader /></div>);
  }

  // 🔹 Exibe erro, se houver
  if (error) {
    return (<div className="w-full text-center text-red-500 mt-10">{error}</div>);
  }

  const coloredJobs = jobs.map((job) => ({ ...job, color: levelColors[job.level] || "bg-gray-400" }));
  const filteredJobs = selectedColor ? coloredJobs.filter((job) => job.color === selectedColor) : coloredJobs;

  const start = (page - 1) * pageSize;
  const pagedJobs = filteredJobs.slice(start, start + pageSize);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const stripHTML = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      {/* 🔹 Filtro de cores por nível */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button className={`px-4 py-2 rounded-full border border-amber-600 text-sm font-semibold transition ${selectedColor === null ? "bg-(--brand-300) text-white" : "border-white text-white hover:bg-(--brand-300)"}`} onClick={() => setSelectedColor(null)}>
          Todos
        </button>

        {Object.entries(levelColors).map(([level, color]) => (
          <button key={level} className={`w-10 h-10 rounded-full border transition-all duration-300 ${color} ${selectedColor === color ? "scale-110 border-white" : "opacity-80 hover:opacity-100"}`}
            title={`Filtrar por nível ${level}`}
            onClick={() => setSelectedColor(selectedColor === color ? null : color)}
          ></button>
        ))}
      </div>

      {/* 🔹 Lista de jobs */}
      <div className="w-full max-w-[1142px] flex flex-col gap-4">
        {pagedJobs.length > 0 ? (
          pagedJobs.map((job, i) => {
            const globalIndex = start + i;
            const isExpanded = expandedIndex === globalIndex;
            return (<CardJob key={globalIndex} index={globalIndex} job={{ jobId: job.jobId, color: job.color, title: job.title, description: stripHTML(job.description), date: job.createdAt }} isExpanded={isExpanded} toggleExpand={toggleExpand} />);
          })) : (<div className="text-center text-gray-500 py-10">Nenhum job encontrado.</div>)}
      </div>

      {/* 🔹 Paginação */}
      {filteredJobs.length > pageSize && (
        <Pagination totalItems={filteredJobs.length} currentPage={page} pageSize={pageSize} onPageChange={(p) => setPage(p)} />
      )}
    </div>
  );
};

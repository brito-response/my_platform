import Link from "next/link";
import React from "react";

type CardJobProps = {
    index: number;
    job: { jobId: string; color: string; title: string; description: string; date?: Date; };
    isExpanded: boolean;
    toggleExpand: (index: number) => void;
};

export const CardJob: React.FC<CardJobProps> = ({ index, job, isExpanded, toggleExpand }) => {
    return (
        <div className={`relative group bg-gray-200 rounded-2xl transition-all duration-500 flex flex-col px-8 py-4 sm:py-6 overflow-hidden`}>
            {/* círculo colorido */}
            <div className={`absolute top-[-50px] right-[-50px] w-[120px] h-[120px] rounded-full transition-transform duration-500 ease-in-out ${job.color} group-hover:scale-[6]`}></div>

            {/* conteúdo */}
            <div className="relative z-10 text-black flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col w-full sm:w-3/4">
                    <div className="font-bold text-lg sm:text-xl">{job.title}</div>

                    {/* descrição com "ver mais" */}
                    <div className={`text-gray-700 font-light text-sm transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[200px]" : "max-h-10 overflow-hidden"}`}>
                        {job.description}
                    </div>

                    <button type="button" className="mt-1 text-xs text-[#f9b234] hover:text-black transition-colors self-start" onClick={(e) => { e.preventDefault(); toggleExpand(index); }}>
                        {isExpanded ? "Ver menos ▲" : "Ver mais ▼"}
                    </button>
                </div>

                {/* Data e botão de proposta */}
                <div className="flex flex-col items-end justify-between min-w-[150px]">
                    {job.date && (
                        <div className="text-gray-600 text-sm sm:text-base mb-2">
                            Start:{" "}
                            <span className="font-bold text-[#f9b234] group-hover:text-black transition-colors duration-300">
                                {new Date(job.date).getDate().toString()}
                            </span>
                        </div>
                    )}

                    {/* Botão de enviar proposta */}
                    <Link href={`/jobs/${job.jobId}/view`} className={`mt-auto px-4 py-2 text-sm font-semibold rounded-full bg-(--brand-400) text-white hover:text-black hover:bg-white transition`}>
                        Visualizar Tudo
                    </Link>
                </div>
            </div>
        </div>
    );
};

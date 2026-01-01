
import React from "react";

type PaginationProps = {
    totalItems: number;
    currentPage: number;
    pageSize?: number;
    siblingCount?: number; // quantos vizinhos mostrar ao redor da página atual
    onPageChange: (page: number) => void;
};

const range = (from: number, to: number) => {
    const arr = [];
    for (let i = from; i <= to; i++) arr.push(i);
    return arr;
};

export default function Pagination({
    totalItems,
    currentPage,
    pageSize = 5,
    siblingCount = 1,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    if (totalPages === 1) return null;

    const showPages = () => {
        const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots
        if (totalPages <= totalNumbers) {
            return range(1, totalPages);
        }

        const left = Math.max(2, currentPage - siblingCount);
        const right = Math.min(totalPages - 1, currentPage + siblingCount);
        const pages: (number | "DOTS")[] = [];

        if (left > 2) {
            pages.push(1, "DOTS", ...range(left, right), totalPages);
        } else {
            pages.push(...range(1, right), "DOTS", totalPages);
        }

        if (right < totalPages - 1 && left <= 2) {
            // already handled above
        } else if (right < totalPages - 1 && left > 2) {
            // already included
        }

        // normalize when left === 2 (no leading dots)
        if (left === 2) {
            return [...range(1, right), "DOTS", totalPages] as (number | "DOTS")[];
        }

        return pages;
    };

    const pages = showPages();

    return (
        <div className="w-full flex items-center justify-center mt-6">
            <nav aria-label="Paginação" className="inline-flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                    className={`px-3 py-1 rounded-md border text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${currentPage === 1 ? "bg-gray-100 text-gray-500" : "bg-white hover:bg-gray-50"
                        }`}
                >
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M12.293 15.707a1 1 0 01-1.414 0L5.172 10l5.707-5.707a1 1 0 011.414 1.414L8.414 10l3.879 3.879a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="inline-flex items-center gap-2">
                    {pages.map((p, idx) =>
                        p === "DOTS" ? (
                            <span key={`dots-${idx}`} className="px-3 py-1 text-sm text-gray-400 select-none">
                                …
                            </span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => onPageChange(p as number)}
                                aria-current={p === currentPage ? "page" : undefined}
                                className={`min-w-[38px] px-3 py-1 rounded-md text-sm font-medium transition border ${p === currentPage
                                    ? "bg-(--brand-300) text-black border-transparent"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima página"
                    className={`px-3 py-1 rounded-md border text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${currentPage === totalPages ? "bg-gray-100 text-gray-500" : "bg-white hover:bg-gray-50"
                        }`}
                >
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L3.414 10l4.293 4.293a1 1 0 01-1.414 1.414L0.586 10 6.293 4.293a1 1 0 011.414 0z" clipRule="evenodd" transform="translate(8 0) rotate(180)" />
                    </svg>
                </button>
            </nav>
        </div>
    );
}

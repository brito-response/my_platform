"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormUpdateJobLinkProps = { jobId: string; linkRepo?: unknown; };
export const FormUpdateJobLink: React.FC<FormUpdateJobLinkProps> = ({ linkRepo, jobId }) => {
    const route = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const jobupdated = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs/${jobId}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ linkProject: link }),
        });
        const data = await jobupdated.json();
        if (data) {
            setIsOpen(false);
            setLink("");
            route.refresh();
        }
    }
    const hasValidLink = typeof linkRepo === "string" && linkRepo.trim().length > 0;

    return (
        <>
            <p className="text-sm text-gray-500">
                Link de produção:
                {hasValidLink ? (
                    <a href={linkRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 px-4 underline hover:text-blue-800 transition-colors">
                        {linkRepo}
                    </a>
                ) : (
                    <button onClick={() => setIsOpen(true)} className="ml-4 text-blue-600 underline hover:text-blue-800">
                        Adicionar link
                    </button>
                )}
            </p>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Atualizar link do projeto
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="url" placeholder="https://meuprojeto.com" value={link} onChange={(e) => setLink(e.target.value)} required className="w-full border rounded px-3 py-2" />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800" >
                                    Cancelar
                                </button>

                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};





FormUpdateJobLink
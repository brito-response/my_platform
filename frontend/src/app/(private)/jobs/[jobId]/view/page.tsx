import Link from "next/link";
import { Loader } from "@/components/Shared/Loader";
import { MessageCircleMoreIcon, CalendarDaysIcon, DollarSignIcon } from "lucide-react";
import { Session } from "@/utils/data_types/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JobWithProposals } from "@/utils/data_types/jobs";
import { FormRegisterProposal } from "@/forms";

async function getJobById(jobId: string, jwt: string): Promise<JobWithProposals | null> {
    try {
        const response = await fetch(`http://localhost:3000/jobs/${jobId}/proposals`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!response.ok) return null;
        const data: JobWithProposals = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jobs data:", error);
        return null;
    }
}

interface Props { params: { jobId: string }; }

export default async function ViewJob({ params }: Props) {
    const { jobId } = await params;
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="w-full h-screen bg-(--bg-section-100) flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    const job = await getJobById(jobId, session.accessToken);

    if (!job) {
        return (
            <div className="w-full h-screen bg-(--bg-section-100) flex justify-center items-center">
                <div className="text-gray-600 text-lg">Job não encontrado ou ocorreu um erro ao carregar.</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100) py-10 px-5 md:px-10">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
                {/* Cabeçalho */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {job.title}
                    </h1>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${job.status === "OPEN" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                        {job.status}
                    </span>
                </div>

                {/* Informações principais */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <CalendarDaysIcon size={18} />
                        <span>
                            Prazo:{" "}
                            <strong className="text-gray-800">
                                {new Date(job.deadline).toLocaleDateString()}
                            </strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSignIcon size={18} />
                        <span>
                            Orçamento:{" "}
                            <strong className="text-gray-800">
                                R$ {job.budget.toFixed(2)}
                            </strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MessageCircleMoreIcon size={18} />
                        <span>
                            Propostas:{" "}
                            <strong className="text-gray-800">{job.proposals?.length ?? 0}</strong>
                        </span>
                    </div>
                </div>

                {/* Descrição */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Descrição do Projeto
                    </h2>
                    <div
                        className="text-gray-700 leading-relaxed wrap-break-word prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                </div>

                {/* Referências */}
                {job.linksReferences && job.linksReferences.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Referências
                        </h2>
                        <ul className="list-disc list-inside text-blue-600">
                            {job.linksReferences.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link} target="_blank" className="hover:underline break-all">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Lista de Propostas */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Propostas Recebidas
                    </h2>

                    {job.proposals && job.proposals.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {job.proposals.map((proposal) => (
                                <div key={proposal.proposalId} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-800">
                                            {proposal.userId ?? "Freelancer Anônimo"}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${proposal.status === "ACCEPTED" ? "bg-green-200 text-green-700" : proposal.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                                            {proposal.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">
                                        {proposal.message}
                                    </p>
                                    <div className="text-xs text-gray-500">
                                        Prazo:{" "}
                                        <strong>
                                            {new Date(proposal.deadline).toLocaleDateString()}
                                        </strong>{" "}
                                        • Valor:{" "}
                                        <strong>R$ {proposal.value.toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Nenhuma proposta recebida ainda.
                        </p>
                    )}
                </div>

                <div className="flex justify-center">
                    <FormRegisterProposal jobId={jobId} />
                </div>
            </div>
        </div>
    );
}
import { Session } from "@/utils/data_types/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JobWithProposals } from "@/utils/data_types/jobs";
import { redirect } from "next/navigation";
import { InfoLinkProfile } from "@/components/Shared/InfoLinkProfile";
import { Proposal } from "@/utils/data_types/proposals";
import { FormButtonAceptProposal, FormUpdateJobLink } from "@/forms";
import { JobCharts } from "@/components/JobCharts";

async function getAllJobsOfUserByUserId(userId: string, jwt: string): Promise<JobWithProposals[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/users/${userId}/proposals`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!response.ok) return [];
        const data: JobWithProposals[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jobs data:", error);
        return [];
    }
};

interface Props { params: { userId: string }; };
export default async function JobsOfUserView({ params }: Props) {
    const { userId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return redirect("/");

    const jobs = await getAllJobsOfUserByUserId(userId, session.accessToken);

    if (!jobs) {
        return (
            <div className="w-full h-screen bg-(--bg-section-100) flex justify-center items-center">
                <div className="text-gray-600 text-lg">Seus Jobs não foram encontrados ou ocorreu um erro ao carregar.</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100) py-10 px-5 md:px-10">
            <ul className="flex flex-col gap-6">
                {jobs.map((job) => (
                    <li key={job.jobId} className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold">{job.title}</h2>
                            <p className="text-sm text-gray-500">Orçamento: <strong>R$ {job.budget}</strong> • Prazo:{" "} {new Date(job.deadline).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">Propostas recebidas: {job.proposals?.length ?? 0}</p>
                            <FormUpdateJobLink linkRepo={job.linkProject} jobId={job.jobId} />
                            {job.linkProject && (<JobCharts url={job.linkProject} />)}

                        </div>

                        {/* LISTA DE PROPOSTAS */}
                        <div className="flex flex-col gap-3">
                            {job.proposals?.length === 0 && (<p className="text-sm text-gray-400 italic">Nenhuma proposta enviada ainda</p>)}

                            {job.proposals?.map((proposal: Proposal) => {
                                const isAccepted = proposal.status === "ACCEPTED";

                                return (
                                    <div key={proposal.proposalId} className={`border rounded-lg p-4 flex flex-col gap-2 ${isAccepted ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium">💰 R$ {proposal.value}</p>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${isAccepted ? "bg-green-200 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                {proposal.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600">Prazo:{" "} {new Date(proposal.deadline).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-700">{proposal.message}</p>

                                        <InfoLinkProfile userId={proposal.userId} />

                                        {!isAccepted && (
                                            <FormButtonAceptProposal proposalId={proposal.proposalId} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
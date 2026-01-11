'use client';

import { ProposalStatus } from "@/utils/data_types/proposals";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormButtonAceptProposalProps = { proposalId: string };
export const FormButtonAceptProposal: React.FC<FormButtonAceptProposalProps> = ({ proposalId }) => {
    const route = useRouter();

    const handleAceptProporsal = (proposalId: string) => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/proposals/update/${proposalId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: ProposalStatus.ACCEPTED,
                }),
            }
            );
            const resp = await response.json();
            response.ok ? toast.success('1 proposta aceita!') : toast.error(resp.message);
            route.refresh();

        })();
    };
    return (
        <button className="mt-2 self-end bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleAceptProporsal(proposalId)}>
            Aceitar proposta
        </button>
    );
}

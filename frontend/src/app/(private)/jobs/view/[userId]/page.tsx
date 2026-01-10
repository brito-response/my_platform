import { Session } from "@/utils/data_types/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JobWithProposals } from "@/utils/data_types/jobs";
import { redirect } from "next/navigation";

async function getJobById(userId: string, jwt: string): Promise<JobWithProposals | null> {
    try {
        const response = await fetch(`http://localhost:3000/jobs/${userId}/proposals`, {
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

interface Props { params: { userId: string }; }

export default async function JobsOfUserView({ params }: Props) {
    const { userId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return redirect("/");

    const job = await getJobById(userId, session.accessToken);

    if (!job) {
        return (
            <div className="w-full h-screen bg-(--bg-section-100) flex justify-center items-center">
                <div className="text-gray-600 text-lg">Seus Jobs não foram encontrados ou ocorreu um erro ao carregar.</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100) py-10 px-5 md:px-10">

        </div>
    );
}
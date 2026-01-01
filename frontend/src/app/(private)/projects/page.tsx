import { ContainerProjectsCards } from "@/components/Containers/ContainerProjectsCards";
import { HCustom } from "@/components/Texts/HCustom";
import { ProjectOutput } from "@/utils/data_types/projects";
import { use } from "react";

async function getProjects(): Promise<ProjectOutput[]> {
    try {
        const res = await fetch("http://localhost:3001/api/projects", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Erro HTTP:", res.status);
        }
        return await res.json();
    } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        return [];
    }
}

export default function Projects() {
    const projects = use(getProjects());
    return (
        <div className="w-full min-h-screen relative flex flex-col items-center gap-2 bg-(--bg-section-100)">
            <HCustom level={3} className="my-7">Projetos</HCustom>
            <ContainerProjectsCards projects={projects} />
        </div>
    );
}
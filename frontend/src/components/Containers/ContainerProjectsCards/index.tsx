"use client";

import { ProjectCard } from "@/components/Cards/ProjectCard";
import { ProjectOutput } from "@/utils/data_types/projects";
import { useState } from "react";

type ContainerProjectsCardsProps = {
    projects: ProjectOutput[];
};

export const ContainerProjectsCards: React.FC<ContainerProjectsCardsProps> = ({ projects }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id] // adiciona se não estava
        );
    };
    return (
        <div className="w-full h-full flex flex-wrap p-2">
            {projects.map((project: ProjectOutput) =>
                <ProjectCard key={project.projectId} project={project} checked={selectedIds.includes(project.projectId.toString())} onClick={() => handleSelect(project.projectId.toString())} />
            )}
        </div>
    );
};
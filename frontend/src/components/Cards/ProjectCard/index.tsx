"use client";
import { ProjectOutput } from "@/utils/data_types/projects";
import { CheckCircle } from "lucide-react";

type ProjectCardProps = {
    checked?: boolean;
    project: ProjectOutput;
} & React.ComponentProps<'button'>;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, checked, ...props }) => {
    return (
        <button {...props}>
            <div className={`min-w-[250px] md:min-w-[320px] bg-white shadow-lg rounded-2xl overflow-hidden shrink-0 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ${checked ? "ring-2 ring-amber-500" : ""}`}>
                <img src={project.images?.[0] ? `http://localhost:3000${project.images?.[0]}` : "/placeholder.png"} alt={project.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                    <h3 className="font-semibold text-blueGray-700 text-lg mb-1">
                        {project.title}
                    </h3>
                    <p className="text-sm text-blueGray-500 line-clamp-2">
                        {project.description}
                    </p>
                    {checked && (
                        <CheckCircle className="absolute top-2 right-2 text-green-500" size={24} />
                    )}
                </div>
            </div>
        </button>
    );
};
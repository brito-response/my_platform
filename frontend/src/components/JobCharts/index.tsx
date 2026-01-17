"use client";

import { GithubProjectResponse, ProjectStats, ProjectItem } from "@/utils/data_types/git";
import { useEffect, useState } from "react";
import { Stat } from "./stats";

type JobChartsProps = { url: string };

export const JobCharts: React.FC<JobChartsProps> = ({ url }) => {
    const [stats, setStats] = useState<ProjectStats | null>(null);
    const [items, setItems] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/git`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                }
                );

                const pr: GithubProjectResponse = await response.json();

                const project = pr.data.user?.projectV2;
                const projectItems = project?.items.nodes ?? [];

                setItems(projectItems);

                const commitsCount = projectItems.reduce((acc, item) => {
                    const content = item.content;

                    if (content?.__typename === "PullRequest") {
                        return acc + content.commits.nodes.length;
                    }

                    return acc;
                }, 0);

                setStats({
                    title: project?.title ?? "Projeto GitHub",
                    totalItems: projectItems.length,
                    open: projectItems.filter((i) => i.content?.state === "OPEN").length,
                    closed: projectItems.filter((i) => i.content?.state === "CLOSED").length,
                    commits: commitsCount,
                });
            } catch {
                setStats(null);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [url]);

    if (loading)
        return <p className="text-sm text-gray-400">Carregando…</p>;

    if (!stats)
        return <p className="text-sm text-red-400">Erro</p>;

    return (
        <div className="mt-3 rounded-xl bg-white p-4 shadow-sm border">
            <p className="text-sm font-semibold text-gray-800">
                {stats.title}
            </p>

            {/* STATS */}
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Stat label="Total itens" value={stats.totalItems} />
                <Stat label="Abertas" value={stats.open} color="green" />
                <Stat label="Fechadas" value={stats.closed} color="red" />
                <Stat label="Commits" value={stats.commits} color="blue" />
            </div>
            {/* LISTA DE TAREFAS (ISSUES) */}
            <div className="mt-4 space-y-3">
                {items.map((item) => {
                    const content = item.content;
                    if (content?.__typename !== "Issue") return null;
                    return (
                        <div key={item.id} className="rounded-lg bg-gray-50 p-3">
                            <p className="text-sm font-semibold text-gray-700">
                                {content.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Status: {content.state}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* LISTA DE COMMITS */}
            <div className="mt-4 space-y-3">
                {items.map((item) => {
                    const content = item.content;

                    if (content?.__typename !== "PullRequest") return null;

                    return (
                        <div key={item.id} className="rounded-lg border bg-gray-50 p-3" >
                            <p className="text-sm font-semibold text-gray-700">
                                {content.title}
                            </p>

                            <ul className="mt-2 space-y-1 text-xs text-gray-600">
                                {content.commits.nodes.map((node, index) => (
                                    <li key={index} className="flex gap-2">
                                        <span className="text-blue-500">•</span>
                                        <span>{node.commit.message}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

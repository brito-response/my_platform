"use client";

import { GithubProjectResponse, ProjectStats, ProjectItem, UserTaskProgress } from "@/utils/data_types/git";
import { useEffect, useState } from "react";
import { Stat } from "./stats";
import { buildUserTaskProgress } from "@/utils/actions/github";
import { IssueTimeline } from "../IssueTimeline";

type JobChartsProps = { url: string };

export const JobCharts: React.FC<JobChartsProps> = ({ url }) => {
    const [stats, setStats] = useState<ProjectStats | null>(null);
    const [items, setItems] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProgress, setUserProgress] = useState<UserTaskProgress | null>(null);

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
                const userProgress = buildUserTaskProgress(projectItems);

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
                setUserProgress(buildUserTaskProgress(projectItems));
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

    const issues = items.filter((item) => item.content?.__typename === "Issue");

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
            <IssueTimeline issues={issues} />

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

            {userProgress && (
                <div className="mt-6 space-y-4">
                    <p className="text-sm font-semibold text-gray-800">
                        Progresso por usuário
                    </p>

                    {Object.entries(userProgress).map(([user, data]) => {
                        const completed = Object.values(data.tasks)
                            .filter(t => t.completed).length;

                        return (
                            <div key={user} className="rounded-lg border p-4">
                                <p className="text-sm font-semibold">{user}</p>
                                <p className="text-xs text-gray-500">
                                    {completed} tarefas concluídas (100%)
                                </p>

                                <div className="mt-2 space-y-1">
                                    {Object.entries(data.tasks).map(([taskId, task]) => (
                                        <div key={taskId} className="flex justify-between text-xs">
                                            <span>{taskId}</span>
                                            <span
                                                className={
                                                    task.completed
                                                        ? "text-green-600"
                                                        : "text-yellow-600"
                                                }
                                            >
                                                {task.current}/{task.total}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

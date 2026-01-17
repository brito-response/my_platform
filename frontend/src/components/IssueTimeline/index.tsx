"use client";

import { ProjectItem } from "@/utils/data_types/git";
import { ExternalLinkIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  issues: ProjectItem[];
};

function daysBetween(start: string, end?: string) {
  const s = new Date(start).getTime();
  const e = end ? new Date(end).getTime() : Date.now();
  return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)));
}

function calcDifficulty(days: number) {
  if (days <= 2)
    return { label: "Fácil", level: 1, color: "#22c55e" };
  if (days <= 5)
    return { label: "Média", level: 2, color: "#eab308" };
  if (days <= 10)
    return { label: "Difícil", level: 3, color: "#f97316" };

  return { label: "Crítica", level: 4, color: "#ef4444" };
}

type TimelinePoint = {
  item: ProjectItem;
  days: number;
  difficulty: {
    label: string;
    level: number;
    color: string;
  };
  isOpen: boolean;
};


export const IssueTimeline: React.FC<Props> = ({ issues }) => {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const width = 720;
  const height = 320;
  const padding = 48;

  const points: TimelinePoint[] = issues.map((item) => {
    const issue = item.content;
    if (!issue || issue.__typename !== "Issue") return null;
    if (!issue.createdAt) return null;

    const days = daysBetween(issue.createdAt, issue.closedAt ?? undefined);
    const difficulty = calcDifficulty(days);

    return { item, days, difficulty, isOpen: issue.state === "OPEN" };
  }).filter((p): p is TimelinePoint => p !== null);

  const maxDays = Math.max(...points.map((p) => p.days), 1);

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold mb-2">
        Tempo de conclusão × dificuldade
      </p>

      <p className="text-xs text-gray-500 mb-4">
        Cada ponto representa uma issue. Issues abertas têm contorno.
      </p>

      {/* GRÁFICO */}
      <svg width={width} height={height} className="rounded-lg border bg-white">
        {/* Eixos */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />

        {/* Labels Y */}
        {["Fácil", "Média", "Difícil", "Crítica"].map((label, i) => {
          const y = height - padding - ((i + 1) / 4) * (height - padding * 2);

          return (
            <text key={label} x={8} y={y + 4} fontSize="11" fill="#555" >
              {label}
            </text>
          );
        })}

        {/* Pontos */}
        {points.map((p, index) => {
          const x = padding + (p.days / maxDays) * (width - padding * 2);

          const baseY = height - padding - (p.difficulty.level / 4) * (height - padding * 2);

          // 🔥 jitter controlado (visual apenas)
          const jitter = ((index % 5) - 2) * 6;
          const y = baseY + jitter;

          return (
            <circle key={p.item.id} cx={x} cy={y} r={7} fill={p.difficulty.color}
              stroke={p.isOpen ? "#111" : "none"} strokeWidth={p.isOpen ? 1.5 : 0} className="cursor-pointer hover:opacity-80" onClick={() => setSelected(p.item)}
            >
              <title>{p.item.content?.title}
                {"\n"}
                {p.days} dias • {p.difficulty.label}
                {"\n"}
                {p.isOpen ? "Em andamento" : "Concluída"}
              </title>
            </circle>
          );
        })}
      </svg>

      {/* LEGENDA */}
      <div className="mt-3 flex gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-green-500" /> Fácil
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-yellow-500" /> Média
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-orange-500" /> Difícil
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-red-500" /> Crítica
        </span>
        <span className="flex items-center gap-1 ml-4">
          <span className="h-3 w-3 rounded-full border border-black" /> Issue
          aberta
        </span>
      </div>

      {/* DETALHES */}
      {selected && selected.content?.__typename === "Issue" && (
        <div className="mt-6 rounded-lg border bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-800">
            {selected.content.title}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Status: {selected.content.state}
          </p>

          <a href={selected.content.url} target="_blank" className="flex mt-2 items-center gap-x-3 text-xs text-blue-600 hover:underline">
            <p>Ver no GitHub</p> <ExternalLinkIcon size={12}/>
          </a>
        </div>
      )}
    </div>
  );
};

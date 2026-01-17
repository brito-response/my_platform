"use client";

import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface SpiderChartProps {
  data: { linguagem: string; porcentagem: number }[];
  color?: string;
  maxValue?: number;
}

export const SpiderChart: React.FC<SpiderChartProps> = ({ data, color = "#3b82f6", maxValue = 100 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="linguagem" tick={{ fill: "#000", fontSize: 12 }} />
          <PolarRadiusAxis angle={60} domain={[0, maxValue]} tick={{ fill: "#000", fontSize: 10 }} />
          <Radar name="Atributos" dataKey="porcentagem" stroke={color} fill={color} fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

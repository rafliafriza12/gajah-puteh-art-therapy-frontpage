"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface BrowserUsageData {
  title: string;
  percentage: number;
  color: string;
}

interface BrowserUsageChartProps {
  data: BrowserUsageData[];
}

export default function BrowserUsageChart({ data }: BrowserUsageChartProps) {

  const chartData = data.map((item) => ({
    name: item.title,
    value: item.percentage,
    color: item.color,
  }));

  return (
    <div className="w-full flex gap-1 items-center">
      <div className="w-2/3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-4">
        {chartData.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-neutral-02 font-medium">{entry.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

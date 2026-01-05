"use client";

import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import DownloadIcon from "@/components/atoms/icons/DownloadIcon";
import { Heading5 } from "@/components/atoms/Typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    Month: "April",
    Visitors: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    Month: "May",
    Visitors: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    Month: "June",
    Visitors: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    Month: "July",
    Visitors: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    Month: "August",
    Visitors: 3658,
    pv: 4800,
    amt: 2181,
  },
  {
    Month: "September",
    Visitors: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    Month: "October",
    Visitors: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <p className="text-xs text-grey mb-1">
          {payload[0].payload.Month} 2025
        </p>
        <p className="text-xs font-medium">
          <span className="text-moss-stone">
            {payload[0].value?.toLocaleString()}
          </span>{" "}
          <span className="text-neutral-02">Visitors</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AreaChartVisitors = () => {
  return (
    <>
      <div className="w-full flex justify-between">
        <Heading5>
          Traffic & Engagement Overview
        </Heading5>
        <div className="flex gap-2">
          <button className="rounded-lg border border-grey-stroke p-2 flex gap-2 items-center">
            <span className="text-xs font-normal">Monthly</span>
            <ChevronLeftIcon className="-rotate-90 w-4 h-4" />
          </button>
          <button className="rounded-lg border border-grey-stroke p-2">
            <DownloadIcon />
          </button>
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="Month"
            className="text-xs"
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            className="text-xs"
            axisLine={false}
            tickLine={false}
            dx={-16}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Visitors"
            stroke="var(--color-moss-stone)"
            fill="url(#colorVisitors)"
          />
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-moss-stone)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-moss-stone)"
                stopOpacity={0.0}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

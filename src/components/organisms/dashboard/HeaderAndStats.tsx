import { Heading3 } from "@/components/atoms/Typography";
import { StatCard } from "@/components/molecules/dashboard/StatCard";
import { stats } from "@/constant/dashboard/stat";
import React from "react";

const HeaderAndStats = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Heading3>Dashboard</Heading3>
        <p className="text-xs text-grey font-normal">
          Summary of key metrics and statistics
        </p>
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default HeaderAndStats;

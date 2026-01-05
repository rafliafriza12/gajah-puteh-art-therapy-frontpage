"use client";

import DownloadIcon from "@/components/atoms/icons/DownloadIcon";
import { Heading5 } from "@/components/atoms/Typography";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const visitorsData = [
  {
    country: "Indonesia",
    code: "360",
    name: "Indonesia",
    visitors: 3658547,
    coordinates: [118, -2],
  },
  {
    country: "United States",
    code: "840",
    name: "United States of America",
    visitors: 1245320,
    coordinates: [-95, 37],
  },
  {
    country: "Singapore",
    code: "702",
    name: "Singapore",
    visitors: 845120,
    coordinates: [103.8, 1.3],
  },
  {
    country: "Malaysia",
    code: "458",
    name: "Malaysia",
    visitors: 654230,
    coordinates: [101.9, 4.2],
  },
];

export const VisitorLocation = () => {
  const [tooltipContent, setTooltipContent] = useState<{
    country: string;
    visitors: number;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <div className="w-full flex justify-between">
        <Heading5>Visitors Location</Heading5>
        <div className="flex">
          <button className="rounded-lg border border-grey-stroke p-2">
            <DownloadIcon />
          </button>
        </div>
      </div>
      <div className="relative w-full flex-1">
        <ComposableMap
          width={600}
          height={300}
          projectionConfig={{
            scale: 136,
          }}
          className="w-full h-full py-0 cursor-grab active:cursor-grabbing"
        >
          <ZoomableGroup
            center={[0, 0]}
            zoom={1}
            minZoom={0.8}
            maxZoom={4}
            translateExtent={[
              [-30, -30],
              [630, 330],
            ]}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const countryData = visitorsData.find(
                    (d) => d.code === geo.id || d.name === geo.properties?.name
                  );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={"#E5E7EB"}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: countryData ? "#a0ac67" : "#D1D5DB",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt: any) => {
                        if (countryData) {
                          console.log("hover", countryData);
                          setTooltipContent({
                            country: countryData.country,
                            visitors: countryData.visitors,
                          });
                          setTooltipPosition({
                            x: evt.clientX,
                            y: evt.clientY,
                          });
                        }
                      }}
                      onMouseMove={(evt: any) => {
                        if (countryData) {
                          setTooltipPosition({
                            x: evt.clientX,
                            y: evt.clientY,
                          });
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(null);
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltipContent && (
          <div
            className="fixed bg-white rounded-lg shadow-xl border border-gray-200 p-3 pointer-events-none z-9999"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="text-xs text-grey mb-1 whitespace-nowrap">
              {tooltipContent.country}
            </p>
            <p className="text-xs font-medium whitespace-nowrap">
              <span className="text-moss-stone">
                {tooltipContent.visitors.toLocaleString()}
              </span>{" "}
              <span className="text-neutral-02">Visitors</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

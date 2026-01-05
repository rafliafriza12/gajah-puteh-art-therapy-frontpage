"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

interface Awareness {
  id: number;
  title: string;
  description: string;
}

const AwarenessSection = () => {
  const [awarenessItems, setAwarenessItems] = useState<Awareness[]>([
    {
      id: 1,
      title: "Awareness 1",
      description:
        "Untuk menaikan basis-basis kasus terkait dengan konservasi, 3R, gerakan 100 pohon (membangun akhir biji business training)",
    },
    {
      id: 2,
      title: "Awareness 2",
      description: "An effective CSR Organization",
    },
    {
      id: 3,
      title: "Awareness 3",
      description: "Effective Communication and Socialization to stakeholders",
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  return (
    <PageMenuContentContainer
      id="awarenessPageSustainability"
      title="Awareness"
      refreshFunction={refresh("awareness")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>

        <div className="w-full h-px bg-grey-stroke"></div>

        {/* Awareness Grid */}
        <div className="w-full grid grid-cols-3 gap-4 items-start">
          {awarenessItems.map((item, index) => (
            <div key={item.id} className="w-full flex flex-col gap-2.5 rounded-xl border border-grey-stroke p-4">
              <p className="text-lg font-medium">
                Awareness {index + 1}
              </p>
              <div className="flex flex-col gap-2">
                <ContentLabel className="text-xs">Description</ContentLabel>
                <ContentTextArea
                  placeholder="Description"
                  className="text-xs"
                  value={item.description}
                  rows={10}
                  onChange={(e) => {
                    setAwarenessItems(
                      awarenessItems.map((awareness) =>
                        awareness.id === item.id
                          ? { ...awareness, description: e.target.value }
                          : awareness
                      )
                    );
                  }}
                  
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default AwarenessSection;

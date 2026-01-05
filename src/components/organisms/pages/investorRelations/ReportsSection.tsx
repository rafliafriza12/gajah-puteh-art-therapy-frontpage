"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const ReportsSection = () => {
  const [activeTab, setActiveTab] = useState<
    "financial" | "annual" | "credit"
  >("financial");

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  return (
    <PageMenuContentContainer
      id="reportsPageInvestorRelations"
      title="Reports"
      refreshFunction={refresh("reports")}
    >
      <div className="w-full flex flex-col gap-4">
        {/* Tab Navigation */}
        <div className="w-full border-b border-grey-stroke mt-4 mb-2">
          <div className="grid grid-cols-3 gap-8">
            <button
              onClick={() => setActiveTab("financial")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "financial"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Financial Statement
              {activeTab === "financial" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("annual")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "annual"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Annual & Sustainability Reports
              {activeTab === "annual" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("credit")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "credit"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Credit & Analyst Reports
              {activeTab === "credit" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content for active tab */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <ContentLabel>Headline</ContentLabel>
            <ContentInput placeholder="Headline" />
          </div>
          <div className="flex flex-col gap-2">
            <ContentLabel>Descriptions</ContentLabel>
            <ContentTextArea placeholder="Descriptions" />
          </div>
        </div>

      </div>
    </PageMenuContentContainer>
  );
};

export default ReportsSection;

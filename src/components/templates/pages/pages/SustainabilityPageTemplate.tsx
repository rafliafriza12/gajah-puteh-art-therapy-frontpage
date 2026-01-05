"use client";

import HeroSection from "@/components/organisms/pages/sustainability/HeroSection";
import PolicySection from "@/components/organisms/pages/sustainability/PolicySection";
import StrategySection from "@/components/organisms/pages/sustainability/StrategySection";
import AwarenessSection from "@/components/organisms/pages/sustainability/AwarenessSection";
import ESGHumanRightsReportSection from "@/components/organisms/pages/sustainability/ESGHumanRightsReportSection";
import EnvironmentPreservationSection from "@/components/organisms/pages/sustainability/EnvironmentPreservationSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageSustainabilityPageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageSustainability" },
    { title: "Policy", id: "#policyPageSustainability" },
    { title: "Strategy", id: "#strategyPageSustainability" },
    { title: "Awareness", id: "#awarenessPageSustainability" },
    {
      title: "ESG & Human Rights Report",
      id: "#esgHumanRightsReportPageSustainability",
    },
    {
      title: "Environment Preservation",
      id: "#environmentPreservationPageSustainability",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Sustainability" sections={sections}>
        <>
          <HeroSection />
          <PolicySection />
          <StrategySection />
          <AwarenessSection />
          <ESGHumanRightsReportSection />
          <EnvironmentPreservationSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageSustainabilityPageTemplate;
"use client";

import HeroSection from "@/components/organisms/pages/investorRelations/HeroSection";
import ReportsSection from "@/components/organisms/pages/investorRelations/ReportsSection";
import CorporateActionsSection from "@/components/organisms/pages/investorRelations/CorporateActionsSection";
import GMSEventsSection from "@/components/organisms/pages/investorRelations/GMSEventsSection";
import DisclosureSection from "@/components/organisms/pages/investorRelations/DisclosureSection";
import PresentationsSection from "@/components/organisms/pages/investorRelations/PresentationsSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageInvestorRelationsPageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageInvestorRelations" },
    { title: "Reports", id: "#reportsPageInvestorRelations" },
    { title: "Corporate Actions", id: "#corporateActionsPageInvestorRelations" },
    { title: "GMS & Events", id: "#gmsEventsPageInvestorRelations" },
    { title: "Disclosure", id: "#disclosurePageInvestorRelations" },
    { title: "Presentations", id: "#presentationsPageInvestorRelations" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Investor Relations" sections={sections}>
        <>
          <HeroSection />
          <ReportsSection />
          <CorporateActionsSection />
          <GMSEventsSection />
          <DisclosureSection />
          <PresentationsSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageInvestorRelationsPageTemplate;
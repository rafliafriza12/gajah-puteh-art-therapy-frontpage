"use client";

import HeroSection from "@/components/organisms/pages/home/HeroSection";
import ESGSection from "@/components/organisms/pages/home/ESGSection";
import AnnualReportSection from "@/components/organisms/pages/home/AnnualReportSection";
import ContactSection from "@/components/organisms/pages/home/ContactSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";
import MediaSection from "@/components/organisms/pages/home/MediaSection";

const PageHomePageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageHome" },
    { title: "ESG", id: "#ESGPageHome" },
    { title: "Media", id: "#mediaPageHome" },
    { title: "Annual Reports", id: "#annualReportsPageHome" },
    { title: "Contact", id: "#contactPageHome" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Home" sections={sections}>
        <>
          <HeroSection />
          <ESGSection />
          <MediaSection />
          <AnnualReportSection />
          <ContactSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageHomePageTemplate;

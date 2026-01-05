"use client";

import CorporatePhilosophySection from "@/components/organisms/pages/aboutUs/CorporatePhilosophySection";
import HeroSection from "@/components/organisms/pages/aboutUs/HeroSection";
import OwnershipSection from "@/components/organisms/pages/aboutUs/Ownership";
import ShareHolderStructureSection from "@/components/organisms/pages/aboutUs/ShareHolderStructureSection";
import VisionAndMissionSection from "@/components/organisms/pages/aboutUs/VisionAndMissionSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageAboutUsPageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageAboutUs" },
    { title: "Vision And Mission", id: "#visionAndMissionPageAboutUs" },
    { title: "Corporate Philosophy", id: "#corporatePhilosophyPageAboutUs" },
    { title: "Ownership", id: "#ownershipPageAboutUs" },
    {
      title: "Shareholder Structure",
      id: "#shareholderStructurePageAboutUs",
    },
  ];

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };


  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="About Us" sections={sections}>
        <>
          <HeroSection/>
          <VisionAndMissionSection/>                    
          <CorporatePhilosophySection/>                            
          <OwnershipSection/>                                      
          <ShareHolderStructureSection/>
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageAboutUsPageTemplate;

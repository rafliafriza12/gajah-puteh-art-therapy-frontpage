"use client";

import CoalQualitySection from "@/components/organisms/pages/bussinesAndOperations/CoalQuality";
import HeroSection from "@/components/organisms/pages/bussinesAndOperations/HeroSection";
import OperationMapSection from "@/components/organisms/pages/bussinesAndOperations/OperationMapSection";
import OurCustomersSection from "@/components/organisms/pages/bussinesAndOperations/OurCustomersSection";
import ReservesAndResourcesSection from "@/components/organisms/pages/bussinesAndOperations/ReservesAndResourcesSection";
import SubsidiariesSection from "@/components/organisms/pages/bussinesAndOperations/SubsidiariesSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageBussinesAndOperationsPageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageBussinesAndOperations" },
    { title: "Operation Map", id: "#OperationMapPageBussinesAndOperations" },
    { title: "Subsidiaries", id: "#SubsidiariesPageBussinesAndOperations" },
    { title: "Our Customers", id: "#OurCustomersPageBussinesAndOperations" },
    { title: "Coal Quality", id: "#CoalQualityPageBussinesAndOperations" },
    {
      title: "Reserves & Resources",
      id: "#ReservesAndResourcesPageBussinesAndOperations",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Home" sections={sections}>
        <>
          <HeroSection />
          <OperationMapSection />
          <SubsidiariesSection />
          <OurCustomersSection />
          <CoalQualitySection />
          <ReservesAndResourcesSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageBussinesAndOperationsPageTemplate;

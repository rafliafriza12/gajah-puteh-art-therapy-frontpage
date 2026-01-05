"use client";

import HeroSection from "@/components/organisms/pages/governance/HeroSection";
import OurTeamsSection from "@/components/organisms/pages/governance/OurTeamsSection";
import CommitteesSection from "@/components/organisms/pages/governance/CommitteesSection";
import CorporateSecretarySection from "@/components/organisms/pages/governance/CorporateSecretarySection";
import PolicySupportingDocumentsSection from "@/components/organisms/pages/governance/PolicySupportingDocumentsSection";
import WhistleblowingSection from "@/components/organisms/pages/governance/WhistleblowingSection";
import FrequentlyAskedQuestionsSection from "@/components/organisms/pages/governance/FrequentlyAskedQuestionsSection";
import SupportingProfessionSection from "@/components/organisms/pages/governance/SupportingProfessionSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageGovernancePageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageGovernance" },
    { title: "Our Teams", id: "#ourTeamsPageGovernance" },
    { title: "Committies", id: "#committeesPageGovernance" },
    { title: "Corporate Secretary", id: "#corporateSecretaryPageGovernance" },
    {
      title: "Policy & Supporting Documents",
      id: "#policySupportingDocumentsPageGovernance",
    },
    { title: "Whistleblowing", id: "#whistleblowingPageGovernance" },
    {
      title: "Frequently Asked Questions",
      id: "#frequentlyAskedQuestionsPageGovernance",
    },
    {
      title: "Supporting Profession",
      id: "#supportingProfessionPageGovernance",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Governance" sections={sections}>
        <>
          <HeroSection />
          <OurTeamsSection />
          <CommitteesSection />
          <CorporateSecretarySection />
          <PolicySupportingDocumentsSection />
          <WhistleblowingSection />
          <FrequentlyAskedQuestionsSection />
          <SupportingProfessionSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageGovernancePageTemplate;
"use client";

import React from "react";
import PageMenuContainer from "@/components/organisms/pages/PageMenuContainer";
import HeroSection from "@/components/organisms/pages/career/HeroSection";
import WhyJoinUsSection from "@/components/organisms/pages/career/WhyJoinUsSection";
import HiringSection from "@/components/organisms/pages/career/HiringSection";
import CTABannerSection from "@/components/organisms/pages/career/CTABannerSection";

const PageCareerPageTemplate = () => {
  const sections = [
    { title: "Hero", id: "#heroPageCareer" },
    { title: "Why Join Us?", id: "#whyJoinUsPageCareer" },
    { title: "Hiring", id: "#hiringPageCareer" },
    { title: "CTA Banner", id: "#ctaBannerPageCareer" },
  ];

  return (
    <PageMenuContainer title="Career" sections={sections}>
      <HeroSection />
      <WhyJoinUsSection />
      <HiringSection />
      <CTABannerSection />
    </PageMenuContainer>
  );
};

export default PageCareerPageTemplate;
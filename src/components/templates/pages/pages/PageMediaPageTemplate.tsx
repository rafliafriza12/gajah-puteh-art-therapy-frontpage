"use client";

import HeroSection from "@/components/organisms/pages/media/HeroSection";
import MediaKitSection from "@/components/organisms/pages/media/MediaKitSection";
import PageMenuContainer, {
  Section,
} from "@/components/organisms/pages/PageMenuContainer";

const PageMediaPageTemplate = () => {
  const sections: Section[] = [
    { title: "Hero", id: "#heroPageMedia" },
    { title: "Media Kit", id: "#mediaKitPageMedia" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <PageMenuContainer title="Media" sections={sections}>
        <>
          <HeroSection />
          <MediaKitSection />
        </>
      </PageMenuContainer>
    </div>
  );
};

export default PageMediaPageTemplate;
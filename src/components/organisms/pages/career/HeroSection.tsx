import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel } from "@/components/atoms/Typography";
import { ContentInput } from "@/components/atoms/Input";

const HeroSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="heroPageCareer"
      title="Hero Section"
      refreshFunction={refresh("hero")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default HeroSection;

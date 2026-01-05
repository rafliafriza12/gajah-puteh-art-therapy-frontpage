import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import {
  ContentLabel,
  Heading5,
  Heading6,
} from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const CorporatePhilosophySection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      title="Corporate Philosophy"
      id="corporatePhilosophyPageAboutUs"
      refreshFunction={refresh("corporatePhilosophy")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <div className="flex flex-col gap-4">
          <Heading5>Main Content</Heading5>
          <ContentInput
            className="text-sm"
            placeholder="Achieving sustainability and global competitiveness to:"
          />
          <Heading5>Philosophy List</Heading5>
          <ContentInput className="text-sm" placeholder="Philosophy 1" />
          <ContentInput className="text-sm" placeholder="Philosophy 2" />
          <ContentInput className="text-sm" placeholder="Philosophy 3" />
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default CorporatePhilosophySection;

import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5, Heading6 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const VisionAndMissionSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="visionAndMissionPageAboutUs"
      title="Vision And Mission"
      refreshFunction={refresh("visionAndMission")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Main Content</Heading5>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-grey-stroke flex flex-col gap-2.5 p-4">
            <Heading6>Vision</Heading6>
            <ContentTextArea placeholder="Vision" rows={8} />
          </div>
          <div className="rounded-xl border border-grey-stroke flex flex-col gap-2.5 p-4">
            <Heading6>Mission</Heading6>
            <ContentInput
              className="text-xs"
              placeholder="BUMI’s action are guided by three underlying principles:"
            />
            <p className="font-medium text-sm">Mission list</p>
            <ContentInput className="text-xs" placeholder="Mission 1" />
            <ContentInput className="text-xs" placeholder="Mission 2" />
            <ContentInput className="text-xs" placeholder="Mission 3" />
          </div>
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default VisionAndMissionSection;

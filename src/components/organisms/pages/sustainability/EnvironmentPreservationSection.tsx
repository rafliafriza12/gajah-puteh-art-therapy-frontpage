import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const EnvironmentPreservationSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="environmentPreservationPageSustainability"
      title="Environment Preservation"
      refreshFunction={refresh("environmentPreservation")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Subheadline</ContentLabel>
          <ContentInput placeholder="Subheadline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" rows={10} />
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default EnvironmentPreservationSection;

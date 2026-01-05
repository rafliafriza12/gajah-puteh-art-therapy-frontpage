import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import {
  ContentLabel,
  Heading5,
  Heading6,
} from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const OwnershipSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="ownershipPageAboutUs"
      title="Ownership"
      refreshFunction={refresh("ownership")}
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

export default OwnershipSection;

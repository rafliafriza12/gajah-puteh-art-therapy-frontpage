"use client";

import PageMenuContentContainer from "../PageMenuContentContainer";
import {
  ContentLabel,
  Heading4,
  Heading5,
} from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const ReservesAndResourcesSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  return (
    <PageMenuContentContainer
      id="ReservesAndResourcesPageBussinesAndOperations"
      title="Reserves & Resources"
      refreshFunction={refresh("Reserves And Resources")}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-grey-stroke rounded-xl p-3 flex flex-col gap-2.5">
            <ContentLabel className="text-sm">Total Coal Reserve</ContentLabel>
            <ContentInput placeholder="Total Coal Reserve" />
          </div>
          <div className="border border-grey-stroke rounded-xl p-3 flex flex-col gap-2.5">
            <ContentLabel className="text-sm">Total Coal Resource</ContentLabel>
            <ContentInput placeholder="Total Coal Resource" />
          </div>
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Content</Heading5>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 flex flex-col gap-2.5 rounded-xl border border-grey-stroke">
            <Heading4>KPC</Heading4>
            <div className="flex flex-col gap-2.5">
              <ContentLabel className="text-sm">Descriptions</ContentLabel>
              <ContentTextArea placeholder="Descriptions" rows={8}></ContentTextArea>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2.5">
                  <ContentLabel>Coal Reserve</ContentLabel>
                  <ContentInput placeholder="Coal Reserve"/>
                </div>
                <div className="flex flex-col gap-2.5">
                  <ContentLabel>Coal Resource</ContentLabel>
                  <ContentInput placeholder="Coal Resource" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2.5 rounded-xl border border-grey-stroke">
            <Heading4>KPC</Heading4>
            <div className="flex flex-col gap-2.5">
              <ContentLabel className="text-sm">Descriptions</ContentLabel>
              <ContentTextArea placeholder="Descriptions" rows={8}></ContentTextArea>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2.5">
                  <ContentLabel>Coal Reserve</ContentLabel>
                  <ContentInput placeholder="Coal Reserve" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <ContentLabel>Coal Resource</ContentLabel>
                  <ContentInput placeholder="Coal Resource" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default ReservesAndResourcesSection;

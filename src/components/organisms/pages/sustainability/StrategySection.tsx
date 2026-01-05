import React from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const StrategySection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="strategyPageSustainability"
      title="Strategy"
      refreshFunction={refresh("strategy")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Quote</ContentLabel>
          <ContentInput placeholder="Quote" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" rows={8} />
        </div>

        <div className="w-full h-px bg-grey-stroke"></div>

        <Heading5>BUMI CSR Flagship</Heading5>

        <div className="flex flex-col gap-2">
          <ContentLabel>Quote</ContentLabel>
          <ContentInput placeholder="Quote" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" rows={6} />
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default StrategySection;

import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";

const OurCustomersSection = () => {
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  return (
    <PageMenuContentContainer
      id="OurCustomersPageBussinesAndOperations"
      title="Our Customers"
      refreshFunction={refresh("Our Customers")}
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

export default OurCustomersSection;

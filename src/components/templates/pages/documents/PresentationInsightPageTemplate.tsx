import PresentationInsightHeader from "@/components/organisms/documents/presentationInsight/Header";
import PresentationInsightContent from "@/components/organisms/documents/presentationInsight/Content";

const PresentationInsightPageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <PresentationInsightHeader />
      <PresentationInsightContent />
    </div>
  );
};

export default PresentationInsightPageTemplate;

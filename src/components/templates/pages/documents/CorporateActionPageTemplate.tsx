import CorporateActionHeader from "@/components/organisms/documents/corporateAction/Header";
import CorporateActionContent from "@/components/organisms/documents/corporateAction/Content";

const CorporateActionPageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <CorporateActionHeader />
      <CorporateActionContent />
    </div>
  );
};

export default CorporateActionPageTemplate;

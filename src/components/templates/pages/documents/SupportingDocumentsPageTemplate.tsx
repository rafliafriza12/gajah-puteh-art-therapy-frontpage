import SupportingDocumentsHeader from "@/components/organisms/documents/supportingDocuments/Header";
import SupportingDocumentsContent from "@/components/organisms/documents/supportingDocuments/Content";

const SupportingDocumentsPageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <SupportingDocumentsHeader />
      <SupportingDocumentsContent />
    </div>
  );
};

export default SupportingDocumentsPageTemplate;

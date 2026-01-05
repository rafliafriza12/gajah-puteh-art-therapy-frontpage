import DisclosureHeader from "@/components/organisms/documents/disclosure/Header";
import DisclosureContent from "@/components/organisms/documents/disclosure/Content";

const DisclosurePageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <DisclosureHeader />
      <DisclosureContent />
    </div>
  );
};

export default DisclosurePageTemplate;

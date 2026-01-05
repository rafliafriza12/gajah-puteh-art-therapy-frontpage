import GmsEventsHeader from "@/components/organisms/documents/gmsEvents/Header";
import GmsEventsContent from "@/components/organisms/documents/gmsEvents/Content";

const GmsEventsPageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <GmsEventsHeader />
      <GmsEventsContent />
    </div>
  );
};

export default GmsEventsPageTemplate;

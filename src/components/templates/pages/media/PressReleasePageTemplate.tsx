import PressReleaseContent from "@/components/organisms/media/pressRelease/Content";
import PressReleaseHeader from "@/components/organisms/media/pressRelease/Header";

const PressReleasePageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <PressReleaseHeader />
      <PressReleaseContent />
    </div>
  );
};

export default PressReleasePageTemplate;

import GalleryContent from "@/components/organisms/media/gallery/Content";
import GalleryHeader from "@/components/organisms/media/gallery/Header";

const GalleryPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <GalleryHeader />
      <GalleryContent />
    </div>
  );
};

export default GalleryPageTemplate;

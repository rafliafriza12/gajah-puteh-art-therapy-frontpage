import ArticlesContent from "@/components/organisms/media/articles/Content";
import ArticlesHeader from "@/components/organisms/media/articles/Header";

const ArticlesPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ArticlesHeader />
      <ArticlesContent />
    </div>
  );
};

export default ArticlesPageTemplate;

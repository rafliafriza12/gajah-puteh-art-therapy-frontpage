import JobsContent from "@/components/organisms/jobs/Content";
import JobsHeader from "@/components/organisms/jobs/Header";

const JobsPageTemplate = () => {  

  return (
    <div className="w-full flex flex-col gap-4">
      <JobsHeader />
      <JobsContent />      
    </div>
  );
};

export default JobsPageTemplate;

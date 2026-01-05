import { Heading3 } from "@/components/atoms/Typography";

const JobsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Heading3>Jobs</Heading3>
      <button className="px-4 py-2.5 bg-moss-stone text-neutral-01 rounded-lg text-base font-medium hover:bg-moss-stone/90 transition-colors flex items-center gap-2">
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3v10M3 8h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Add New Job
      </button>
    </div>
  );
};

export default JobsHeader;

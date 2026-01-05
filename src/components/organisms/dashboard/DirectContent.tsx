import BrowserUsageChart from "@/components/molecules/dashboard/BrowserUsageChart";
import { DirectContentCard } from "@/components/molecules/dashboard/DirectContentCard";
import {
  annualReports,
  browserUsages,
  latestArticles,
} from "@/constant/dashboard/directContent";
import Image from "next/image";
import Link from "next/link";

const DirectContent = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <DirectContentCard name="Latest Articles" url="/" variant="link">
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {latestArticles.map((article, index) => (
            <Link href={article.url} key={index} className="flex gap-3.5 items-center hover:bg-moss-stone/10 duration-200 rounded-md">
              <div className="w-20 h-20 relative shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={article.coverImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-base text-neutral-02 line-clamp-1">
                  {article.title}
                </p>
                <p className="font-normal text-base text-grey line-clamp-2">
                  {article.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </DirectContentCard>
      <DirectContentCard name="Annual Reports" url="/" variant="link">
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {annualReports.map((report, index) => (
            <Link href={report.url} key={index} className="flex gap-3.5 items-center hover:bg-moss-stone/10 duration-200 rounded-md">
              <div className="w-16 h-20 relative shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={report.coverImageUrl}
                  alt={report.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-base text-neutral-02">
                  {report.title}
                </p>
                <p className="font-medium text-base text-neutral-02">
                  {report.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </DirectContentCard>
      <DirectContentCard name="Browser Usage" url="/" variant="download">
        <BrowserUsageChart data={browserUsages} />
      </DirectContentCard>
    </div>
  );
};

export default DirectContent;

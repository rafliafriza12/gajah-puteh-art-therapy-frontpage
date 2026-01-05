export interface Job {
  id: string;
  jobName: string;
  department: string;
  jobType: "Full-time" | "Part-time" | "Internship";
  locationType: "On-site" | "Hybrid" | "Remote";
  lastUpdated: string;
  isPublished: boolean;
}

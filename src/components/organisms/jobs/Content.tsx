"use client";

import { Heading5 } from "@/components/atoms/Typography";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Toggle } from "@/components/atoms/Toggle";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActions,
  TablePagination,
} from "@/components/molecules/table";
import { Job } from "@/types/job";
import { useState, useMemo } from "react";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const JobsContent = () => {
  const mockJobs: Job[] = [
    {
      id: "1",
      jobName: "Executive Assistant",
      department: "Marketing",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      jobName: "Engineering Manager",
      department: "Operations",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "24/10/2025",
      isPublished: false,
    },
    {
      id: "3",
      jobName: "Customer Success Manager",
      department: "Operations",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      jobName: "Senior Mining Engineer",
      department: "Development",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      jobName: "Digital Marketing Specialist",
      department: "Marketing",
      jobType: "Part-time",
      locationType: "Hybrid",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "6",
      jobName: "IT Support Specialist",
      department: "Marketing",
      jobType: "Part-time",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "7",
      jobName: "Mine Operations Manager",
      department: "Operations",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "8",
      jobName: "Marketing Data Analyst",
      department: "Operations",
      jobType: "Internship",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: false,
    },
    {
      id: "9",
      jobName: "Software Engineer",
      department: "Marketing",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "10",
      jobName: "Chief Information Officer",
      department: "Marketing",
      jobType: "Full-time",
      locationType: "On-site",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
  ];

  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState<string>("All Department");
  const [typeFilter, setTypeFilter] = useState<string>("All Type");
  const [locationFilter, setLocationFilter] = useState<string>("All Location");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Job | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const departments = useMemo(
    () => [
      "All Department",
      ...Array.from(new Set(jobs.map((j) => j.department))),
    ],
    [jobs]
  );
  const jobTypes = useMemo(
    () => ["All Type", ...Array.from(new Set(jobs.map((j) => j.jobType)))],
    [jobs]
  );
  const locationTypes = useMemo(
    () => [
      "All Location",
      ...Array.from(new Set(jobs.map((j) => j.locationType))),
    ],
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.jobName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDepartment =
        departmentFilter === "All Department" ||
        job.department === departmentFilter;
      const matchesType =
        typeFilter === "All Type" || job.jobType === typeFilter;
      const matchesLocation =
        locationFilter === "All Location" ||
        job.locationType === locationFilter;

      return (
        matchesSearch && matchesDepartment && matchesType && matchesLocation
      );
    });
  }, [jobs, searchQuery, departmentFilter, typeFilter, locationFilter]);

  const sortedJobs = useMemo(() => {
    if (!sortConfig.key) return filteredJobs;

    return [...filteredJobs].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredJobs, sortConfig]);

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedJobs, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Job) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(paginatedJobs.map((job) => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs((prev) => [...prev, jobId]);
    } else {
      setSelectedJobs((prev) => prev.filter((id) => id !== jobId));
    }
  };

  const handleTogglePublish = (jobId: string, isPublished: boolean) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, isPublished } : job))
    );
  };

  const handleView = (jobId: string) => {
    console.log("View job:", jobId);
  };

  const handleEdit = (jobId: string) => {
    console.log("Edit job:", jobId);
  };

  const handleDelete = (jobId: string) => {
    console.log("Delete job:", jobId);
  };

  const allSelected =
    paginatedJobs.length > 0 &&
    paginatedJobs.every((job) => selectedJobs.includes(job.id));
  const someSelected =
    selectedJobs.length > 0 &&
    paginatedJobs.some((job) => selectedJobs.includes(job.id)) &&
    !allSelected;
  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Job List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search job..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {locationTypes.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead sortable onSort={() => handleSort("jobName")}>
              Job Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("department")}>
              Department
            </TableHead>
            <TableHead sortable onSort={() => handleSort("jobType")}>
              Job Type
            </TableHead>
            <TableHead sortable onSort={() => handleSort("locationType")}>
              Location Type
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedJobs.map((job, index) => (
            <TableRow
              key={job.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedJobs.includes(job.id)}
                  onChange={(checked) => handleSelectJob(job.id, checked)}
                />
              </TableCell>
              <TableCell>{job.jobName}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>{job.locationType}</TableCell>
              <TableCell>{job.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={job.isPublished}
                  onChange={(checked) => handleTogglePublish(job.id, checked)}
                />
              </TableCell>
              <TableCell>
                <TableActions
                  onView={() => handleView(job.id)}
                  onEdit={() => handleEdit(job.id)}
                  onDelete={() => handleDelete(job.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default JobsContent;

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
  TablePagination,
} from "@/components/molecules/table";
import { useState, useMemo } from "react";
import Image from "next/image";
import { SustainabilityReport } from "@/types/sustainabilityReport";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const SustainabilityReportsContent = () => {
  const mockReports: SustainabilityReport[] = [
    {
      id: "1",
      cover: "/img/annualReport.png",
      reportName: "Sustainability Report 2025",
      reportType: "BUMI Report",
      createdAt: "24/10/2025",
      lastUpdated: "12/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      cover: "/img/annualReport.png",
      reportName: "Sustainability Report 2024",
      reportType: "KCP Report",
      createdAt: "24/10/2025",
      lastUpdated: "12/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      cover: "/img/annualReport.png",
      reportName: "Sustainability Report 2023",
      reportType: "BUMI Report",
      createdAt: "24/10/2025",
      lastUpdated: "12/10/2025",
      isPublished: false,
    },
    {
      id: "4",
      cover: "/img/annualReport.png",
      reportName: "Sustainability Report 2022",
      reportType: "BUMI Report",
      createdAt: "23/10/2025",
      lastUpdated: "12/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      cover: "/img/annualReport.png",
      reportName: "Sustainability Report 2021",
      reportType: "BUMI Report",
      createdAt: "23/10/2025",
      lastUpdated: "12/10/2025",
      isPublished: false,
    },
  ];

  const [reports, setReports] = useState<SustainabilityReport[]>(mockReports);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportNameFilter, setReportNameFilter] =
    useState<string>("All Report");
  const [typeFilter, setTypeFilter] = useState<string>("All Type");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SustainabilityReport | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const reportsName = useMemo(
    () => [
      "All Report",
      ...Array.from(new Set(reports.map((j) => j.reportName))),
    ],
    [reports]
  );
  const reportTypes = useMemo(
    () => [
      "All Type",
      ...Array.from(new Set(reports.map((j) => j.reportType))),
    ],
    [reports]
  );
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.reportName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesReportName =
        reportNameFilter === "All Report" ||
        report.reportName === reportNameFilter;
      const matchesType =
        typeFilter === "All Type" || report.reportType === typeFilter;

      return matchesSearch && matchesReportName && matchesType;
    });
  }, [reports, searchQuery, reportNameFilter, typeFilter]);

  const sortedReports = useMemo(() => {
    if (!sortConfig.key) return filteredReports;

    return [...filteredReports].sort((a, b) => {
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
  }, [filteredReports, sortConfig]);

  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedReports.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedReports, currentPage, itemsPerPage]);

  const handleSort = (key: keyof SustainabilityReport) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(paginatedReports.map((report) => report.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleSelectReport = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports((prev) => [...prev, reportId]);
    } else {
      setSelectedReports((prev) => prev.filter((id) => id !== reportId));
    }
  };

  const handleTogglePublish = (reportId: string, isPublished: boolean) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, isPublished } : report
      )
    );
  };

  const handleView = (reportId: string) => {
    console.log("View report:", reportId);
  };

  const handleEdit = (reportId: string) => {
    console.log("Edit report:", reportId);
  };

  const handleDelete = (reportId: string) => {
    console.log("Delete report:", reportId);
  };

  const allSelected =
    paginatedReports.length > 0 &&
    paginatedReports.every((report) => selectedReports.includes(report.id));
  const someSelected =
    selectedReports.length > 0 &&
    paginatedReports.some((report) => selectedReports.includes(report.id)) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Report List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search report..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <select
            value={reportNameFilter}
            onChange={(e) => setReportNameFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {reportsName.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Cover</TableHead>
            <TableHead sortable onSort={() => handleSort("reportName")}>
              Report Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("reportType")}>
              Report Type
            </TableHead>
            <TableHead sortable onSort={() => handleSort("createdAt")}>
              Created At
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedReports.map((report, index) => (
            <TableRow
              key={report.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedReports.includes(report.id)}
                  onChange={(checked) => handleSelectReport(report.id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="w-16 h-20 relative rounded overflow-hidden bg-grey-lightest">
                  <Image
                    src={report.cover}
                    alt={report.reportName}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium w-52">{report.reportName}</TableCell>
              <TableCell>
                <div
                  className={`${
                    report.reportType === "BUMI Report"
                      ? "text-moss-stone bg-moss-stone/10"
                      : "text-error bg-error/10"
                  } inline-flex items-center px-2.5 py-1 rounded-sm`}
                >
                  {report.reportType}
                </div>
              </TableCell>
              <TableCell>{report.createdAt}</TableCell>
              <TableCell>{report.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={report.isPublished}
                  onChange={(checked) =>
                    handleTogglePublish(report.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(report.id)}
                    className="px-3 py-1.5 text-xs border border-moss-stone rounded-lg hover:bg-grey-lightest transition-colors flex items-center gap-1.5 text-moss-stone"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(report.id)}
                    className="p-2 bg-earn-craft-light hover:bg-grey/10 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-3 h-3 text-moss-stone"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.333 2A1.886 1.886 0 0 1 14 4.667l-9 9-3.667 1 1-3.667 9-9z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="p-2 bg-error/10 hover:bg-error/20 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-3 h-3 text-error"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
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

export default SustainabilityReportsContent;

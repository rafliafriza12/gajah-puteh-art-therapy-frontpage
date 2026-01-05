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
import { PressRelease } from "@/types/pressRelease";
import PDFIcon from "@/components/atoms/icons/PDFIcon";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const PressReleaseContent = () => {
  const mockPressReleases: PressRelease[] = [
    {
      id: "1",
      pressReleaseName:
        "BUMI Wins Two Prestigious Awards at the 2025 IICD Awards",
      year: "2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      pressReleaseName:
        "Laporan Kinerja Semester 1 Tahun 2025 PT Bumi Resources, Tbk",
      year: "2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      pressReleaseName: "BUMI Announces 1st Semester 2025 Results",
      year: "2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      pressReleaseName:
        "BUMI Resources - Diversification into Critical Minerals and Down...",
      year: "2025",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      pressReleaseName: "BUMI Secures Approval - Quasi Reorganization",
      year: "2025",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "6",
      pressReleaseName:
        "Arutmin Wins Two Awards at Bina Mitra UMKM Awards 2025",
      year: "2024",
      lastUpdated: "21/10/2025",
      isPublished: true,
    },
  ];

  const [pressReleases, setPressReleases] =
    useState<PressRelease[]>(mockPressReleases);
  const [selectedPressReleases, setSelectedPressReleases] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("All Years");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PressRelease | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const years = useMemo(
    () => [
      "All Years",
      ...Array.from(new Set(pressReleases.map((pr) => pr.year))),
    ],
    [pressReleases]
  );

  const filteredPressReleases = useMemo(() => {
    return pressReleases.filter((pr) => {
      const matchesSearch = pr.pressReleaseName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === "All Years" || pr.year === yearFilter;

      return matchesSearch && matchesYear;
    });
  }, [pressReleases, searchQuery, yearFilter]);

  const sortedPressReleases = useMemo(() => {
    if (!sortConfig.key) return filteredPressReleases;

    return [...filteredPressReleases].sort((a, b) => {
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
  }, [filteredPressReleases, sortConfig]);

  const totalPages = Math.ceil(sortedPressReleases.length / itemsPerPage);
  const paginatedPressReleases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPressReleases.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPressReleases, currentPage, itemsPerPage]);

  const handleSort = (key: keyof PressRelease) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPressReleases(paginatedPressReleases.map((pr) => pr.id));
    } else {
      setSelectedPressReleases([]);
    }
  };

  const handleSelectPressRelease = (prId: string, checked: boolean) => {
    if (checked) {
      setSelectedPressReleases((prev) => [...prev, prId]);
    } else {
      setSelectedPressReleases((prev) => prev.filter((id) => id !== prId));
    }
  };

  const handleTogglePublish = (prId: string, isPublished: boolean) => {
    setPressReleases((prev) =>
      prev.map((pr) => (pr.id === prId ? { ...pr, isPublished } : pr))
    );
  };

  const handleView = (prId: string) => {
    console.log("View press release:", prId);
  };

  const handleEdit = (prId: string) => {
    console.log("Edit press release:", prId);
  };

  const handleDelete = (prId: string) => {
    console.log("Delete press release:", prId);
  };

  const allSelected =
    paginatedPressReleases.length > 0 &&
    paginatedPressReleases.every((pr) => selectedPressReleases.includes(pr.id));
  const someSelected =
    selectedPressReleases.length > 0 &&
    paginatedPressReleases.some((pr) =>
      selectedPressReleases.includes(pr.id)
    ) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Press Release List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search press release..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
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
            <TableHead sortable onSort={() => handleSort("pressReleaseName")}>
              Press Release Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("year")}>
              Year
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPressReleases.map((pr, index) => (
            <TableRow
              key={pr.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedPressReleases.includes(pr.id)}
                  onChange={(checked) =>
                    handleSelectPressRelease(pr.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="w-96">
                <div className="flex items-center gap-2">
                  <PDFIcon className="w-6 h-6 shrink-0" />
                  <span>{pr.pressReleaseName}</span>
                </div>
              </TableCell>
              <TableCell>{pr.year}</TableCell>
              <TableCell>{pr.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={pr.isPublished}
                  onChange={(checked) => handleTogglePublish(pr.id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(pr.id)}
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
                    onClick={() => handleEdit(pr.id)}
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
                    onClick={() => handleDelete(pr.id)}
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

export default PressReleaseContent;

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
import { PresentationInsight } from "@/types/presentationInsight";
import PDFIcon from "@/components/atoms/icons/PDFIcon";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const PresentationInsightContent = () => {
  const mockPresentations: PresentationInsight[] = [
    {
      id: "1",
      documentName: "BUMI | Company Profile & Investor Presentation",
      presentationDate: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      documentName: "Investor Presentation Q3 2024",
      presentationDate: "15/09/2024",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      documentName: "Corporate Strategy 2024-2025",
      presentationDate: "10/08/2024",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      documentName: "Market Analysis & Outlook Report",
      presentationDate: "05/07/2024",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      documentName: "Sustainability Initiatives Presentation",
      presentationDate: "20/06/2024",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
  ];

  const [presentations, setPresentations] =
    useState<PresentationInsight[]>(mockPresentations);
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PresentationInsight | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const filteredPresentations = useMemo(() => {
    return presentations.filter((presentation) => {
      const matchesSearch = presentation.documentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [presentations, searchQuery]);

  const sortedPresentations = useMemo(() => {
    if (!sortConfig.key) return filteredPresentations;

    return [...filteredPresentations].sort((a, b) => {
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
  }, [filteredPresentations, sortConfig]);

  const totalPages = Math.ceil(sortedPresentations.length / itemsPerPage);
  const paginatedPresentations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPresentations.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPresentations, currentPage, itemsPerPage]);

  const handleSort = (key: keyof PresentationInsight) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPresentations(paginatedPresentations.map((p) => p.id));
    } else {
      setSelectedPresentations([]);
    }
  };

  const handleSelectPresentation = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPresentations((prev) => [...prev, id]);
    } else {
      setSelectedPresentations((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleTogglePublish = (id: string, isPublished: boolean) => {
    setPresentations((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished } : p))
    );
  };

  const handleView = (id: string) => {
    console.log("View presentation:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit presentation:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete presentation:", id);
  };

  const allSelected =
    paginatedPresentations.length > 0 &&
    paginatedPresentations.every((p) => selectedPresentations.includes(p.id));
  const someSelected =
    selectedPresentations.length > 0 &&
    paginatedPresentations.some((p) => selectedPresentations.includes(p.id)) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Presentation List</Heading5>
        <SearchBarTable
          placeholder="Search document..."
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
        />
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
            <TableHead sortable onSort={() => handleSort("documentName")}>
              Document Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("presentationDate")}>
              Presentation Date
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPresentations.map((presentation, index) => (
            <TableRow
              key={presentation.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedPresentations.includes(presentation.id)}
                  onChange={(checked) =>
                    handleSelectPresentation(presentation.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="w-104">
                <div className="flex items-center gap-2">
                  <PDFIcon className="w-6 h-6 shrink-0" />
                  <span>{presentation.documentName}</span>
                </div>
              </TableCell>
              <TableCell>{presentation.presentationDate}</TableCell>
              <TableCell>{presentation.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={presentation.isPublished}
                  onChange={(checked) =>
                    handleTogglePublish(presentation.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(presentation.id)}
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
                    onClick={() => handleEdit(presentation.id)}
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
                    onClick={() => handleDelete(presentation.id)}
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

export default PresentationInsightContent;

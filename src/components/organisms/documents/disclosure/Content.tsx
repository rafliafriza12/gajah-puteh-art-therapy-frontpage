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
import { Disclosure } from "@/types/disclosure";
import PDFIcon from "@/components/atoms/icons/PDFIcon";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const DisclosureContent = () => {
  const mockDocuments: Disclosure[] = [
    {
      id: "1",
      documentName: "Disclosure Information Regarding BOC and BOD Member Resignation",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      documentName: "Disclosure Of Information To Shareholders In Relation To The Propose...",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      documentName: "Notice of appointment of BUMI New Corsec",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      documentName: "Information Disclosure The passing of Director and Corporate Secretary BUMI",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      documentName: "IKPS - NPR Results (OWK Conversion) 1",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
  ];

  const [documents, setDocuments] = useState<Disclosure[]>(mockDocuments);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Disclosure | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.documentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [documents, searchQuery]);

  const sortedDocuments = useMemo(() => {
    if (!sortConfig.key) return filteredDocuments;

    return [...filteredDocuments].sort((a, b) => {
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
  }, [filteredDocuments, sortConfig]);

  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);
  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedDocuments.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedDocuments, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Disclosure) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(paginatedDocuments.map((doc) => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments((prev) => [...prev, docId]);
    } else {
      setSelectedDocuments((prev) => prev.filter((id) => id !== docId));
    }
  };

  const handleTogglePublish = (docId: string, isPublished: boolean) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, isPublished } : doc))
    );
  };

  const handleView = (docId: string) => {
    console.log("View document:", docId);
  };

  const handleEdit = (docId: string) => {
    console.log("Edit document:", docId);
  };

  const handleDelete = (docId: string) => {
    console.log("Delete document:", docId);
  };

  const allSelected =
    paginatedDocuments.length > 0 &&
    paginatedDocuments.every((doc) => selectedDocuments.includes(doc.id));
  const someSelected =
    selectedDocuments.length > 0 &&
    paginatedDocuments.some((doc) => selectedDocuments.includes(doc.id)) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Document List</Heading5>
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
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDocuments.map((doc, index) => (
            <TableRow key={doc.id} className={index % 2 !== 0 ? "bg-grey-lightest" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={(checked) => handleSelectDocument(doc.id, checked)}
                />
              </TableCell>
              <TableCell className="w-104">
                <div className="flex items-center gap-2">
                  <PDFIcon className="w-6 h-6 shrink-0" />
                  <span>{doc.documentName}</span>
                </div>
              </TableCell>
              <TableCell>{doc.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={doc.isPublished}
                  onChange={(checked) => handleTogglePublish(doc.id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(doc.id)}
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
                    onClick={() => handleEdit(doc.id)}
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
                    onClick={() => handleDelete(doc.id)}
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

export default DisclosureContent;

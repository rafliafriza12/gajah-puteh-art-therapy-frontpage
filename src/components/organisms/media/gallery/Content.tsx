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
import { Gallery } from "@/types/gallery";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const GalleryContent = () => {
  const mockGalleries: Gallery[] = [
    {
      id: "1",
      thumbnail: "/img/avatar.jpeg",
      galleryName: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      type: "Image",
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      thumbnail: "/img/avatar.jpeg",
      galleryName: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      type: "Video",
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      thumbnail: "/img/avatar.jpeg",
      galleryName: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      type: "Video",
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      thumbnail: "/img/avatar.jpeg",
      galleryName: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      type: "Video",
      createdAt: "23/10/2025",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      thumbnail: "/img/avatar.jpeg",
      galleryName: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      type: "Video",
      createdAt: "21/10/2025",
      lastUpdated: "21/10/2025",
      isPublished: false,
    },
  ];

  const [galleries, setGalleries] = useState<Gallery[]>(mockGalleries);
  const [selectedGalleries, setSelectedGalleries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All Type");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Gallery | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const types = useMemo(
    () => ["All Type", ...Array.from(new Set(galleries.map((g) => g.type)))],
    [galleries]
  );

  const filteredGalleries = useMemo(() => {
    return galleries.filter((gallery) => {
      const matchesSearch = gallery.galleryName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter === "All Type" || gallery.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [galleries, searchQuery, typeFilter]);

  const sortedGalleries = useMemo(() => {
    if (!sortConfig.key) return filteredGalleries;

    return [...filteredGalleries].sort((a, b) => {
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
  }, [filteredGalleries, sortConfig]);

  const totalPages = Math.ceil(sortedGalleries.length / itemsPerPage);
  const paginatedGalleries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedGalleries.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedGalleries, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Gallery) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGalleries(paginatedGalleries.map((gallery) => gallery.id));
    } else {
      setSelectedGalleries([]);
    }
  };

  const handleSelectGallery = (galleryId: string, checked: boolean) => {
    if (checked) {
      setSelectedGalleries((prev) => [...prev, galleryId]);
    } else {
      setSelectedGalleries((prev) => prev.filter((id) => id !== galleryId));
    }
  };

  const handleTogglePublish = (galleryId: string, isPublished: boolean) => {
    setGalleries((prev) =>
      prev.map((gallery) =>
        gallery.id === galleryId ? { ...gallery, isPublished } : gallery
      )
    );
  };

  const handleView = (galleryId: string) => {
    console.log("View gallery:", galleryId);
  };

  const handleEdit = (galleryId: string) => {
    console.log("Edit gallery:", galleryId);
  };

  const handleDelete = (galleryId: string) => {
    console.log("Delete gallery:", galleryId);
  };

  const allSelected =
    paginatedGalleries.length > 0 &&
    paginatedGalleries.every((gallery) =>
      selectedGalleries.includes(gallery.id)
    );
  const someSelected =
    selectedGalleries.length > 0 &&
    paginatedGalleries.some((gallery) =>
      selectedGalleries.includes(gallery.id)
    ) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Gallery List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {types.map((type) => (
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
            <TableHead sortable onSort={() => handleSort("galleryName")}>
              Gallery Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("type")}>
              Type
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
          {paginatedGalleries.map((gallery, index) => (
            <TableRow
              key={gallery.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedGalleries.includes(gallery.id)}
                  onChange={(checked) =>
                    handleSelectGallery(gallery.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="w-80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded overflow-hidden bg-grey-lightest shrink-0">
                    <Image
                      src={gallery.thumbnail}
                      alt={gallery.galleryName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{gallery.galleryName}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded text-xs border ${
                    gallery.type === "Image"
                      ? "text-warning"
                      : "text-moss-stone"
                  }`}
                >
                  {gallery.type}
                </span>
              </TableCell>
              <TableCell>{gallery.createdAt}</TableCell>
              <TableCell>{gallery.lastUpdated}</TableCell>
              <TableCell>
                <Toggle
                  checked={gallery.isPublished}
                  onChange={(checked) =>
                    handleTogglePublish(gallery.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(gallery.id)}
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
                    onClick={() => handleEdit(gallery.id)}
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
                    onClick={() => handleDelete(gallery.id)}
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

export default GalleryContent;

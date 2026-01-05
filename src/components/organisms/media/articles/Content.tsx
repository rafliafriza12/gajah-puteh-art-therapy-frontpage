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
import { Article } from "@/types/article";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";

const ArticlesContent = () => {
  const mockArticles: Article[] = [
    {
      id: "1",
      thumbnail: "/img/avatar.jpeg",
      articleName: "STRATEGIC GOAL SETTING WORKSHOP 2023",
      status: "Published",
      author: {
        name: "Aspen Stanton",
        avatar: "/img/avatar.jpeg",
      },
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "2",
      thumbnail: "/img/avatar.jpeg",
      articleName: "STRATEGIC GOAL SETTING WORKSHOP 2023",
      status: "Published",
      author: {
        name: "Dulce Dias",
        avatar: "/img/avatar.jpeg",
      },
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "3",
      thumbnail: "/img/avatar.jpeg",
      articleName: "STRATEGIC GOAL SETTING WORKSHOP 2023",
      status: "Published",
      author: {
        name: "Leo Geidt",
        avatar: "/img/avatar.jpeg",
      },
      createdAt: "24/10/2025",
      lastUpdated: "24/10/2025",
      isPublished: true,
    },
    {
      id: "4",
      thumbnail: "/img/avatar.jpeg",
      articleName: "STRATEGIC GOAL SETTING WORKSHOP 2023",
      status: "Published",
      author: {
        name: "Aspen Stanton",
        avatar: "/img/avatar.jpeg",
      },
      createdAt: "23/10/2025",
      lastUpdated: "23/10/2025",
      isPublished: true,
    },
    {
      id: "5",
      thumbnail: "/img/avatar.jpeg",
      articleName: "STRATEGIC GOAL SETTING WORKSHOP 2023",
      status: "Draft",
      author: {
        name: "Aspen Stanton",
        avatar: "/img/avatar.jpeg",
      },
      createdAt: "21/10/2025",
      lastUpdated: "21/10/2025",
      isPublished: false,
    },
  ];

  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Article | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const statuses = useMemo(
    () => ["All Status", ...Array.from(new Set(articles.map((a) => a.status)))],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = article.articleName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || article.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, statusFilter]);

  const sortedArticles = useMemo(() => {
    if (!sortConfig.key) return filteredArticles;

    return [...filteredArticles].sort((a, b) => {
      let aValue = a[sortConfig.key!];
      let bValue = b[sortConfig.key!];

      // Handle nested author object
      if (sortConfig.key === "author") {
        aValue = a.author.name as any;
        bValue = b.author.name as any;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredArticles, sortConfig]);

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedArticles, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Article) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(paginatedArticles.map((article) => article.id));
    } else {
      setSelectedArticles([]);
    }
  };

  const handleSelectArticle = (articleId: string, checked: boolean) => {
    if (checked) {
      setSelectedArticles((prev) => [...prev, articleId]);
    } else {
      setSelectedArticles((prev) => prev.filter((id) => id !== articleId));
    }
  };

  const handleView = (articleId: string) => {
    console.log("View article:", articleId);
  };

  const handleEdit = (articleId: string) => {
    console.log("Edit article:", articleId);
  };

  const handleDelete = (articleId: string) => {
    console.log("Delete article:", articleId);
  };

  const allSelected =
    paginatedArticles.length > 0 &&
    paginatedArticles.every((article) => selectedArticles.includes(article.id));
  const someSelected =
    selectedArticles.length > 0 &&
    paginatedArticles.some((article) =>
      selectedArticles.includes(article.id)
    ) &&
    !allSelected;

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>Article List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search article..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
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
            <TableHead sortable onSort={() => handleSort("articleName")}>
              Article Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("status")}>
              Status
            </TableHead>
            <TableHead sortable onSort={() => handleSort("author")}>
              Author
            </TableHead>
            <TableHead sortable onSort={() => handleSort("createdAt")}>
              Created At
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastUpdated")}>
              Last Updated
            </TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedArticles.map((article, index) => (
            <TableRow
              key={article.id}
              className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedArticles.includes(article.id)}
                  onChange={(checked) =>
                    handleSelectArticle(article.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="w-80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded overflow-hidden bg-grey-lightest shrink-0">
                    <Image
                      src={article.thumbnail}
                      alt={article.articleName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{article.articleName}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs ${
                    article.status === "Published"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {article.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden bg-grey-lightest shrink-0">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{article.author.name}</span>
                </div>
              </TableCell>
              <TableCell>{article.createdAt}</TableCell>
              <TableCell>{article.lastUpdated}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(article.id)}
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
                    onClick={() => handleEdit(article.id)}
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
                    onClick={() => handleDelete(article.id)}
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

export default ArticlesContent;

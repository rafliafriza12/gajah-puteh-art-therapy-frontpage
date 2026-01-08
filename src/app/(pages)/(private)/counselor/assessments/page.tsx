"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import { useTherapies } from "@/services";
import { useActivities, Activity } from "@/services/activityHooks";
import { useState, useMemo, Fragment } from "react";
import Link from "next/link";
import SearchIcon from "@/components/atoms/icons/SearchIcon";

export default function AllAssessmentsPage() {
  const { data: therapies, isLoading: therapiesLoading } = useTherapies();
  const { data: activitiesData, isLoading: isLoadingActivities } =
    useActivities(therapies);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<Activity["type"] | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get all activities except therapy type
  const allActivities = useMemo(() => {
    if (!activitiesData?.activities) return [];
    return activitiesData.activities.filter(
      (activity) => activity.type !== "therapy"
    );
  }, [activitiesData]);

  // Filter and search activities
  const filteredActivities = useMemo(() => {
    let filtered = allActivities;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((activity) => activity.type === filterType);
    }

    // Search by child name or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.childName.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allActivities, filterType, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredActivities, currentPage]);

  // Reset to page 1 when filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  const isLoading = therapiesLoading || isLoadingActivities;

  // Helper function to get activity badge color
  const getActivityColor = (type: Activity["type"]) => {
    const colors = {
      screening: "bg-orange-100 text-orange-800 border-orange-200",
      pretest: "bg-blue-100 text-blue-800 border-blue-200",
      observation: "bg-purple-100 text-purple-800 border-purple-200",
      posttest: "bg-teal-100 text-teal-800 border-teal-200",
      therapy: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Helper function to get activity icon
  const getActivityIcon = (type: Activity["type"]) => {
    const icons = {
      screening: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      ),
      pretest: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      ),
      observation: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      ),
      posttest: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      ),
      therapy: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      ),
    };
    return icons[type] || icons.screening;
  };

  // Helper function to get activity type label
  const getActivityLabel = (type: Activity["type"]) => {
    const labels = {
      screening: "Screening",
      pretest: "Pretest",
      observation: "Observasi",
      posttest: "Posttest",
      therapy: "Terapi",
    };
    return labels[type] || type;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
          Semua Asesmen
        </Heading3>
        <p className="text-grey mt-1 sm:mt-2 text-sm sm:text-base">
          Lihat dan kelola semua asesmen terapi
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-neutral-01 border border-grey-stroke rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama anak..."
                className="w-full pl-10 pr-4 py-2.5 border border-grey-stroke rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss-stone"
              />
            </div>
          </div>

          {/* Filter by Type */}
          <div className="sm:w-48 lg:w-64">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as Activity["type"] | "all")
              }
              className="w-full px-4 py-2.5 border border-grey-stroke rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss-stone"
            >
              <option value="all">Semua Tipe</option>
              <option value="screening">Screening</option>
              <option value="pretest">Pretest</option>
              <option value="observation">Observasi</option>
              <option value="posttest">Posttest</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-grey">
          {isLoading ? (
            "Memuat..."
          ) : (
            <>
              Menampilkan {paginatedActivities.length} dari{" "}
              {filteredActivities.length} asesmen
            </>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-neutral-01 border border-grey-stroke rounded-xl p-4 sm:p-6 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredActivities.length === 0 && (
        <div className="bg-neutral-01 border border-grey-stroke rounded-xl p-8 sm:p-12 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-grey-lightest rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-grey"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
                clipRule="evenodd"
                fill="currentColor"
              />
            </svg>
          </div>
          <Heading5 className="text-neutral-02 mb-2 text-base sm:text-lg">
            Tidak ada asesmen ditemukan
          </Heading5>
          <p className="text-grey text-xs sm:text-sm">
            {searchQuery || filterType !== "all"
              ? "Coba sesuaikan filter atau kata kunci pencarian Anda"
              : "Belum ada asesmen yang dibuat"}
          </p>
        </div>
      )}

      {/* Assessment Cards Grid */}
      {!isLoading && paginatedActivities.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedActivities.map((activity) => (
              <Link
                key={activity.id}
                href={activity.link}
                className="bg-neutral-01 border border-grey-stroke rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-moss-stone transition-all duration-200 group"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div
                    className={`p-2 sm:p-2.5 rounded-lg border ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Heading5 className="text-neutral-02 truncate text-sm sm:text-base">
                        {getActivityLabel(activity.type)}
                      </Heading5>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityLabel(activity.type)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-02 font-medium truncate">
                      {activity.childName}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-grey mb-3 sm:mb-4 line-clamp-2">
                  {activity.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-grey">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      {formatDate(activity.createdAt)}
                    </span>
                    <span className="sm:hidden">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs text-moss-stone font-medium group-hover:underline">
                    Lihat →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-4 py-2 border border-grey-stroke rounded-lg text-xs sm:text-sm font-medium text-neutral-02 hover:bg-grey-lightest disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Sebelumnya</span>
                <span className="sm:hidden">←</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => (
                    <Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="text-grey text-sm">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-moss-stone text-neutral-01"
                            : "border border-grey-stroke text-neutral-02 hover:bg-grey-lightest"
                        }`}
                      >
                        {page}
                      </button>
                    </Fragment>
                  ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-2 sm:px-4 py-2 border border-grey-stroke rounded-lg text-xs sm:text-sm font-medium text-neutral-02 hover:bg-grey-lightest disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span className="sm:hidden">→</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

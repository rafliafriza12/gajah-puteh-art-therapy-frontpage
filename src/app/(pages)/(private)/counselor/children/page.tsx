"use client";

import { Heading3, BodySmallMedium } from "@/components/atoms/Typography";
import Link from "next/link";
import { useParents } from "@/services";
import { useState } from "react";

export default function CounselorChildrenPage() {
  const { data: parents, isLoading } = useParents();
  const [expandedParents, setExpandedParents] = useState<string[]>([]);

  const toggleParent = (parentId: string) => {
    setExpandedParents((prev) =>
      prev.includes(parentId)
        ? prev.filter((id) => id !== parentId)
        : [...prev, parentId]
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
            Manajemen Anak
          </Heading3>
          <p className="text-grey mt-1 sm:mt-2 text-sm sm:text-base">
            Lihat semua anak berdasarkan orangtua mereka
          </p>
        </div>
      </div>

      {/* Parents & Children List */}
      <div className="space-y-3 sm:space-y-4">
        {isLoading ? (
          // Skeleton for parent cards
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 animate-pulse"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20 self-end sm:self-auto"></div>
                </div>
              </div>
            ))}
          </>
        ) : parents && parents.length > 0 ? (
          parents.map((parent) => (
            <div
              key={parent._id}
              className="bg-white border border-grey-stroke rounded-xl overflow-hidden"
            >
              {/* Parent Header */}
              <div
                className="p-4 sm:p-6 cursor-pointer hover:bg-grey-stroke/5 transition-colors"
                onClick={() => toggleParent(parent._id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-moss-stone/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-moss-stone font-medium text-base sm:text-lg">
                        {parent.fullname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-base sm:text-lg font-medium text-neutral-02 truncate">
                          {parent.fullname}
                        </h4>
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">
                          Orangtua
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-grey truncate">
                        <span className="hidden sm:inline">
                          {parent.email} •{" "}
                        </span>
                        {parent.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-end">
                    <Link
                      href={`/counselor/parents/${parent._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                    >
                      Lihat Profil
                    </Link>
                    <svg
                      className={`w-5 h-5 text-grey transition-transform ${
                        expandedParents.includes(parent._id) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Children List (Expandable) */}
              {expandedParents.includes(parent._id) && (
                <div className="border-t border-grey-stroke">
                  <ChildrenList parentId={parent._id} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border border-grey-stroke rounded-xl p-8 sm:p-12 text-center">
            <p className="text-grey text-sm sm:text-base">
              Tidak ada orangtua ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Component untuk menampilkan children dari satu parent
function ChildrenList({ parentId }: { parentId: string }) {
  const { data: children, isLoading } = useChildrenByParent(parentId);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-grey-stroke/20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!children || children.length === 0) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-sm text-grey">Belum ada anak terdaftar</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-grey-stroke">
      {children.map((child) => (
        <Link
          key={child._id}
          href={`/counselor/children/${child._id}`}
          className="block p-4 sm:p-6 hover:bg-grey-stroke/5 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                <h5 className="text-sm sm:text-base font-medium text-neutral-02 truncate">
                  {child.fullname || `Child #${child.childOrder}`}
                </h5>
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700">
                  Anak
                </span>
                <span className="px-2 py-0.5 sm:py-1 text-xs font-medium rounded bg-moss-stone/10 text-moss-stone">
                  {child.age} tahun
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-grey">
                <span>NIK: {child.nik}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {child.education.stage} - Class {child.education.class}
                </span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">
                  Mother: {child.biologicalMotherName}
                </span>
              </div>
            </div>
            <span className="text-moss-stone font-medium text-xs sm:text-sm self-end sm:self-auto shrink-0">
              Lihat Detail →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Import hook yang diperlukan
import { useChildrenByParent } from "@/services";

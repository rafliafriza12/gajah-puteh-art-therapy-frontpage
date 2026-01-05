"use client";

import { Heading3 } from "@/components/atoms/Typography";
import Link from "next/link";
import {
  useCurrentUser,
  useChildrenByParent,
  useTherapiesByParent,
} from "@/services";
import { isParent } from "@/types/auth";
import { useMemo, useState } from "react";

export default function ParentReportsPage() {
  const { data: user } = useCurrentUser();
  const parentId = user && isParent(user) ? user._id : "";

  const { data: children, isLoading: childrenLoading } =
    useChildrenByParent(parentId);
  const { data: therapies, isLoading: therapiesLoading } =
    useTherapiesByParent();

  const [selectedChild, setSelectedChild] = useState<string>("all");

  // Filter therapies by selected child
  const filteredTherapies = useMemo(() => {
    if (!therapies) return [];

    if (selectedChild !== "all") {
      return therapies.filter((therapy) => therapy.childId === selectedChild);
    }

    return therapies;
  }, [therapies, selectedChild]);

  const isLoading = childrenLoading || therapiesLoading;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading3 className="text-neutral-02">Assessment Reports</Heading3>
          <p className="text-grey mt-2">
            View all assessment results and progress reports
          </p>
        </div>
      </div>

      {/* Filter by Child */}
      {!isLoading && children && children.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-02 mb-2">
            Filter by Child
          </label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
          >
            <option value="all">All Children</option>
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.fullname} (NIK: {child.nik.slice(0, 8)}...)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-1">DASS Screening</h4>
          <p className="text-sm text-blue-800">
            Depression, Anxiety, and Stress Scale assessment
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 mb-1">Observations</h4>
          <p className="text-sm text-green-800">
            Counselor notes and session summaries
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-900 mb-1">
            Progress Tracking
          </h4>
          <p className="text-sm text-purple-800">
            Monitor improvements over time
          </p>
        </div>
      </div>

      {/* Assessment Reports */}
      <div className="space-y-4">
        {isLoading ? (
          // Skeleton for reports
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                </div>
              </div>
            ))}
          </>
        ) : filteredTherapies && filteredTherapies.length > 0 ? (
          filteredTherapies.map((therapy) => {
            const child = children?.find((c) => c._id === therapy.childId);
            return (
              <TherapyReportCard
                key={therapy._id}
                therapy={therapy}
                child={child}
              />
            );
          })
        ) : (
          <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 text-grey mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-grey mb-2">No assessment reports yet</p>
            <p className="text-sm text-grey">
              Assessment reports will appear here after therapy sessions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Component untuk menampilkan individual therapy report card
function TherapyReportCard({ therapy, child }: { therapy: any; child: any }) {
  return (
    <div className="bg-white border border-grey-stroke rounded-xl p-6 hover:border-moss-stone transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-moss-stone/10 rounded-lg flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-moss-stone"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-neutral-02 mb-1">
            {child?.fullname || "Unknown Child"}
          </h4>
          <p className="text-sm text-grey">
            Therapy Session -{" "}
            {new Date(therapy.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <Link
          href={`/parent/therapy/${therapy._id}`}
          className="px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-sm font-medium"
        >
          View
        </Link>
      </div>
    </div>
  );
}

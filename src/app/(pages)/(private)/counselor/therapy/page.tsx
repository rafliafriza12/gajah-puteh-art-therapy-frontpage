"use client";

import { Heading3, BodySmallMedium } from "@/components/atoms/Typography";
import Link from "next/link";
import {
  useTherapiesByCounselor,
  useCurrentUser,
  useChild,
  useCounselor,
  useParent,
} from "@/services";
import { useState } from "react";
import CreateTherapyModal from "@/components/molecules/modals/CreateTherapyModal";
import { isCounselor } from "@/types/auth";

// Component to display therapy row with fetched names (Desktop)
function TherapyRow({ session }: { session: any }) {
  const { data: child, isLoading: childLoading } = useChild(session.childId);
  const { data: counselor, isLoading: counselorLoading } = useCounselor(
    session.counselorId
  );
  const { data: parent, isLoading: parentLoading } = useParent(
    child?.parentId || ""
  );

  return (
    <tr className="hover:bg-grey-stroke/5 transition-colors">
      <td className="px-4 lg:px-6 py-4">
        <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
          {new Date(session.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </BodySmallMedium>
      </td>
      <td className="px-4 lg:px-6 py-4">
        {parentLoading ? (
          <div className="h-4 bg-gray-200 rounded w-24 lg:w-32 animate-pulse"></div>
        ) : (
          <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
            {parent?.fullname || "-"}
          </BodySmallMedium>
        )}
      </td>
      <td className="px-4 lg:px-6 py-4">
        {childLoading ? (
          <div className="h-4 bg-gray-200 rounded w-24 lg:w-32 animate-pulse"></div>
        ) : (
          <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
            {child?.fullname || "-"}
          </BodySmallMedium>
        )}
      </td>
      <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
        {counselorLoading ? (
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        ) : (
          <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
            {counselor?.fullname || "-"}
          </BodySmallMedium>
        )}
      </td>
      <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
        <BodySmallMedium className="text-grey text-xs lg:text-sm">
          {new Date(session.createdAt).toLocaleDateString("id-ID")}
        </BodySmallMedium>
      </td>
      <td className="px-4 lg:px-6 py-4">
        <Link href={`/counselor/therapy/${session._id}`}>
          <button className="text-xs lg:text-sm text-moss-stone hover:text-moss-stone-dark font-medium">
            View
          </button>
        </Link>
      </td>
    </tr>
  );
}

// Mobile Card Component
function TherapyCard({ session }: { session: any }) {
  const { data: child, isLoading: childLoading } = useChild(session.childId);
  const { data: counselor, isLoading: counselorLoading } = useCounselor(
    session.counselorId
  );
  const { data: parent, isLoading: parentLoading } = useParent(
    child?.parentId || ""
  );

  return (
    <Link
      href={`/counselor/therapy/${session._id}`}
      className="block bg-white border border-grey-stroke rounded-xl p-4 hover:shadow-md hover:border-moss-stone transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-moss-stone/20 rounded-lg flex items-center justify-center">
            {childLoading ? (
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span className="text-moss-stone font-medium text-sm">
                {child?.fullname?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div>
            {childLoading ? (
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            ) : (
              <p className="font-medium text-neutral-02 text-sm">
                {child?.fullname || "-"}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-grey bg-grey-stroke/30 px-2 py-1 rounded">
          {new Date(session.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-grey">
        <div className="flex justify-between">
          <span>Parent:</span>
          {parentLoading ? (
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          ) : (
            <span className="text-neutral-02">{parent?.fullname || "-"}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span>Counselor:</span>
          {counselorLoading ? (
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          ) : (
            <span className="text-neutral-02">
              {counselor?.fullname || "-"}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-grey-stroke flex justify-end">
        <span className="text-xs text-moss-stone font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
}

export default function TherapySessionsPage() {
  const { data: sessions, isLoading } = useTherapiesByCounselor();
  const { data: user } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const counselorId = user && isCounselor(user) ? user._id : "";

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
      case "upcoming":
        return "bg-warning/10 text-warning";
      case "completed":
      case "done":
        return "bg-success/10 text-success";
      case "cancelled":
        return "bg-error/10 text-error";
      default:
        return "bg-grey/10 text-grey";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
            Therapy Sessions
          </Heading3>
          <p className="text-grey mt-1 sm:mt-2 text-sm sm:text-base">
            Manage and track all therapy sessions
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          + New Session
        </button>
      </div>

      {/* Create Therapy Modal */}
      {counselorId && (
        <CreateTherapyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          counselorId={counselorId}
        />
      )}

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-grey-stroke rounded-xl p-4 animate-pulse"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))
        ) : sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <TherapyCard key={session._id} session={session} />
          ))
        ) : (
          <div className="bg-white border border-grey-stroke rounded-xl p-8 text-center">
            <p className="text-grey text-sm">No therapy sessions found</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-2 inline-block"
            >
              Create your first session
            </button>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white border border-grey-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-stroke/10 border-b border-grey-stroke">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Date
                  </BodySmallMedium>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Parent
                  </BodySmallMedium>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Child
                  </BodySmallMedium>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left hidden xl:table-cell">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Counselor
                  </BodySmallMedium>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left hidden lg:table-cell">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Created
                  </BodySmallMedium>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <BodySmallMedium className="text-neutral-02 text-xs lg:text-sm">
                    Actions
                  </BodySmallMedium>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-stroke">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 lg:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20 lg:w-24"></div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24 lg:w-32"></div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24 lg:w-32"></div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                  </tr>
                ))
              ) : sessions && sessions.length > 0 ? (
                sessions.map((session) => (
                  <TherapyRow key={session._id} session={session} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-grey">No therapy sessions found</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-2 inline-block"
                    >
                      Create your first session
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

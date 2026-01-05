"use client";

import { Heading3, BodySmallMedium } from "@/components/atoms/Typography";
import Link from "next/link";
import {
  useTherapiesByCounselor,
  useChild,
  useCounselor,
  useParent,
  useObservationByTherapy,
} from "@/services";

// Component to display each therapy row with names
function ObservationRow({ therapy }: { therapy: any }) {
  const { data: child, isLoading: childLoading } = useChild(therapy.childId);
  const { data: counselor, isLoading: counselorLoading } = useCounselor(
    therapy.counselorId
  );
  const { data: parent, isLoading: parentLoading } = useParent(
    child?.parentId || ""
  );
  const { data: observation, isLoading: obsLoading } = useObservationByTherapy(
    therapy._id
  );

  const hasObservation = !!observation;

  return (
    <tr className="hover:bg-grey-stroke/5 transition-colors">
      <td className="px-6 py-4">
        <BodySmallMedium className="text-neutral-02 font-mono">
          {therapy._id.slice(0, 8)}...
        </BodySmallMedium>
      </td>
      <td className="px-6 py-4">
        {parentLoading ? (
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        ) : (
          <BodySmallMedium className="text-neutral-02">
            {parent?.fullname || "-"}
          </BodySmallMedium>
        )}
      </td>
      <td className="px-6 py-4">
        {childLoading ? (
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        ) : (
          <BodySmallMedium className="text-neutral-02">
            {child?.fullname || "-"}
          </BodySmallMedium>
        )}
      </td>
      <td className="px-6 py-4">
        {obsLoading ? (
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        ) : (
          <div className="flex items-center gap-2">
            {hasObservation ? (
              <>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  Completed
                </span>
                <Link
                  href={`/counselor/therapy/${therapy._id}`}
                  className="text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  View
                </Link>
              </>
            ) : (
              <Link
                href={`/counselor/assessments/observation/create?therapyId=${therapy._id}`}
                className="px-4 py-2 text-center bg-moss-stone text-white text-sm rounded-lg hover:bg-moss-stone-dark transition-colors"
              >
                Create Observation
              </Link>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

export default function ObservationAssessmentsPage() {
  const { data: therapies, isLoading } = useTherapiesByCounselor();

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Heading3 className="text-neutral-02">Observation Assessments</Heading3>
        <p className="text-grey mt-2">
          Record and track child behavior observations during therapy sessions
        </p>
      </div>

      {/* Observations Table */}
      <div className="bg-white border border-grey-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-stroke/10 border-b border-grey-stroke">
              <tr>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Therapy ID
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Parent Name
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Child Name
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Status / Actions
                  </BodySmallMedium>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-stroke">
              {isLoading ? (
                // Skeleton rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                  </tr>
                ))
              ) : therapies && therapies.length > 0 ? (
                therapies.map((therapy) => (
                  <ObservationRow key={therapy._id} therapy={therapy} />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-grey mb-4">No therapy sessions found</p>
                    <Link
                      href="/counselor/therapy"
                      className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm"
                    >
                      Create a therapy session first →
                    </Link>
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

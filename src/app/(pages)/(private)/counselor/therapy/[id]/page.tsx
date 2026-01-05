"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useTherapy,
  useChild,
  useCounselor,
  useObservationByTherapy,
  useScreeningByTherapy,
  usePretestByTherapy,
  usePosttestByTherapy,
  useCurrentUser,
} from "@/services";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function TherapyDetailPage() {
  const params = useParams();
  const therapyId = params.id as string;

  const { data: therapy, isLoading: therapyLoading } = useTherapy(therapyId);
  const { data: child, isLoading: childLoading } = useChild(
    therapy?.childId || ""
  );
  const { data: counselor, isLoading: counselorLoading } = useCounselor(
    therapy?.counselorId || ""
  );
  const { data: currentUser } = useCurrentUser();
  const { data: observation, isLoading: observationLoading } =
    useObservationByTherapy(therapyId);
  const { data: screening, isLoading: screeningLoading } =
    useScreeningByTherapy(therapyId);
  const { data: pretest, isLoading: pretestLoading } =
    usePretestByTherapy(therapyId);
  const { data: posttest, isLoading: posttestLoading } =
    usePosttestByTherapy(therapyId);

  const isLoading = therapyLoading || childLoading || counselorLoading;

  // Check if current user can edit this therapy's assessments
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  if (isLoading) {
    return (
      <div className="">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>

          {/* Header skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 sm:mb-6"></div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Therapy info card */}
              <div className="h-48 bg-gray-200 rounded-xl"></div>

              {/* Child info card */}
              <div className="h-48 bg-gray-200 rounded-xl"></div>

              {/* Observation card */}
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Screening card */}
              <div className="h-96 bg-gray-200 rounded-xl"></div>

              {/* Actions card */}
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!therapy) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-6 sm:p-8 lg:p-12 text-center">
          <p className="text-grey text-sm sm:text-base">
            Therapy session not found
          </p>
          <Link
            href="/counselor/therapy"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Back to Therapy Sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Back Button */}
      <Link
        href="/counselor/therapy"
        className="inline-flex items-center text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark mb-4"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Therapy Sessions
      </Link>

      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
          Therapy Session Details
        </Heading3>
        <p className="text-grey mt-2 text-xs sm:text-sm">
          Created on{" "}
          {new Date(therapy.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Counselor & Child Information */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <Heading5 className="text-neutral-02 mb-4 text-base sm:text-lg">
              Session Overview
            </Heading5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Counselor Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-moss-stone/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-moss-stone"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey text-xs">
                      Counselor
                    </BodySmallMedium>
                    <p className="text-sm font-semibold text-neutral-02">
                      {counselorLoading ? (
                        <span className="inline-block h-4 w-32 bg-grey-stroke/20 rounded animate-pulse"></span>
                      ) : counselor ? (
                        counselor.fullname
                      ) : (
                        "Unknown Counselor"
                      )}
                    </p>
                  </div>
                </div>
                {counselor && (
                  <div className="space-y-2 pl-12">
                    <div>
                      <BodySmallMedium className="text-grey text-xs">
                        Email
                      </BodySmallMedium>
                      <p className="text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                        {counselor.email}
                      </p>
                    </div>
                    <div>
                      <BodySmallMedium className="text-grey text-xs">
                        Phone
                      </BodySmallMedium>
                      <p className="text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                        {counselor.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Child Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-topaz-light rounded-full flex items-center justify-center">
                    <span className="text-topaz-dark font-medium">
                      {child?.fullname?.charAt(0).toUpperCase() || "C"}
                    </span>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey text-xs">
                      Child
                    </BodySmallMedium>
                    <p className="text-sm font-semibold text-neutral-02">
                      {childLoading ? (
                        <span className="inline-block h-4 w-32 bg-grey-stroke/20 rounded animate-pulse"></span>
                      ) : child ? (
                        child.fullname || `Child #${child.childOrder}`
                      ) : (
                        "Unknown Child"
                      )}
                    </p>
                  </div>
                </div>
                {child && (
                  <div className="space-y-2 pl-12">
                    <div>
                      <BodySmallMedium className="text-grey text-xs">
                        Age
                      </BodySmallMedium>
                      <p className="text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                        {child.age} years old
                      </p>
                    </div>
                    <div>
                      <BodySmallMedium className="text-grey text-xs">
                        NIK
                      </BodySmallMedium>
                      <p className="text-sm text-neutral-02 font-mono">
                        {child.nik}
                      </p>
                    </div>
                    <Link
                      href={`/counselor/children/${child._id}`}
                      className="inline-block text-xs text-moss-stone hover:text-moss-stone-dark font-medium"
                    >
                      View Full Profile →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assessment Progress */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <Heading5 className="text-neutral-02 text-base sm:text-lg">
                Assessment Progress
              </Heading5>
              <Link
                href={`/counselor/therapy/${therapyId}/assessments`}
                className="w-full sm:w-auto text-center px-4 py-2 border border-topaz text-topaz-dark rounded-lg text-sm font-medium hover:bg-topaz-light transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Screening */}
              <div className="relative">
                <div
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    screening
                      ? "border-jade bg-jade-light"
                      : "border-topaz bg-topaz-light"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <BodySmallMedium className="text-grey text-xs">
                      Screening
                    </BodySmallMedium>
                    {screening ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-jade-dark shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-topaz-dark shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      screening ? "text-jade-dark" : "text-topaz-dark"
                    }`}
                  >
                    {screening ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>

              {/* Pretest */}
              <div className="relative">
                <div
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    pretest
                      ? "border-jade bg-jade-light"
                      : "border-topaz bg-topaz-light"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <BodySmallMedium className="text-grey text-xs">
                      Pretest
                    </BodySmallMedium>
                    {pretest ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-jade-dark shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-topaz-dark shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      pretest ? "text-jade-dark" : "text-topaz-dark"
                    }`}
                  >
                    {pretest ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>

              {/* Observation */}
              <div className="relative">
                <div
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    observation
                      ? "border-jade bg-jade-light"
                      : "border-topaz bg-topaz-light"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <BodySmallMedium className="text-grey text-xs">
                      Observation
                    </BodySmallMedium>
                    {observation ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-jade-dark shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-topaz-dark shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      observation ? "text-jade-dark" : "text-topaz-dark"
                    }`}
                  >
                    {observation ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>

              {/* Posttest */}
              <div className="relative">
                <div
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    posttest
                      ? "border-jade bg-jade-light"
                      : "border-topaz bg-topaz-light"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <BodySmallMedium className="text-grey text-xs">
                      Posttest
                    </BodySmallMedium>
                    {posttest ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-jade-dark shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-topaz-dark shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      posttest ? "text-jade-dark" : "text-topaz-dark"
                    }`}
                  >
                    {posttest ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Observation */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <Heading5 className="text-neutral-02 text-base sm:text-lg">
                Observation Details
              </Heading5>
              {!observation && canEdit && (
                <Link
                  href={`/counselor/assessments/observation/create?therapyId=${therapyId}`}
                  className="text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium text-center sm:text-left"
                >
                  + Add Observation
                </Link>
              )}
            </div>
            {observationLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-grey-stroke/20 rounded"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-5/6"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-4/6"></div>
              </div>
            ) : observation ? (
              <div className="space-y-4">
                <div className="min-w-0">
                  <BodySmallMedium className="text-grey mb-2 text-xs sm:text-sm">
                    Summary
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 leading-relaxed wrap-break-word whitespace-pre-wrap">
                    {observation.summary}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-grey-stroke">
                  <div className="min-w-0">
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Observation ID
                    </BodySmallMedium>
                    <p className="text-xs text-neutral-02 font-mono truncate">
                      {observation._id}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Created Date
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02">
                      {new Date(observation.createdAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/counselor/assessments/observation/${observation._id}`}
                  className="inline-block mt-2 text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  View Full Observation →
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-grey mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-grey text-xs sm:text-sm mb-4">
                  No observation recorded for this therapy session yet
                </p>
                {canEdit && (
                  <Link
                    href={`/counselor/assessments/observation/create?therapyId=${therapyId}`}
                    className="inline-block w-full sm:w-auto px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-xs sm:text-sm"
                  >
                    Add Observation
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Pretest Details */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <Heading5 className="text-neutral-02 text-base sm:text-lg">
                Pretest (SDQ)
              </Heading5>
              {!pretest && canEdit && (
                <Link
                  href={`/counselor/assessments/pretest/create?therapyId=${therapyId}`}
                  className="text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium text-center sm:text-left"
                >
                  + Add Pretest
                </Link>
              )}
            </div>
            {pretestLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-grey-stroke/20 rounded"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-4/5"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-3/5"></div>
              </div>
            ) : pretest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Emotional Symptoms
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {pretest.emotionalSymptomsScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Conduct Problems
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {pretest.conductProblemScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Hyperactivity
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {pretest.hyperactivityScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Peer Problems
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {pretest.peerProblemScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Prosocial Behaviour
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {pretest.prosocialBehaviourScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Total Difficulties
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-02">
                      {pretest.totalDifficultiesScore}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Interpretation
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                    {pretest.totalPretestInterpretation}
                  </p>
                </div>
                <Link
                  href={`/counselor/assessments/pretest/${pretest._id}`}
                  className="inline-block mt-2 text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  View Full Pretest →
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-grey mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <p className="text-grey text-xs sm:text-sm mb-4">
                  No pretest assessment available yet
                </p>
                {canEdit && (
                  <Link
                    href={`/counselor/assessments/pretest/create?therapyId=${therapyId}`}
                    className="inline-block w-full sm:w-auto px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-xs sm:text-sm"
                  >
                    Add Pretest
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Posttest Details */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <Heading5 className="text-neutral-02 text-base sm:text-lg">
                Posttest (SDQ)
              </Heading5>
              {!posttest && canEdit && (
                <Link
                  href={`/counselor/assessments/posttest/create?therapyId=${therapyId}`}
                  className="text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium text-center sm:text-left"
                >
                  + Add Posttest
                </Link>
              )}
            </div>
            {posttestLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-grey-stroke/20 rounded"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-4/5"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-3/5"></div>
              </div>
            ) : posttest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Emotional Symptoms
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {posttest.emotionalSymptomsScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Conduct Problems
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {posttest.conductProblemScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Hyperactivity
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {posttest.hyperactivityScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Peer Problems
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {posttest.peerProblemScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Prosocial Behaviour
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                      {posttest.prosocialBehaviourScore}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1 text-xs">
                      Total Difficulties
                    </BodySmallMedium>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-02">
                      {posttest.totalDifficultiesScore}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Interpretation
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                    {posttest.totalPosttestInterpretation}
                  </p>
                </div>
                {pretest && (
                  <div className="pt-4 border-t border-grey-stroke">
                    <BodySmallMedium className="text-grey mb-2 text-xs">
                      Progress Comparison
                    </BodySmallMedium>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-neutral-02">
                        Total Difficulties:
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          posttest.totalDifficultiesScore <
                          pretest.totalDifficultiesScore
                            ? "text-green-600"
                            : posttest.totalDifficultiesScore >
                              pretest.totalDifficultiesScore
                            ? "text-red-600"
                            : "text-grey"
                        }`}
                      >
                        {pretest.totalDifficultiesScore} →{" "}
                        {posttest.totalDifficultiesScore} (
                        {posttest.totalDifficultiesScore -
                          pretest.totalDifficultiesScore >
                        0
                          ? "+"
                          : ""}
                        {posttest.totalDifficultiesScore -
                          pretest.totalDifficultiesScore}
                        )
                      </span>
                    </div>
                  </div>
                )}
                <Link
                  href={`/counselor/assessments/posttest/${posttest._id}`}
                  className="inline-block mt-2 text-xs sm:text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  View Full Posttest →
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-grey mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6"
                  />
                </svg>
                <p className="text-grey text-xs sm:text-sm mb-4">
                  No posttest assessment available yet
                </p>
                {canEdit && (
                  <Link
                    href={`/counselor/assessments/posttest/create?therapyId=${therapyId}`}
                    className="inline-block w-full sm:w-auto px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-xs sm:text-sm"
                  >
                    Add Posttest
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Screening (DASS) */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <Heading5 className="text-neutral-02 text-base sm:text-lg">
                Screening (DASS)
              </Heading5>
            </div>
            {screeningLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-grey-stroke/20 rounded"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-4/5"></div>
                <div className="h-4 bg-grey-stroke/20 rounded w-3/5"></div>
              </div>
            ) : screening ? (
              <div className="space-y-3">
                <div>
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Depression
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                    {screening.depressionScore} -{" "}
                    {screening.depressionInterpretation}
                  </p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Anxiety
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                    {screening.anxietyScore} - {screening.anxietyInterpretation}
                  </p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Stress
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                    {screening.stressScore} - {screening.stressInterpretation}
                  </p>
                </div>
                <div className="pt-3 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1 text-xs">
                    Total Score
                  </BodySmallMedium>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-02 wrap-break-word overflow-wrap-anywhere min-w-0">
                    {screening.totalScreeningScore} -{" "}
                    {screening.totalScreeningInterpretation}
                  </p>
                </div>
                <Link
                  href={`/counselor/assessments/screening/${screening._id}`}
                  className="inline-block mt-2 text-xs text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  View Details →
                </Link>
              </div>
            ) : (
              <div className="text-center py-4 sm:py-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-grey mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-grey text-xs mb-3">No screening yet</p>
                {canEdit && (
                  <Link
                    href={`/counselor/assessments/screening/create?therapyId=${therapyId}`}
                    className="inline-block w-full sm:w-auto px-3 py-1.5 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-xs text-center"
                  >
                    Add Screening
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <Heading5 className="text-neutral-02 mb-4 text-base sm:text-lg">
              Quick Actions
            </Heading5>
            {canEdit ? (
              <div className="space-y-2">
                {/* Screening */}
                {!screening && (
                  <Link
                    href={`/counselor/assessments/screening/create?therapyId=${therapyId}`}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-left border border-moss-stone text-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Screening (DASS)</span>
                  </Link>
                )}

                {/* Pretest */}
                {!pretest && (
                  <Link
                    href={`/counselor/assessments/pretest/create?therapyId=${therapyId}`}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-left border border-moss-stone text-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Pretest (SDQ)</span>
                  </Link>
                )}

                {/* Observation */}
                {!observation && (
                  <Link
                    href={`/counselor/assessments/observation/create?therapyId=${therapyId}`}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-left border border-moss-stone text-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Observation</span>
                  </Link>
                )}

                {/* Posttest */}
                {!posttest && (
                  <Link
                    href={`/counselor/assessments/posttest/create?therapyId=${therapyId}`}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-left border border-moss-stone text-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Posttest (SDQ)</span>
                  </Link>
                )}

                {/* Divider if there are assessments to add */}
                {(!screening || !pretest || !observation || !posttest) && (
                  <div className="border-t border-grey-stroke my-2"></div>
                )}

                {/* View All Assessments */}
                <Link
                  href={`/counselor/therapy/${therapyId}/assessments`}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-center justify-center border border-grey-stroke text-neutral-02 rounded-lg hover:bg-grey-stroke/10 transition-colors"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
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
                  <span>View All Assessments</span>
                </Link>
              </div>
            ) : (
              <div className="text-center py-4 sm:py-6">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-grey mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <p className="text-grey text-xs sm:text-sm mb-2">
                  View Only Mode
                </p>
                <p className="text-grey text-xs">
                  Only the counselor who created this session can add
                  assessments
                </p>
              </div>
            )}
          </div>

          {/* Session Info */}
          <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
            <Heading5 className="text-neutral-02 mb-4 text-base sm:text-lg">
              Session Info
            </Heading5>
            <div className="space-y-3">
              <div>
                <BodySmallMedium className="text-grey mb-1 text-xs">
                  Session ID
                </BodySmallMedium>
                <p className="text-xs text-neutral-02 font-mono truncate">
                  {therapy._id}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey mb-1 text-xs">
                  Created At
                </BodySmallMedium>
                <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                  {new Date(therapy.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey mb-1 text-xs">
                  Last Updated
                </BodySmallMedium>
                <p className="text-xs sm:text-sm text-neutral-02 wrap-break-word overflow-wrap-anywhere">
                  {new Date(therapy.updatedAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

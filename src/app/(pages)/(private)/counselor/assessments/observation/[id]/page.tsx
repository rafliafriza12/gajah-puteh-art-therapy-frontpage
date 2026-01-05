"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useObservation,
  useTherapy,
  useChild,
  useDeleteObservation,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { Modal } from "@/components/molecules/Modal";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function ObservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const observationId = params.id as string;

  const { data: observation, isLoading: observationLoading } =
    useObservation(observationId);
  const { data: therapy } = useTherapy(observation?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteObservation, isPending: isDeleting } =
    useDeleteObservation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  const handleDelete = () => {
    deleteObservation(observationId, {
      onSuccess: () => {
        toast.success("Observation deleted successfully");
        router.push("/counselor/assessments/observation");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to delete observation"
        );
      },
    });
  };

  if (observationLoading) {
    return (
      <div className="">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!observation) {
    return (
      <div className="">
        <div className="text-center py-12">
          <p className="text-grey mb-4">Observation not found</p>
          <Link
            href="/counselor/assessments/observation"
            className="text-moss-stone hover:text-moss-stone-dark font-medium"
          >
            ← Back to Observations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark mb-4"
      >
        <svg
          className="w-5 h-5 mr-1"
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
        Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between flex-col gap-4 md:flex-row mb-6 w-full md:w-auto">
        <div>
          <Heading3 className="text-neutral-02">Observation Detail</Heading3>
          <p className="text-grey mt-2">
            {canEdit
              ? "View and manage therapy observations"
              : "View therapy observations (Read-only)"}
          </p>
        </div>
        {canEdit && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/counselor/assessments/observation/${observationId}/edit`}
              className="px-4 py-2 w-full md:w-auto bg-moss-stone text-white text-center rounded-lg hover:bg-moss-stone-dark transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 w-full md:w-auto bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Observation"
      >
        <div className="space-y-4">
          <p className="text-grey">
            Are you sure you want to delete this observation? This action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-grey hover:text-neutral-02 transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors disabled:bg-grey disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Child Info */}
      {child && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>Child:</strong> {child.fullname}
          </p>
        </div>
      )}

      {/* Session Observations */}
      <div className="space-y-6">
        {/* Session 1 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 1</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionOne || "-"}
          </p>
        </div>

        {/* Session 2 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 2</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionTwo || "-"}
          </p>
        </div>

        {/* Session 3 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 3</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionThree || "-"}
          </p>
        </div>

        {/* Session 4 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 4</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionFour || "-"}
          </p>
        </div>

        {/* Session 5 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 5</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionFive || "-"}
          </p>
        </div>

        {/* Session 6 */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Session 6</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.sessionSix || "-"}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-moss-stone/5 border border-moss-stone/20 rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-3">Overall Summary</Heading5>
          <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            {observation.summary || "-"}
          </p>
        </div>

        {/* Metadata */}
        <div className="bg-grey-stroke/5 rounded-xl p-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-grey">Created:</span>{" "}
              <span className="text-neutral-02">
                {new Date(observation.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div>
              <span className="text-grey">Last Updated:</span>{" "}
              <span className="text-neutral-02">
                {new Date(observation.updatedAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  usePosttest,
  useTherapy,
  useChild,
  useDeletePosttest,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { Modal } from "@/components/molecules/Modal";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function PosttestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const posttestId = params.id as string;

  const { data: posttest, isLoading: posttestLoading } =
    usePosttest(posttestId);
  const { data: therapy } = useTherapy(posttest?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: deletePosttest, isPending: isDeleting } = useDeletePosttest();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  const handleDelete = () => {
    deletePosttest(posttestId, {
      onSuccess: () => {
        toast.success("Posttest assessment deleted successfully");
        router.push("/counselor/assessments/posttest");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to delete posttest"
        );
      },
    });
  };

  if (posttestLoading) {
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

  if (!posttest) {
    return (
      <div className="">
        <div className="text-center py-12">
          <p className="text-grey mb-4">Posttest assessment not found</p>
          <Link
            href="/counselor/assessments/posttest"
            className="text-moss-stone hover:text-moss-stone-dark font-medium"
          >
            ← Back to Posttests
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
        className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4 flex items-center"
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
        Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between flex-col gap-4 md:flex-row mb-6 w-full md:w-auto">
        <div>
          <Heading3 className="text-neutral-02">
            Posttest Assessment Detail (SDQ)
          </Heading3>
          <p className="text-grey mt-2">
            {canEdit
              ? "View and manage posttest assessment"
              : "View posttest assessment (Read-only)"}
          </p>
        </div>
        {canEdit && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/counselor/assessments/posttest/${posttestId}/edit`}
              className="px-4 py-2 bg-moss-stone text-white w-full md:w-auto text-center rounded-lg hover:bg-moss-stone-dark transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-error text-white w-full md:w-auto text-center rounded-lg hover:bg-error/90 transition-colors"
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
        title="Delete Posttest Assessment"
      >
        <div className="space-y-4">
          <p className="text-grey">
            Are you sure you want to delete this posttest assessment? This
            action cannot be undone.
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

      {/* Assessment Content */}
      <div className="space-y-6">
        {/* Emotional Symptoms */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Emotional Symptoms
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.emotionalSymptomsScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.emotionalSymptomsInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Conduct Problems */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">Conduct Problems</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.conductProblemScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word ">
                {posttest.conductProblemInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Hyperactivity/Inattention */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Hyperactivity / Inattention
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.hyperactivityScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.hyperactivityInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Peer Relationship Problems */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Peer Relationship Problems
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.peerProblemScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.peerProblemInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Prosocial Behaviour */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Prosocial Behaviour
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.prosocialBehaviourScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.prosocialBehaviourInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Difficulties */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Total Difficulties
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Score
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {posttest.totalDifficultiesScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.totalDifficultiesInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Posttest Score */}
        <div className="bg-moss-stone/5 border border-moss-stone/20 rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Total Posttest Score
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Total Score
              </label>
              <p className="text-2xl font-bold text-moss-stone">
                {posttest.totalPosttestScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Overall Interpretation
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {posttest.totalPosttestInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-grey-stroke/5 rounded-xl p-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-grey">Created:</span>{" "}
              <span className="text-neutral-02">
                {new Date(posttest.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div>
              <span className="text-grey">Last Updated:</span>{" "}
              <span className="text-neutral-02">
                {new Date(posttest.updatedAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

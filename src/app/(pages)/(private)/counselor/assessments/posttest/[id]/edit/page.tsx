"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import {
  usePosttest,
  useUpdatePosttest,
  useTherapy,
  useChild,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function EditPosttestPage() {
  const params = useParams();
  const router = useRouter();
  const posttestId = params.id as string;

  const { data: posttest, isLoading } = usePosttest(posttestId);
  const { data: therapy } = useTherapy(posttest?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: updatePosttest, isPending } = useUpdatePosttest();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "You can only edit assessments for your own therapy sessions"
      );
      router.push(`/counselor/assessments/posttest/${posttestId}`);
    }
  }, [therapy, currentUser, canEdit, router, posttestId]);

  const [formData, setFormData] = useState({
    emotionalSymptomsScore: "",
    emotionalSymptomsInterpretation: "",
    conductProblemScore: "",
    conductProblemInterpretation: "",
    hyperactivityScore: "",
    hyperactivityInterpretation: "",
    peerProblemScore: "",
    peerProblemInterpretation: "",
    prosocialBehaviourScore: "",
    prosocialBehaviourInterpretation: "",
    totalDifficultiesScore: "",
    totalDifficultiesInterpretation: "",
    totalPosttestScore: "",
    totalPosttestInterpretation: "",
  });

  // Load existing data when posttest is fetched
  useEffect(() => {
    if (posttest) {
      setFormData({
        emotionalSymptomsScore:
          posttest.emotionalSymptomsScore?.toString() || "",
        emotionalSymptomsInterpretation:
          posttest.emotionalSymptomsInterpretation || "",
        conductProblemScore: posttest.conductProblemScore?.toString() || "",
        conductProblemInterpretation:
          posttest.conductProblemInterpretation || "",
        hyperactivityScore: posttest.hyperactivityScore?.toString() || "",
        hyperactivityInterpretation: posttest.hyperactivityInterpretation || "",
        peerProblemScore: posttest.peerProblemScore?.toString() || "",
        peerProblemInterpretation: posttest.peerProblemInterpretation || "",
        prosocialBehaviourScore:
          posttest.prosocialBehaviourScore?.toString() || "",
        prosocialBehaviourInterpretation:
          posttest.prosocialBehaviourInterpretation || "",
        totalDifficultiesScore:
          posttest.totalDifficultiesScore?.toString() || "",
        totalDifficultiesInterpretation:
          posttest.totalDifficultiesInterpretation || "",
        totalPosttestScore: posttest.totalPosttestScore?.toString() || "",
        totalPosttestInterpretation: posttest.totalPosttestInterpretation || "",
      });
    }
  }, [posttest]);

  // Calculate total posttest score (sum of all scores)
  useEffect(() => {
    const emotional = parseInt(formData.emotionalSymptomsScore) || 0;
    const conduct = parseInt(formData.conductProblemScore) || 0;
    const hyperactivity = parseInt(formData.hyperactivityScore) || 0;
    const peer = parseInt(formData.peerProblemScore) || 0;
    const prosocial = parseInt(formData.prosocialBehaviourScore) || 0;
    const difficulties = parseInt(formData.totalDifficultiesScore) || 0;
    const totalPosttest =
      emotional + conduct + hyperactivity + peer + prosocial + difficulties;

    setFormData((prev) => ({
      ...prev,
      totalPosttestScore: totalPosttest.toString(),
    }));
  }, [
    formData.emotionalSymptomsScore,
    formData.conductProblemScore,
    formData.hyperactivityScore,
    formData.peerProblemScore,
    formData.prosocialBehaviourScore,
    formData.totalDifficultiesScore,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePosttest(
      {
        id: posttestId,
        data: {
          emotionalSymptomsScore: parseInt(formData.emotionalSymptomsScore),
          emotionalSymptomsInterpretation:
            formData.emotionalSymptomsInterpretation,
          conductProblemScore: parseInt(formData.conductProblemScore),
          conductProblemInterpretation: formData.conductProblemInterpretation,
          hyperactivityScore: parseInt(formData.hyperactivityScore),
          hyperactivityInterpretation: formData.hyperactivityInterpretation,
          peerProblemScore: parseInt(formData.peerProblemScore),
          peerProblemInterpretation: formData.peerProblemInterpretation,
          prosocialBehaviourScore: parseInt(formData.prosocialBehaviourScore),
          prosocialBehaviourInterpretation:
            formData.prosocialBehaviourInterpretation,
          totalDifficultiesScore: parseInt(formData.totalDifficultiesScore),
          totalDifficultiesInterpretation:
            formData.totalDifficultiesInterpretation,
          totalPosttestScore: parseInt(formData.totalPosttestScore),
          totalPosttestInterpretation: formData.totalPosttestInterpretation,
        },
      },
      {
        onSuccess: () => {
          toast.success("Posttest assessment updated successfully!");
          router.push(`/counselor/assessments/posttest/${posttestId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update posttest assessment");
        },
      }
    );
  };

  if (isLoading) {
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
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Posttest not found</p>
          <Link
            href="/counselor/assessments/posttest"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Back to Posttest List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
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
        <Heading3 className="text-neutral-02">
          Edit Posttest Assessment (SDQ)
        </Heading3>
        {child && (
          <p className="text-grey mt-2">
            For child:{" "}
            <span className="font-medium text-neutral-02">
              {child.fullname || `Child #${child.childOrder}`}
            </span>
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-grey-stroke rounded-xl p-6 lg:p-8 space-y-6 overflow-x-hidden"
      >
        {/* Emotional Symptoms */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Emotional Symptoms
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="emotionalSymptomsScore"
                value={formData.emotionalSymptomsScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="emotionalSymptomsInterpretation"
                value={formData.emotionalSymptomsInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Conduct Problems */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">Conduct Problems</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="conductProblemScore"
                value={formData.conductProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="conductProblemInterpretation"
                value={formData.conductProblemInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Hyperactivity */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Hyperactivity / Inattention
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="hyperactivityScore"
                value={formData.hyperactivityScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="hyperactivityInterpretation"
                value={formData.hyperactivityInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Peer Problems */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Peer Relationship Problems
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="peerProblemScore"
                value={formData.peerProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="peerProblemInterpretation"
                value={formData.peerProblemInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Prosocial Behaviour */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Prosocial Behaviour
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="prosocialBehaviourScore"
                value={formData.prosocialBehaviourScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="prosocialBehaviourInterpretation"
                value={formData.prosocialBehaviourInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Total Difficulties */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Total Difficulties
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalDifficultiesScore"
                value={formData.totalDifficultiesScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="totalDifficultiesInterpretation"
                value={formData.totalDifficultiesInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Total Posttest Score */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">
            Total Posttest Score
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Posttest Score</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalPosttestScore"
                value={formData.totalPosttestScore}
                readOnly
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg bg-grey-stroke/10 text-neutral-02 font-semibold"
                placeholder="Auto calculated"
              />
              <p className="text-xs text-grey mt-1">
                Includes all scores (difficulties + prosocial)
              </p>
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Total Posttest Interpretation *
                </BodySmallMedium>
              </label>
              <textarea
                name="totalPosttestInterpretation"
                value={formData.totalPosttestInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter overall interpretation"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/counselor/assessments/posttest/${posttestId}`}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center flex items-center justify-center"
          >
            Cancel
          </Link>
          <SubmitButton
            variant="primary"
            text={isPending ? "Saving..." : "Save Changes"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import {
  useScreening,
  useUpdateScreening,
  useTherapy,
  useChild,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function EditScreeningPage() {
  const router = useRouter();
  const params = useParams();
  const screeningId = params.id as string;

  const { data: screening, isLoading } = useScreening(screeningId);
  const { data: therapy } = useTherapy(screening?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: updateScreening, isPending } = useUpdateScreening();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "You can only edit assessments for your own therapy sessions"
      );
      router.push(`/counselor/assessments/screening/${screeningId}`);
    }
  }, [therapy, currentUser, canEdit, router, screeningId]);

  const [formData, setFormData] = useState({
    depressionScore: "",
    depressionInterpretation: "",
    anxietyScore: "",
    anxietyInterpretation: "",
    stressScore: "",
    stressInterpretation: "",
    totalScreeningScore: "",
    totalScreeningInterpretation: "",
  });

  // Load existing data
  useEffect(() => {
    if (screening) {
      setFormData({
        depressionScore: screening.depressionScore.toString(),
        depressionInterpretation: screening.depressionInterpretation,
        anxietyScore: screening.anxietyScore.toString(),
        anxietyInterpretation: screening.anxietyInterpretation,
        stressScore: screening.stressScore.toString(),
        stressInterpretation: screening.stressInterpretation,
        totalScreeningScore: screening.totalScreeningScore.toString(),
        totalScreeningInterpretation: screening.totalScreeningInterpretation,
      });
    }
  }, [screening]);

  // Calculate total score when individual scores change
  useEffect(() => {
    const depression = parseInt(formData.depressionScore) || 0;
    const anxiety = parseInt(formData.anxietyScore) || 0;
    const stress = parseInt(formData.stressScore) || 0;
    const total = depression + anxiety + stress;

    setFormData((prev) => ({
      ...prev,
      totalScreeningScore: total.toString(),
    }));
  }, [formData.depressionScore, formData.anxietyScore, formData.stressScore]);

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

    updateScreening(
      {
        id: screeningId,
        data: {
          depressionScore: parseInt(formData.depressionScore),
          depressionInterpretation: formData.depressionInterpretation,
          anxietyScore: parseInt(formData.anxietyScore),
          anxietyInterpretation: formData.anxietyInterpretation,
          stressScore: parseInt(formData.stressScore),
          stressInterpretation: formData.stressInterpretation,
          totalScreeningScore: parseInt(formData.totalScreeningScore),
          totalScreeningInterpretation: formData.totalScreeningInterpretation,
        },
      },
      {
        onSuccess: () => {
          toast.success("Screening assessment updated successfully!");
          router.push(`/counselor/assessments/screening/${screeningId}`);
        },
        onError: (error: any) => {
          toast.error(
            error?.message || "Failed to update screening assessment"
          );
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

  if (!screening) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Screening not found</p>
          <Link
            href="/counselor/assessments/screening"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
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
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 overflow-x-hidden">
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
          Edit Screening Assessment (DASS)
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
        {/* Depression Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Depression Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Depression Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="depressionScore"
                value={formData.depressionScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter depression score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Depression Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="depressionInterpretation"
                value={formData.depressionInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Anxiety Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Anxiety Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Anxiety Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="anxietyScore"
                value={formData.anxietyScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter anxiety score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Anxiety Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="anxietyInterpretation"
                value={formData.anxietyInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Stress Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Stress Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Stress Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="stressScore"
                value={formData.stressScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter stress score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Stress Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="stressInterpretation"
                value={formData.stressInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation"
              />
            </div>
          </div>
        </div>

        {/* Total Score Section */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">Total Assessment</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Score</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalScreeningScore"
                value={formData.totalScreeningScore}
                readOnly
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg bg-grey-stroke/10 text-neutral-02 font-semibold"
                placeholder="Auto calculated"
              />
              <p className="text-xs text-grey mt-1">
                Auto-calculated from individual scores
              </p>
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Interpretation *</BodySmallMedium>
              </label>
              <textarea
                name="totalScreeningInterpretation"
                value={formData.totalScreeningInterpretation}
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
            href={`/counselor/assessments/screening/${screeningId}`}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center"
          >
            Cancel
          </Link>
          <SubmitButton
            variant="primary"
            text={isPending ? "Updating..." : "Update Screening"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}

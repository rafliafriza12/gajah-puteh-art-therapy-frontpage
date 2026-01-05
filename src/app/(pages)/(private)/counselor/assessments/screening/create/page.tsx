"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import { useCreateScreening, useTherapy, useCurrentUser } from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function CreateScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTherapyId = searchParams.get("therapyId") || "";

  const [selectedTherapyId, setSelectedTherapyId] = useState(initialTherapyId);

  const { data: therapy } = useTherapy(selectedTherapyId);
  const { data: currentUser } = useCurrentUser();
  const { mutate: createScreening, isPending } = useCreateScreening();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "You can only create assessments for your own therapy sessions"
      );
      router.push("/counselor/assessments/screening");
    }
  }, [therapy, currentUser, canEdit, router]);

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

    if (!selectedTherapyId) {
      toast.error("Please select a therapy session");
      return;
    }

    createScreening(
      {
        therapyId: selectedTherapyId,
        depressionScore: parseInt(formData.depressionScore),
        depressionInterpretation: formData.depressionInterpretation,
        anxietyScore: parseInt(formData.anxietyScore),
        anxietyInterpretation: formData.anxietyInterpretation,
        stressScore: parseInt(formData.stressScore),
        stressInterpretation: formData.stressInterpretation,
        totalScreeningScore: parseInt(formData.totalScreeningScore),
        totalScreeningInterpretation: formData.totalScreeningInterpretation,
      },
      {
        onSuccess: () => {
          toast.success("Screening assessment created successfully!");
          router.push(`/counselor/therapy/${selectedTherapyId}`);
        },
        onError: (error: any) => {
          toast.error(
            error?.message || "Failed to create screening assessment"
          );
        },
      }
    );
  };

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
          Create Screening Assessment (DASS-21)
        </Heading3>
        <p className="text-grey mt-2">
          Depression, Anxiety, and Stress Scale - 21 items
        </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
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
                placeholder="Enter interpretation (e.g., Normal, Mild, Moderate, Severe, Extremely Severe)"
              />
            </div>
          </div>
        </div>

        {/* Anxiety Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Anxiety Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
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
                rows={2}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation (e.g., Normal, Mild, Moderate, Severe, Extremely Severe)"
              />
            </div>
          </div>
        </div>

        {/* Stress Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Stress Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
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
                rows={2}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter interpretation (e.g., Normal, Mild, Moderate, Severe, Extremely Severe)"
              />
            </div>
          </div>
        </div>

        {/* Total Score Section */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">Total Assessment</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
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
                rows={2}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter overall interpretation"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center disabled:opacity-50"
          >
            Cancel
          </button>
          <SubmitButton
            variant="primary"
            text={isPending ? "Creating..." : "Create Screening"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending || !selectedTherapyId}
          />
        </div>
      </form>
    </div>
  );
}

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
import { useCreatePretest, useTherapy, useCurrentUser } from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function CreatePretestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTherapyId = searchParams.get("therapyId") || "";

  const [selectedTherapyId, setSelectedTherapyId] = useState(initialTherapyId);

  const { data: therapy } = useTherapy(selectedTherapyId);
  const { data: currentUser } = useCurrentUser();
  const { mutate: createPretest, isPending } = useCreatePretest();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "You can only create assessments for your own therapy sessions"
      );
      router.push("/counselor/assessments/pretest");
    }
  }, [therapy, currentUser, canEdit, router]);

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
    totalPretestScore: "",
    totalPretestInterpretation: "",
  });

  useEffect(() => {
    const emotional = parseInt(formData.emotionalSymptomsScore) || 0;
    const conduct = parseInt(formData.conductProblemScore) || 0;
    const hyperactivity = parseInt(formData.hyperactivityScore) || 0;
    const peer = parseInt(formData.peerProblemScore) || 0;
    const prosocial = parseInt(formData.prosocialBehaviourScore) || 0;
    const difficulties = parseInt(formData.totalDifficultiesScore) || 0;
    const totalPretest =
      emotional + conduct + hyperactivity + peer + prosocial + difficulties;

    setFormData((prev) => ({
      ...prev,
      totalPretestScore: totalPretest.toString(),
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

    if (!selectedTherapyId) {
      toast.error("Please select a therapy session");
      return;
    }

    createPretest(
      {
        therapyId: selectedTherapyId,
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
        totalPretestScore: parseInt(formData.totalPretestScore),
        totalPretestInterpretation: formData.totalPretestInterpretation,
      },
      {
        onSuccess: () => {
          toast.success("Pretest assessment created successfully!");
          router.push(`/counselor/therapy/${selectedTherapyId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to create pretest assessment");
        },
      }
    );
  };

  return (
    <div className=" overflow-x-hidden">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4  flex items-center"
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
          Create Pretest Assessment (SDQ)
        </Heading3>
        <p className="text-grey mt-2">
          Strengths and Difficulties Questionnaire - Baseline Assessment
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-grey-stroke rounded-xl p-6 lg:p-8 space-y-6 overflow-x-hidden"
      >
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Emotional Symptoms
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Emotional Symptoms Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="emotionalSymptomsScore"
                value={formData.emotionalSymptomsScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter emotional symptoms score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Emotional Symptoms Interpretation *
                </BodySmallMedium>
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

        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">Conduct Problems</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Conduct Problem Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="conductProblemScore"
                value={formData.conductProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter conduct problem score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Conduct Problem Interpretation *
                </BodySmallMedium>
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

        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Hyperactivity/Inattention
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Hyperactivity Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="hyperactivityScore"
                value={formData.hyperactivityScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter hyperactivity score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Hyperactivity Interpretation *
                </BodySmallMedium>
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

        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Peer Relationship Problems
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Peer Problem Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="peerProblemScore"
                value={formData.peerProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter peer problem score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Peer Problem Interpretation *</BodySmallMedium>
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

        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Prosocial Behaviour
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Prosocial Behaviour Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="prosocialBehaviourScore"
                value={formData.prosocialBehaviourScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter prosocial behaviour score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Prosocial Behaviour Interpretation *
                </BodySmallMedium>
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

        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Total Difficulties Score
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Difficulties Score *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalDifficultiesScore"
                value={formData.totalDifficultiesScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Enter total difficulties score"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>
                  Total Difficulties Interpretation *
                </BodySmallMedium>
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

        <div>
          <Heading5 className="text-neutral-02 mb-4">
            Total Pretest Assessment
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Pretest Score</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalPretestScore"
                value={formData.totalPretestScore}
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
                <BodySmallMedium>
                  Total Pretest Interpretation *
                </BodySmallMedium>
              </label>
              <textarea
                name="totalPretestInterpretation"
                value={formData.totalPretestInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter overall interpretation"
              />
            </div>
          </div>
        </div>

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
            text={isPending ? "Creating..." : "Create Pretest"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending || !selectedTherapyId}
          />
        </div>
      </form>
    </div>
  );
}

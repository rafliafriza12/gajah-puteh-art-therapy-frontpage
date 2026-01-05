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
  useObservation,
  useUpdateObservation,
  useTherapy,
  useChild,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function EditObservationPage() {
  const params = useParams();
  const router = useRouter();
  const observationId = params.id as string;

  const { data: observation, isLoading } = useObservation(observationId);
  const { data: therapy } = useTherapy(observation?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: updateObservation, isPending } = useUpdateObservation();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "You can only edit assessments for your own therapy sessions"
      );
      router.push(`/counselor/assessments/observation/${observationId}`);
    }
  }, [therapy, currentUser, canEdit, router, observationId]);

  const [formData, setFormData] = useState({
    sessionOne: "",
    sessionTwo: "",
    sessionThree: "",
    sessionFour: "",
    sessionFive: "",
    sessionSix: "",
    summary: "",
  });

  // Load existing data when observation is fetched
  useEffect(() => {
    if (observation) {
      setFormData({
        sessionOne: observation.sessionOne || "",
        sessionTwo: observation.sessionTwo || "",
        sessionThree: observation.sessionThree || "",
        sessionFour: observation.sessionFour || "",
        sessionFive: observation.sessionFive || "",
        sessionSix: observation.sessionSix || "",
        summary: observation.summary || "",
      });
    }
  }, [observation]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.summary.trim()) {
      toast.error("Observation summary is required");
      return;
    }

    updateObservation(
      {
        id: observationId,
        data: {
          sessionOne: formData.sessionOne.trim(),
          sessionTwo: formData.sessionTwo.trim(),
          sessionThree: formData.sessionThree.trim(),
          sessionFour: formData.sessionFour.trim(),
          sessionFive: formData.sessionFive.trim(),
          sessionSix: formData.sessionSix.trim(),
          summary: formData.summary.trim(),
        },
      },
      {
        onSuccess: () => {
          toast.success("Observation updated successfully!");
          router.push(`/counselor/assessments/observation/${observationId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update observation");
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

  if (!observation) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Observation not found</p>
          <Link
            href="/counselor/assessments/observation"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Back to Observations
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
        <Heading3 className="text-neutral-02">Edit Observation</Heading3>
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
        {/* Session Notes */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">Session Notes</Heading5>
          <div className="space-y-4">
            {/* Session 1 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 1 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionOne"
                value={formData.sessionOne}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 1..."
              />
            </div>

            {/* Session 2 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 2 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionTwo"
                value={formData.sessionTwo}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 2..."
              />
            </div>

            {/* Session 3 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 3 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionThree"
                value={formData.sessionThree}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 3..."
              />
            </div>

            {/* Session 4 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 4 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionFour"
                value={formData.sessionFour}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 4..."
              />
            </div>

            {/* Session 5 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 5 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionFive"
                value={formData.sessionFive}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 5..."
              />
            </div>

            {/* Session 6 */}
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Session 6 *</BodySmallMedium>
              </label>
              <textarea
                name="sessionSix"
                value={formData.sessionSix}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Enter observations for session 6..."
              />
            </div>
          </div>
        </div>

        {/* Overall Summary */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">Overall Summary</Heading5>
          <div>
            <label className="block mb-2">
              <BodySmallMedium>Summary *</BodySmallMedium>
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
              placeholder="Enter comprehensive summary of all sessions...&#10;&#10;Include:&#10;- Overall progress throughout the sessions&#10;- Pattern of behaviors and responses&#10;- Major improvements or concerns&#10;- Recommendations for future therapy"
            />
            <p className="text-xs text-grey mt-2">
              Provide a comprehensive summary that synthesizes observations from
              all six sessions.
            </p>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Heading5 className="text-blue-900 mb-2 text-sm">
            Observation Guidelines
          </Heading5>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>Be objective and factual in your observations</li>
            <li>Include specific examples of behaviors or responses</li>
            <li>Note the context and situations when behaviors occurred</li>
            <li>Document both positive progress and areas needing attention</li>
            <li>Use clear, professional language</li>
            <li>Maintain confidentiality and respect for the child</li>
          </ul>
        </div>

        {/* Child Context (if available) */}
        {child && (
          <div className="bg-grey-stroke/5 border border-grey-stroke rounded-lg p-4">
            <Heading5 className="text-neutral-02 mb-3 text-sm">
              Child Information
            </Heading5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <BodySmallMedium className="text-grey text-xs mb-1">
                  Name
                </BodySmallMedium>
                <p className="text-neutral-02">
                  {child.fullname || `Child #${child.childOrder}`}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey text-xs mb-1">
                  Age
                </BodySmallMedium>
                <p className="text-neutral-02">{child.age} years old</p>
              </div>
              <div>
                <BodySmallMedium className="text-grey text-xs mb-1">
                  Education
                </BodySmallMedium>
                <p className="text-neutral-02">
                  {child.education.stage} - Class {child.education.class}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey text-xs mb-1">
                  NIK
                </BodySmallMedium>
                <p className="text-neutral-02 truncate font-mono text-xs">
                  {child.nik}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/counselor/assessments/observation/${observationId}`}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center"
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

"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import {
  useTherapy,
  useChild,
  useObservationByTherapy,
  useScreeningByTherapy,
  usePretestByTherapy,
  usePosttestByTherapy,
  useCurrentUser,
} from "@/services";
import { canEditTherapyAssessment } from "@/libs/authorization";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Assessment {
  id: string;
  type: "screening" | "pretest" | "observation" | "posttest";
  title: string;
  description: string;
  status: "completed" | "pending";
  createdAt?: string;
  link: string;
  data?: any;
  preview?: {
    label: string;
    value: string;
  }[];
}

export default function TherapyAssessmentsPage() {
  const params = useParams();
  const therapyId = params.id as string;

  const { data: therapy, isLoading: therapyLoading } = useTherapy(therapyId);
  const { data: child, isLoading: childLoading } = useChild(
    therapy?.childId || ""
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

  const isLoading =
    therapyLoading ||
    childLoading ||
    observationLoading ||
    screeningLoading ||
    pretestLoading ||
    posttestLoading;

  // Check if current user can edit this therapy's assessments
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Build assessments array with preview data
  const assessments: Assessment[] = [
    {
      id: screening?._id || "screening",
      type: "screening",
      title: "Screening (DASS-21)",
      description: "Depression, Anxiety, and Stress Scale",
      status: screening ? "completed" : "pending",
      createdAt: screening?.createdAt,
      link: screening
        ? `/counselor/assessments/screening/${screening._id}`
        : `/counselor/assessments/screening/create?therapyId=${therapyId}`,
      data: screening,
      preview: screening
        ? [
            {
              label: "Depression Score",
              value: `${screening.depressionScore}`,
            },
            {
              label: "Depression Interpretation",
              value: screening.depressionInterpretation,
            },
            {
              label: "Anxiety Score",
              value: `${screening.anxietyScore}`,
            },
            {
              label: "Anxiety Interpretation",
              value: screening.anxietyInterpretation,
            },
            {
              label: "Stress Score",
              value: `${screening.stressScore}`,
            },
            {
              label: "Stress Interpretation",
              value: screening.stressInterpretation,
            },
            {
              label: "Total Screening Score",
              value: `${screening.totalScreeningScore}`,
            },
            {
              label: "Total Screening Interpretation",
              value: screening.totalScreeningInterpretation,
            },
          ]
        : undefined,
    },
    {
      id: pretest?._id || "pretest",
      type: "pretest",
      title: "Pretest (SDQ)",
      description: "Strengths and Difficulties Questionnaire",
      status: pretest ? "completed" : "pending",
      createdAt: pretest?.createdAt,
      link: pretest
        ? `/counselor/assessments/pretest/${pretest._id}`
        : `/counselor/assessments/pretest/create?therapyId=${therapyId}`,
      data: pretest,
      preview: pretest
        ? [
            {
              label: "Total Difficulties Score",
              value: `${pretest.totalDifficultiesScore}`,
            },
            {
              label: "Total Difficulties Interpretation",
              value: pretest.totalDifficultiesInterpretation,
            },
            {
              label: "Emotional Symptoms Score",
              value: `${pretest.emotionalSymptomsScore}`,
            },
            {
              label: "Emotional Symptoms Interpretation",
              value: pretest.emotionalSymptomsInterpretation,
            },
            {
              label: "Conduct Problem Score",
              value: `${pretest.conductProblemScore}`,
            },
            {
              label: "Conduct Problem Interpretation",
              value: pretest.conductProblemInterpretation,
            },
            {
              label: "Hyperactivity Score",
              value: `${pretest.hyperactivityScore}`,
            },
            {
              label: "Hyperactivity Interpretation",
              value: pretest.hyperactivityInterpretation,
            },
            {
              label: "Peer Problem Score",
              value: `${pretest.peerProblemScore}`,
            },
            {
              label: "Peer Problem Interpretation",
              value: pretest.peerProblemInterpretation,
            },
            {
              label: "Prosocial Behaviour Score",
              value: `${pretest.prosocialBehaviourScore}`,
            },
            {
              label: "Prosocial Behaviour Interpretation",
              value: pretest.prosocialBehaviourInterpretation,
            },
            {
              label: "Total Pretest Score",
              value: `${pretest.totalPretestScore}`,
            },
            {
              label: "Total Pretest Interpretation",
              value: pretest.totalPretestInterpretation,
            },
          ]
        : undefined,
    },
    {
      id: observation?._id || "observation",
      type: "observation",
      title: "Observation",
      description: "Therapy session observation notes",
      status: observation ? "completed" : "pending",
      createdAt: observation?.createdAt,
      link: observation
        ? `/counselor/assessments/observation/${observation._id}`
        : `/counselor/assessments/observation/create?therapyId=${therapyId}`,
      data: observation,
      preview: observation
        ? [
            {
              label: "Session 1",
              value:
                observation.sessionOne?.substring(0, 150) +
                (observation.sessionOne?.length > 150 ? "..." : ""),
            },
            {
              label: "Session 2",
              value:
                observation.sessionTwo?.substring(0, 150) +
                (observation.sessionTwo?.length > 150 ? "..." : ""),
            },
            {
              label: "Session 3",
              value:
                observation.sessionThree?.substring(0, 150) +
                (observation.sessionThree?.length > 150 ? "..." : ""),
            },
            {
              label: "Session 4",
              value:
                observation.sessionFour?.substring(0, 150) +
                (observation.sessionFour?.length > 150 ? "..." : ""),
            },
            {
              label: "Session 5",
              value:
                observation.sessionFive?.substring(0, 150) +
                (observation.sessionFive?.length > 150 ? "..." : ""),
            },
            {
              label: "Session 6",
              value:
                observation.sessionSix?.substring(0, 150) +
                (observation.sessionSix?.length > 150 ? "..." : ""),
            },
            {
              label: "Summary",
              value:
                observation.summary?.substring(0, 150) +
                (observation.summary?.length > 150 ? "..." : ""),
            },
          ]
        : undefined,
    },
    {
      id: posttest?._id || "posttest",
      type: "posttest",
      title: "Posttest (SDQ)",
      description: "Post-therapy assessment",
      status: posttest ? "completed" : "pending",
      createdAt: posttest?.createdAt,
      link: posttest
        ? `/counselor/assessments/posttest/${posttest._id}`
        : `/counselor/assessments/posttest/create?therapyId=${therapyId}`,
      data: posttest,
      preview: posttest
        ? [
            {
              label: "Total Difficulties Score",
              value: `${posttest.totalDifficultiesScore}`,
            },
            {
              label: "Total Difficulties Interpretation",
              value: posttest.totalDifficultiesInterpretation,
            },
            {
              label: "Emotional Symptoms Score",
              value: `${posttest.emotionalSymptomsScore}`,
            },
            {
              label: "Emotional Symptoms Interpretation",
              value: posttest.emotionalSymptomsInterpretation,
            },
            {
              label: "Conduct Problem Score",
              value: `${posttest.conductProblemScore}`,
            },
            {
              label: "Conduct Problem Interpretation",
              value: posttest.conductProblemInterpretation,
            },
            {
              label: "Hyperactivity Score",
              value: `${posttest.hyperactivityScore}`,
            },
            {
              label: "Hyperactivity Interpretation",
              value: posttest.hyperactivityInterpretation,
            },
            {
              label: "Peer Problem Score",
              value: `${posttest.peerProblemScore}`,
            },
            {
              label: "Peer Problem Interpretation",
              value: posttest.peerProblemInterpretation,
            },
            {
              label: "Prosocial Behaviour Score",
              value: `${posttest.prosocialBehaviourScore}`,
            },
            {
              label: "Prosocial Behaviour Interpretation",
              value: posttest.prosocialBehaviourInterpretation,
            },
            {
              label: "Total Posttest Score",
              value: `${posttest.totalPosttestScore}`,
            },
            {
              label: "Total Posttest Interpretation",
              value: posttest.totalPosttestInterpretation,
            },
          ]
        : undefined,
    },
  ];

  const completedAssessments = assessments.filter(
    (a) => a.status === "completed"
  ).length;
  const totalAssessments = assessments.length;

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not completed";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="">
      {/* Back Button */}
      <Link
        href={`/counselor/therapy/${therapyId}`}
        className="inline-flex items-center text-grey hover:text-neutral-02 text-sm mb-4 sm:mb-6 group"
      >
        <svg
          className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
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
        Back to Therapy Session
      </Link>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Heading3 className="text-neutral-02 mb-2 text-xl sm:text-2xl lg:text-3xl">
          All Assessments
        </Heading3>
        {childLoading ? (
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
        ) : (
          <p className="text-grey text-sm sm:text-base">
            Therapy session for{" "}
            <span className="font-medium text-neutral-02">
              {child?.fullname || "Child"}
            </span>
            <span className="hidden sm:inline">{" • "}</span>
            <span className="block sm:inline text-sm mt-1 sm:mt-0">
              {completedAssessments}/{totalAssessments} completed
            </span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4 sm:space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-neutral-01 border border-grey-stroke rounded-lg p-4 sm:p-6 animate-pulse"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div className="flex-1 w-full">
                  <div className="h-6 bg-gray-200 rounded w-full sm:w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full sm:w-64"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-full sm:w-32"></div>
              </div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Assessment List */}
      {!isLoading && (
        <div className="space-y-4">
          {assessments.map((assessment, index) => (
            <div
              key={assessment.id}
              className="bg-neutral-01 border border-grey-stroke rounded-lg p-4 sm:p-6 hover:border-moss-stone transition-colors overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div className="flex-1 w-full">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <span className="text-grey font-medium text-sm shrink-0">
                      {index + 1}.
                    </span>
                    <Heading5 className="text-neutral-02 text-base sm:text-lg">
                      {assessment.title}
                    </Heading5>
                    {assessment.status === "completed" && (
                      <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded whitespace-nowrap">
                        <svg
                          className="w-3 h-3 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-grey pl-0 sm:pl-8">
                    {assessment.description}
                  </p>
                  {assessment.createdAt && (
                    <p className="text-xs text-grey pl-0 sm:pl-8 mt-1">
                      {formatDate(assessment.createdAt)}
                    </p>
                  )}
                </div>
                {assessment.status === "completed" ? (
                  <Link
                    href={assessment.link}
                    className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-moss-stone text-neutral-01 hover:bg-moss-stone/90 text-center"
                  >
                    View
                  </Link>
                ) : canEdit ? (
                  <Link
                    href={assessment.link}
                    className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-grey-stroke text-neutral-02 hover:border-moss-stone hover:text-moss-stone text-center"
                  >
                    Create
                  </Link>
                ) : (
                  <span className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-grey bg-grey-stroke/30 cursor-not-allowed text-center">
                    Not Available
                  </span>
                )}
              </div>

              {/* Preview Content */}
              {assessment.preview && assessment.preview.length > 0 && (
                <div className="border-t border-grey-stroke pt-4 pl-0 sm:pl-8">
                  <div className="space-y-2">
                    {assessment.preview.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3 text-sm min-w-0"
                      >
                        <span className="text-grey w-full sm:w-[180px] sm:shrink-0 font-medium sm:font-normal">
                          {item.label}:
                        </span>
                        <span className="text-neutral-02 font-medium wrap-break-word whitespace-pre-wrap w-full min-w-0">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State for Pending */}
              {assessment.status === "pending" && (
                <div className="border-t border-grey-stroke pt-4 pl-0 sm:pl-8">
                  <p className="text-sm text-grey italic">
                    Assessment not yet completed
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 sm:mt-8 bg-grey-lightest border border-grey-stroke rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-grey shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-neutral-02 font-medium mb-1">
              Assessment Order
            </p>
            <p className="text-xs sm:text-sm text-grey">
              Complete assessments in sequence: Screening → Pretest →
              Observation → Posttest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

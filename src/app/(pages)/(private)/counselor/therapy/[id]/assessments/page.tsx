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
      description: "Skala Depresi, Kecemasan, dan Stres",
      status: screening ? "completed" : "pending",
      createdAt: screening?.createdAt,
      link: screening
        ? `/counselor/assessments/screening/${screening._id}`
        : `/counselor/assessments/screening/create?therapyId=${therapyId}`,
      data: screening,
      preview: screening
        ? [
            {
              label: "Skor Depresi",
              value: `${screening.depressionScore}`,
            },
            {
              label: "Interpretasi Depresi",
              value: screening.depressionInterpretation,
            },
            {
              label: "Skor Kecemasan",
              value: `${screening.anxietyScore}`,
            },
            {
              label: "Interpretasi Kecemasan",
              value: screening.anxietyInterpretation,
            },
            {
              label: "Skor Stres",
              value: `${screening.stressScore}`,
            },
            {
              label: "Interpretasi Stres",
              value: screening.stressInterpretation,
            },
            {
              label: "Total Skor Screening",
              value: `${screening.totalScreeningScore}`,
            },
            {
              label: "Interpretasi Total Screening",
              value: screening.totalScreeningInterpretation,
            },
          ]
        : undefined,
    },
    {
      id: pretest?._id || "pretest",
      type: "pretest",
      title: "Pretest (SDQ)",
      description: "Kuesioner Kekuatan dan Kesulitan",
      status: pretest ? "completed" : "pending",
      createdAt: pretest?.createdAt,
      link: pretest
        ? `/counselor/assessments/pretest/${pretest._id}`
        : `/counselor/assessments/pretest/create?therapyId=${therapyId}`,
      data: pretest,
      preview: pretest
        ? [
            {
              label: "Skor Total Kesulitan",
              value: `${pretest.totalDifficultiesScore}`,
            },
            {
              label: "Interpretasi Total Kesulitan",
              value: pretest.totalDifficultiesInterpretation,
            },
            {
              label: "Skor Gejala Emosional",
              value: `${pretest.emotionalSymptomsScore}`,
            },
            {
              label: "Interpretasi Gejala Emosional",
              value: pretest.emotionalSymptomsInterpretation,
            },
            {
              label: "Skor Masalah Perilaku",
              value: `${pretest.conductProblemScore}`,
            },
            {
              label: "Interpretasi Masalah Perilaku",
              value: pretest.conductProblemInterpretation,
            },
            {
              label: "Skor Hiperaktivitas",
              value: `${pretest.hyperactivityScore}`,
            },
            {
              label: "Interpretasi Hiperaktivitas",
              value: pretest.hyperactivityInterpretation,
            },
            {
              label: "Skor Masalah Hubungan Sebaya",
              value: `${pretest.peerProblemScore}`,
            },
            {
              label: "Interpretasi Masalah Hubungan Sebaya",
              value: pretest.peerProblemInterpretation,
            },
            {
              label: "Skor Perilaku Prososial",
              value: `${pretest.prosocialBehaviourScore}`,
            },
            {
              label: "Interpretasi Perilaku Prososial",
              value: pretest.prosocialBehaviourInterpretation,
            },
            {
              label: "Total Skor Pretest",
              value: `${pretest.totalPretestScore}`,
            },
            {
              label: "Interpretasi Total Pretest",
              value: pretest.totalPretestInterpretation,
            },
          ]
        : undefined,
    },
    {
      id: observation?._id || "observation",
      type: "observation",
      title: "Observasi",
      description: "Catatan observasi sesi terapi",
      status: observation ? "completed" : "pending",
      createdAt: observation?.createdAt,
      link: observation
        ? `/counselor/assessments/observation/${observation._id}`
        : `/counselor/assessments/observation/create?therapyId=${therapyId}`,
      data: observation,
      preview: observation
        ? [
            {
              label: "Sesi 1",
              value:
                observation.sessionOne?.substring(0, 150) +
                (observation.sessionOne?.length > 150 ? "..." : ""),
            },
            {
              label: "Sesi 2",
              value:
                observation.sessionTwo?.substring(0, 150) +
                (observation.sessionTwo?.length > 150 ? "..." : ""),
            },
            {
              label: "Sesi 3",
              value:
                observation.sessionThree?.substring(0, 150) +
                (observation.sessionThree?.length > 150 ? "..." : ""),
            },
            {
              label: "Sesi 4",
              value:
                observation.sessionFour?.substring(0, 150) +
                (observation.sessionFour?.length > 150 ? "..." : ""),
            },
            {
              label: "Sesi 5",
              value:
                observation.sessionFive?.substring(0, 150) +
                (observation.sessionFive?.length > 150 ? "..." : ""),
            },
            {
              label: "Sesi 6",
              value:
                observation.sessionSix?.substring(0, 150) +
                (observation.sessionSix?.length > 150 ? "..." : ""),
            },
            {
              label: "Ringkasan",
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
      description: "Asesmen pasca terapi",
      status: posttest ? "completed" : "pending",
      createdAt: posttest?.createdAt,
      link: posttest
        ? `/counselor/assessments/posttest/${posttest._id}`
        : `/counselor/assessments/posttest/create?therapyId=${therapyId}`,
      data: posttest,
      preview: posttest
        ? [
            {
              label: "Skor Total Kesulitan",
              value: `${posttest.totalDifficultiesScore}`,
            },
            {
              label: "Interpretasi Total Kesulitan",
              value: posttest.totalDifficultiesInterpretation,
            },
            {
              label: "Skor Gejala Emosional",
              value: `${posttest.emotionalSymptomsScore}`,
            },
            {
              label: "Interpretasi Gejala Emosional",
              value: posttest.emotionalSymptomsInterpretation,
            },
            {
              label: "Skor Masalah Perilaku",
              value: `${posttest.conductProblemScore}`,
            },
            {
              label: "Interpretasi Masalah Perilaku",
              value: posttest.conductProblemInterpretation,
            },
            {
              label: "Skor Hiperaktivitas",
              value: `${posttest.hyperactivityScore}`,
            },
            {
              label: "Interpretasi Hiperaktivitas",
              value: posttest.hyperactivityInterpretation,
            },
            {
              label: "Skor Masalah Hubungan Sebaya",
              value: `${posttest.peerProblemScore}`,
            },
            {
              label: "Interpretasi Masalah Hubungan Sebaya",
              value: posttest.peerProblemInterpretation,
            },
            {
              label: "Skor Perilaku Prososial",
              value: `${posttest.prosocialBehaviourScore}`,
            },
            {
              label: "Interpretasi Perilaku Prososial",
              value: posttest.prosocialBehaviourInterpretation,
            },
            {
              label: "Total Skor Posttest",
              value: `${posttest.totalPosttestScore}`,
            },
            {
              label: "Interpretasi Total Posttest",
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
    if (!dateString) return "Belum selesai";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
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
        Kembali ke Sesi Terapi
      </Link>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Heading3 className="text-neutral-02 mb-2 text-xl sm:text-2xl lg:text-3xl">
          Semua Asesmen
        </Heading3>
        {childLoading ? (
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
        ) : (
          <p className="text-grey text-sm sm:text-base">
            Sesi terapi untuk{" "}
            <span className="font-medium text-neutral-02">
              {child?.fullname || "Anak"}
            </span>
            <span className="hidden sm:inline">{" • "}</span>
            <span className="block sm:inline text-sm mt-1 sm:mt-0">
              {completedAssessments}/{totalAssessments} selesai
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
                        Selesai
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
                    Lihat
                  </Link>
                ) : canEdit ? (
                  <Link
                    href={assessment.link}
                    className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-grey-stroke text-neutral-02 hover:border-moss-stone hover:text-moss-stone text-center"
                  >
                    Buat
                  </Link>
                ) : (
                  <span className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-grey bg-grey-stroke/30 cursor-not-allowed text-center">
                    Tidak Tersedia
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
                    Asesmen belum selesai
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
              Urutan Asesmen
            </p>
            <p className="text-xs sm:text-sm text-grey">
              Selesaikan asesmen secara berurutan: Screening → Pretest →
              Observasi → Posttest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

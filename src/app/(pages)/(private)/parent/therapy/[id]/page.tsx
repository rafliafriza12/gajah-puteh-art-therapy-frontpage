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
} from "@/services";

export default function ParentTherapyDetailPage() {
  const params = useParams();
  const therapyId = params.id as string;

  const { data: therapy, isLoading: therapyLoading } = useTherapy(therapyId);
  const { data: child, isLoading: childLoading } = useChild(
    therapy?.childId || ""
  );
  const { data: counselor, isLoading: counselorLoading } = useCounselor(
    therapy?.counselorId || ""
  );
  const { data: observation, isLoading: observationLoading } =
    useObservationByTherapy(therapyId);
  const { data: screening, isLoading: screeningLoading } =
    useScreeningByTherapy(therapyId);
  const { data: pretest, isLoading: pretestLoading } =
    usePretestByTherapy(therapyId);
  const { data: posttest, isLoading: posttestLoading } =
    usePosttestByTherapy(therapyId);

  const isLoading = therapyLoading || childLoading || counselorLoading;

  if (isLoading) {
    return (
      <div className="">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>

          {/* Header skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!therapy) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Sesi terapi tidak ditemukan</p>
          <Link
            href="/parent/therapy"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Kembali ke Sesi Terapi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Back Button */}
      <Link
        href="/parent/therapy"
        className="inline-flex items-center text-sm text-moss-stone hover:text-moss-stone-dark mb-4"
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
        Kembali ke Sesi Terapi
      </Link>

      {/* Header */}
      <Heading3 className="text-neutral-02 mb-6">Detail Sesi Terapi</Heading3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Therapy Information */}
          <div className="bg-white border border-grey-stroke rounded-xl p-6">
            <Heading5 className="text-neutral-02 mb-4">Informasi Sesi</Heading5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <BodySmallMedium className="text-grey mb-1">
                  ID Sesi
                </BodySmallMedium>
                <p className="text-sm text-neutral-02 font-mono">
                  {therapy._id}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey mb-1">
                  Tanggal Dibuat
                </BodySmallMedium>
                <p className="text-sm text-neutral-02">
                  {new Date(therapy.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <BodySmallMedium className="text-grey mb-1">
                  Konselor
                </BodySmallMedium>
                {counselorLoading ? (
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                ) : (
                  <div>
                    <p className="text-sm text-neutral-02 font-medium">
                      {counselor?.fullname || "N/A"}
                    </p>
                    <p className="text-xs text-grey">{counselor?.email}</p>
                  </div>
                )}
              </div>
              <div>
                <BodySmallMedium className="text-grey mb-1">
                  Terakhir Diperbarui
                </BodySmallMedium>
                <p className="text-sm text-neutral-02">
                  {new Date(therapy.updatedAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          {/* Child Information */}
          {child && (
            <div className="bg-white border border-grey-stroke rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Heading5 className="text-neutral-02">Informasi Anak</Heading5>
                <Link
                  href={`/parent/children/${child._id}`}
                  className="text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                >
                  Lihat Profil →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <BodySmallMedium className="text-grey mb-1">
                    Nama Lengkap
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">{child.fullname}</p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    NIK
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">{child.nik}</p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Usia
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">{child.age} tahun</p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Tanggal Lahir
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">
                    {new Date(child.birth).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Anak Ke-
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">
                    Anak #{child.childOrder}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Observations */}
          <div className="bg-white border border-grey-stroke rounded-xl p-6">
            <Heading5 className="text-neutral-02 mb-4">Observasi</Heading5>
            {observationLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ) : observation ? (
              <div className="space-y-4">
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Ringkasan
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                    {observation.summary || "Tidak ada ringkasan"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-grey-stroke">
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 1
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionOne || "-"}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 2
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionTwo || "-"}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 3
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionThree || "-"}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 4
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionFour || "-"}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 5
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionFive || "-"}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Sesi 6
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02 whitespace-pre-wrap wrap-break-word">
                      {observation.sessionSix || "-"}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1">
                    Tanggal Dibuat
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">
                    {new Date(observation.createdAt).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-grey text-sm">
                  Belum ada observasi yang tercatat
                </p>
              </div>
            )}
          </div>

          {/* Pretest Results */}
          <div className="bg-white border border-grey-stroke rounded-xl p-6">
            <Heading5 className="text-neutral-02 mb-4">
              Hasil Pretest (SDQ)
            </Heading5>
            {pretestLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : pretest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Gejala Emosional
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.emotionalSymptomsScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.emotionalSymptomsInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Masalah Perilaku
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.conductProblemScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.conductProblemInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Hiperaktivitas
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.hyperactivityScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.hyperactivityInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Masalah Teman Sebaya
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.peerProblemScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.peerProblemInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Perilaku Prososial
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.prosocialBehaviourScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.prosocialBehaviourInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Total Kesulitan
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {pretest.totalDifficultiesScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {pretest.totalDifficultiesInterpretation}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1">
                    Total Skor Pretest
                  </BodySmallMedium>
                  <p className="text-xl font-bold text-neutral-02">
                    {pretest.totalPretestScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {pretest.totalPretestInterpretation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-grey text-sm">
                  Belum ada pretest yang tercatat
                </p>
              </div>
            )}
          </div>

          {/* Posttest Results */}
          <div className="bg-white border border-grey-stroke rounded-xl p-6">
            <Heading5 className="text-neutral-02 mb-4">
              Hasil Posttest (SDQ)
            </Heading5>
            {posttestLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : posttest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Gejala Emosional
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.emotionalSymptomsScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.emotionalSymptomsInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Masalah Perilaku
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.conductProblemScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.conductProblemInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Hiperaktivitas
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.hyperactivityScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.hyperactivityInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Masalah Teman Sebaya
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.peerProblemScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.peerProblemInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Perilaku Prososial
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.prosocialBehaviourScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.prosocialBehaviourInterpretation}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Total Kesulitan
                    </BodySmallMedium>
                    <p className="text-lg font-semibold text-neutral-02">
                      {posttest.totalDifficultiesScore}
                    </p>
                    <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                      {posttest.totalDifficultiesInterpretation}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1">
                    Total Skor Posttest
                  </BodySmallMedium>
                  <p className="text-xl font-bold text-neutral-02">
                    {posttest.totalPosttestScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {posttest.totalPosttestInterpretation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-grey text-sm">
                  Belum ada posttest yang tercatat
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Screening (DASS) Results */}
          <div className="bg-white border border-grey-stroke rounded-xl p-6 sticky top-6">
            <Heading5 className="text-neutral-02 mb-4">Skrining DASS</Heading5>
            {screeningLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : screening ? (
              <div className="space-y-4">
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Depresi
                  </BodySmallMedium>
                  <p className="text-lg font-semibold text-neutral-02">
                    {screening.depressionScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {screening.depressionInterpretation}
                  </p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Kecemasan
                  </BodySmallMedium>
                  <p className="text-lg font-semibold text-neutral-02">
                    {screening.anxietyScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {screening.anxietyInterpretation}
                  </p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Stres
                  </BodySmallMedium>
                  <p className="text-lg font-semibold text-neutral-02">
                    {screening.stressScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {screening.stressInterpretation}
                  </p>
                </div>
                <div className="pt-4 border-t border-grey-stroke">
                  <BodySmallMedium className="text-grey mb-1">
                    Total Skor
                  </BodySmallMedium>
                  <p className="text-xl font-bold text-neutral-02">
                    {screening.totalScreeningScore}
                  </p>
                  <p className="text-sm text-grey whitespace-pre-wrap wrap-break-word">
                    {screening.totalScreeningInterpretation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-grey text-sm">
                  Belum ada skrining yang tercatat
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

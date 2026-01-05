"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import { StatsCard } from "@/components/molecules/cards/StatsCard";
import ThreeUserGroupIcon from "@/components/atoms/icons/ThreeUserGroupIcon";
import NotebookIcon from "@/components/atoms/icons/NotebookIcon";
import DocumentIcon from "@/components/atoms/icons/DocumentIcon";
import {
  useCurrentUser,
  useParents,
  useTherapiesByCounselor,
} from "@/services";
import { useActivities, Activity } from "@/services/activityHooks";
import { isCounselor } from "@/types/auth";
import { useMemo } from "react";
import Link from "next/link";

export default function CounselorDashboardPage() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: parents, isLoading: parentsLoading } = useParents();
  const { data: therapies, isLoading: therapiesLoading } =
    useTherapiesByCounselor();
  const { data: activitiesData, isLoading: isLoadingActivities } =
    useActivities(therapies);

  // Calculate statistics from real data
  const stats = useMemo(() => {
    const totalParents = parents?.length || 0;
    const totalTherapies = therapies?.length || 0;
    const totalChildren = activitiesData?.totalChildren || 0;

    return {
      totalParents,
      totalTherapies,
      totalChildren,
    };
  }, [parents, therapies, activitiesData]);

  const recentActivities = activitiesData?.activities.slice(0, 10) || [];
  const isLoading =
    userLoading || parentsLoading || therapiesLoading || isLoadingActivities;

  // Helper function to get activity badge color
  const getActivityColor = (type: Activity["type"]) => {
    const colors = {
      therapy: "bg-jade-light text-jade-dark",
      screening: "bg-topaz-light text-topaz-dark",
      pretest: "bg-jade-light text-jade-dark",
      observation: "bg-topaz-light text-topaz-dark",
      posttest: "bg-jade-light text-jade-dark",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  // Helper function to get activity type label
  const getActivityLabel = (type: Activity["type"]) => {
    const labels = {
      therapy: "Therapy",
      screening: "Screening",
      pretest: "Pretest",
      observation: "Observation",
      posttest: "Posttest",
    };
    return labels[type] || type;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
          Welcome back,{" "}
          {user && isCounselor(user) ? user.fullname : "Counselor"}!
        </Heading3>
        <p className="text-grey mt-2 text-xs sm:text-sm">
          Here's what's happening with your therapy sessions today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {isLoading ? (
          // Skeleton for stats cards
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Total Parents"
              value={stats.totalParents.toString()}
              subtitle="Active parents"
              icon={<ThreeUserGroupIcon className="w-6 h-6" />}
              trend={
                stats.totalParents > 0
                  ? { value: stats.totalParents, isPositive: true }
                  : undefined
              }
            />
            <StatsCard
              title="Therapy Sessions"
              value={stats.totalTherapies.toString()}
              subtitle="Total sessions"
              icon={<NotebookIcon className="w-6 h-6" />}
            />
            <StatsCard
              title="Total Children"
              value={stats.totalChildren.toString()}
              subtitle="Under therapy"
              icon={<DocumentIcon className="w-6 h-6" />}
            />
          </>
        )}
      </div>

      {/* User Guide Section */}
      <div className="bg-jade-light/10 border border-grey-stroke rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-jade rounded-xl flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
          </div>
          <div className="flex-1">
            <Heading5 className="text-neutral-02 mb-2 text-base sm:text-lg">
              Panduan Penggunaan Sistem Terapi
            </Heading5>
            <p className="text-grey text-xs sm:text-sm">
              Ikuti langkah-langkah berikut untuk mengelola sesi terapi dengan
              lengkap dan terstruktur
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Step 1 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                1
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Lihat data orangtua & anak
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Mulai dengan melihat anak yang akan mengikuti terapi. Jika
                  belum ada, perintahkan orangtua tambahkan data anak melalui
                  dashboard orangtua.
                </p>
                <Link
                  href="/counselor/children"
                  className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm"
                >
                  Lihat Daftar Orang Tua & Anak
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Buat Sesi Terapi Baru
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Setelah memilih anak, buat sesi terapi baru. Ini akan menjadi
                  wadah untuk semua asesmen yang akan dilakukan.
                </p>
                <Link
                  href="/counselor/therapy"
                  className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm"
                >
                  Buat Sesi Terapi
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Lakukan Screening (DASS-21)
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Mulai dengan screening menggunakan DASS-21 untuk mengukur
                  tingkat depresi, kecemasan, dan stres anak.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                4
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Lakukan Pretest (SDQ)
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Lanjutkan dengan pretest menggunakan SDQ (Strengths and
                  Difficulties Questionnaire) untuk baseline assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                5
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Catat Observasi Terapi
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Dokumentasikan observasi selama sesi terapi berlangsung, catat
                  perkembangan dan perilaku anak.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                6
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-neutral-02 mb-2 text-xs sm:text-sm">
                  Lakukan Posttest (SDQ)
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-3 leading-relaxed">
                  Setelah terapi selesai, lakukan posttest menggunakan SDQ untuk
                  mengukur perubahan dan efektivitas terapi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Box */}
        <div className="mt-4 sm:mt-6 bg-white/50 border border-moss-stone/30 rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-moss-stone shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-moss-stone text-xs sm:text-sm mb-2">
                💡 Tips Penting:
              </p>
              <ul className="text-grey text-xs sm:text-sm space-y-1 list-disc list-inside">
                <li>Pastikan semua asesmen dilakukan secara berurutan</li>
                <li>Dokumentasikan setiap sesi dengan detail</li>
                <li>Gunakan interpretasi yang sudah disediakan sistem</li>
                <li>Review hasil secara berkala untuk monitoring progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <Heading5 className="text-neutral-02 mb-1 text-base sm:text-lg">
              Recent Activities
            </Heading5>
            <p className="text-grey text-xs sm:text-sm">
              Your latest therapy sessions and assessments
            </p>
          </div>
          <Link
            href="/counselor/assessments"
            className="w-full sm:w-auto text-center px-4 py-2 border border-moss-stone text-moss-stone rounded-lg text-xs sm:text-sm font-medium hover:bg-moss-stone hover:text-neutral-01 transition-colors"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          // Skeleton for activities
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-lg p-3 sm:p-4 animate-pulse"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded w-24 sm:w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 sm:w-48"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-16 sm:w-20 shrink-0"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recentActivities.length === 0 ? (
          // Empty state
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-grey-stroke rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentIcon className="w-6 h-6 sm:w-8 sm:h-8 text-grey" />
            </div>
            <p className="text-grey mb-4 text-xs sm:text-sm">
              No recent activities yet
            </p>
            <Link
              href="/counselor/therapy/create"
              className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors text-xs sm:text-sm font-medium"
            >
              Create First Therapy Session
            </Link>
          </div>
        ) : (
          // Activities list
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <Link
                key={activity.id}
                href={activity.link}
                className="block w-full bg-white border border-grey-stroke hover:border-moss-stone rounded-lg p-3 sm:p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-moss-stone/10 rounded-lg flex items-center justify-center shrink-0">
                    <DocumentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-moss-stone" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-02 mb-1 truncate text-xs sm:text-sm">
                      {activity.childName}
                    </p>
                    <p className="text-xs sm:text-sm text-grey truncate">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getActivityColor(
                        activity.type
                      )}`}
                    >
                      {getActivityLabel(activity.type)}
                    </span>
                    <span className="text-xs text-grey whitespace-nowrap">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

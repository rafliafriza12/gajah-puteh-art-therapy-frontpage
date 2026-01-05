"use client";

import { Heading3 } from "@/components/atoms/Typography";
import { StatsCard } from "@/components/molecules/cards/StatsCard";
import ThreeUserGroupIcon from "@/components/atoms/icons/ThreeUserGroupIcon";
import NotebookIcon from "@/components/atoms/icons/NotebookIcon";
import DocumentIcon from "@/components/atoms/icons/DocumentIcon";
import {
  useCurrentUser,
  useChildrenByParent,
  useTherapiesByParent,
} from "@/services";
import { isParent } from "@/types/auth";
import { useMemo } from "react";
import Link from "next/link";

export default function ParentDashboardPage() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const parentId = user && isParent(user) ? user._id : "";

  const { data: children, isLoading: childrenLoading } =
    useChildrenByParent(parentId);
  const { data: therapies, isLoading: therapiesLoading } =
    useTherapiesByParent();

  // Calculate statistics from real data
  const stats = useMemo(() => {
    const totalChildren = children?.length || 0;
    const totalTherapies = therapies?.length || 0;

    // Anggap terapi aktif jika dibuat dalam 30 hari terakhir
    const activeTherapies =
      therapies?.filter((therapy) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(therapy.createdAt) > thirtyDaysAgo;
      }).length || 0;

    return {
      totalChildren,
      totalTherapies,
      activeTherapies,
    };
  }, [children, therapies]);

  const isLoading = userLoading || childrenLoading || therapiesLoading;

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 ">
      {/* Header */}
      <div>
        <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
          Welcome back, {user && isParent(user) ? user.fullname : "Parent"}! 👋
        </Heading3>
        <p className="text-grey mt-1 sm:mt-2 text-sm sm:text-base">
          Here's an overview of your children's therapy progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
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
              title="My Children"
              value={stats.totalChildren.toString()}
              subtitle="Registered children"
              icon={<ThreeUserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
              trend={
                stats.totalChildren > 0
                  ? { value: stats.totalChildren, isPositive: true }
                  : undefined
              }
            />
            <StatsCard
              title="Therapy Sessions"
              value={stats.totalTherapies.toString()}
              subtitle="Total sessions"
              icon={<NotebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />
            <StatsCard
              title="Active Therapies"
              value={stats.activeTherapies.toString()}
              subtitle="Last 30 days"
              icon={<DocumentIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-base sm:text-lg font-medium text-neutral-02 mb-3 sm:mb-4">
          Quick Actions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/parent/children"
            className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 hover:border-topaz transition-colors group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-topaz-light rounded-lg flex items-center justify-center group-hover:bg-topaz transition-colors shrink-0">
                <ThreeUserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-topaz-dark" />
              </div>
              <div>
                <h5 className="font-medium text-neutral-02 text-sm sm:text-base">
                  My Children
                </h5>
                <p className="text-xs sm:text-sm text-grey">
                  View all children
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/parent/therapy"
            className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 hover:border-moss-stone transition-colors group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-moss-stone/10 rounded-lg flex items-center justify-center group-hover:bg-moss-stone/20 transition-colors shrink-0">
                <NotebookIcon className="w-5 h-5 sm:w-6 sm:h-6 text-moss-stone" />
              </div>
              <div>
                <h5 className="font-medium text-neutral-02 text-sm sm:text-base">
                  Therapy Progress
                </h5>
                <p className="text-xs sm:text-sm text-grey">Track progress</p>
              </div>
            </div>
          </Link>

          <Link
            href="/parent/reports"
            className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6 hover:border-topaz transition-colors group sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-topaz-light rounded-lg flex items-center justify-center group-hover:bg-topaz transition-colors shrink-0">
                <DocumentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-topaz-dark" />
              </div>
              <div>
                <h5 className="font-medium text-neutral-02 text-sm sm:text-base">
                  Reports
                </h5>
                <p className="text-xs sm:text-sm text-grey">View assessments</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* User Guide Section */}
      <div className="bg-jade-light/10 border border-grey-stroke rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-moss-stone rounded-xl flex items-center justify-center shrink-0">
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
          <div>
            <h4 className="text-base sm:text-lg font-medium text-neutral-02 mb-1 sm:mb-2">
              Cara Penggunaan
            </h4>
            <p className="text-grey text-xs sm:text-sm">
              Panduan lengkap untuk memantau perkembangan terapi anak Anda
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
              <div className="flex-1">
                <h6 className="font-semibold text-neutral-02 mb-1 sm:mb-2 text-xs sm:text-sm">
                  Lihat Data Anak
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                  Klik menu <strong>"My Children"</strong> di sidebar atau card
                  Quick Actions untuk melihat daftar anak Anda yang terdaftar
                  dalam terapi seni.
                </p>
                <Link
                  href="/parent/children"
                  className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm"
                >
                  Lihat Daftar Anak
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
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
              <div className="flex-1">
                <h6 className="font-semibold text-neutral-02 mb-1 sm:mb-2 text-xs sm:text-sm">
                  Monitor Progres Terapi
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                  Klik menu <strong>"Therapy Progress"</strong> untuk melihat
                  semua sesi terapi yang telah dilakukan oleh anak-anak Anda.
                </p>
                <Link
                  href="/parent/therapy"
                  className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm"
                >
                  Lihat Progres Terapi
                  <svg
                    className="w-4 h-4 ml-1"
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
              <div className="flex-1">
                <h6 className="font-semibold text-neutral-02 mb-1 sm:mb-2 text-xs sm:text-sm">
                  Lihat Detail Terapi
                </h6>
                <p className="text-grey text-xs sm:text-sm leading-relaxed">
                  Klik pada salah satu sesi terapi untuk melihat detail lengkap,
                  termasuk hasil DASS Screening, Observations per sesi, dan
                  hasil Pretest & Posttest (SDQ).
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
              <div className="flex-1">
                <h6 className="font-semibold text-neutral-02 mb-1 sm:mb-2 text-xs sm:text-sm">
                  Akses Reports
                </h6>
                <p className="text-grey text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                  Klik menu <strong>"Reports"</strong> untuk melihat ringkasan
                  semua assessment.
                </p>
                <Link
                  href="/parent/reports"
                  className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm"
                >
                  Lihat Reports
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
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

          {/* Step 5 */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-grey-stroke hover:border-moss-stone transition-colors">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-moss-stone text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm">
                5
              </div>
              <div className="flex-1">
                <h6 className="font-semibold text-neutral-02 mb-1 sm:mb-2 text-xs sm:text-sm">
                  Akses Cepat dari Dashboard
                </h6>
                <p className="text-grey text-xs sm:text-sm leading-relaxed">
                  Di dashboard ini, Anda dapat langsung mengklik daftar{" "}
                  <strong>"Recent Therapy Sessions"</strong> di bawah untuk
                  langsung melihat detail terapi terbaru.
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
            <div className="flex-1">
              <p className="font-semibold text-moss-stone text-xs sm:text-sm mb-1 sm:mb-2">
                Catatan Penting:
              </p>
              <p className="text-grey text-xs sm:text-sm">
                Semua data terapi dikelola oleh konselor profesional. Hubungi
                konselor jika ada pertanyaan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-grey-stroke rounded-xl p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-medium text-neutral-02 mb-3 sm:mb-4">
          Recent Therapy Sessions
        </h4>
        {isLoading ? (
          <div className="space-y-3 sm:space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-grey-stroke rounded-lg"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded w-32 sm:w-48 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 sm:w-32"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>
            ))}
          </div>
        ) : children && children.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {therapies
              ?.filter((therapy) =>
                children.some((child) => child._id === therapy.childId)
              )
              .slice(0, 5)
              .map((therapy) => {
                const child = children.find((c) => c._id === therapy.childId);
                return (
                  <Link
                    key={therapy._id}
                    href={`/parent/therapy/${therapy._id}`}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-grey-stroke rounded-lg hover:bg-grey-stroke/5 hover:border-moss-stone transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-moss-stone/10 rounded-lg flex items-center justify-center shrink-0">
                      <NotebookIcon className="w-4 h-4 sm:w-5 sm:h-5 text-moss-stone" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-neutral-02 truncate">
                        Therapy for{" "}
                        {child?.fullname || `child (NIK: ${child?.nik})`}
                      </p>
                      <p className="text-xs text-grey truncate">
                        ID: {therapy._id.slice(0, 8)}...
                      </p>
                    </div>
                    <span className="text-xs text-grey whitespace-nowrap">
                      {new Date(therapy.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </Link>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <p className="text-grey text-sm">No therapy sessions yet</p>
            <Link
              href="/parent/children"
              className="text-moss-stone hover:text-moss-stone-dark font-medium text-xs sm:text-sm mt-2 inline-block"
            >
              View Your Children →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

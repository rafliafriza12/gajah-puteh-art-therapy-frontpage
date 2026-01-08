"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useChild, useTherapiesByParent, useCounselors } from "@/services";

export default function ParentChildDetailPage() {
  const params = useParams();
  const childId = params.id as string;

  const { data: child, isLoading: childLoading } = useChild(childId);
  const { data: allTherapies, isLoading: therapiesLoading } =
    useTherapiesByParent();
  const { data: counselors, isLoading: counselorsLoading } = useCounselors();

  // Filter therapies untuk child ini
  const childTherapies = allTherapies?.filter(
    (therapy) => therapy.childId === childId
  );

  const isLoading = childLoading || therapiesLoading || counselorsLoading;

  if (!child && !isLoading) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Anak tidak ditemukan</p>
          <Link
            href="/parent/children"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Kembali ke Daftar Anak
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header with Back Button */}
      <div className="mb-6">
        <Link
          href="/parent/children"
          className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4 inline-block"
        >
          ← Kembali ke Daftar Anak
        </Link>
        <div className="flex items-center justify-between">
          <Heading3 className="text-neutral-02">Detail Anak</Heading3>
          {child && (
            <Link
              href={`/parent/children?edit=${child._id}`}
              className="fixed md:static p-6 z-3 bottom-4 right-4 md:px-4 md:py-2 px-4 py-2 border border-moss-stone text-moss-stone rounded-full md:rounded-lg hover:bg-moss-stone/5 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="hidden md:block">Edit Data Anak</span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child Information */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <>
              {/* Basic Info Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Education Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : child ? (
            <>
              {/* Basic Info Card */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <Heading5 className="text-neutral-02 mb-4">
                  Informasi Dasar
                </Heading5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <BodySmallMedium className="text-grey mb-1">
                      Nama Lengkap
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.fullname}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      NIK
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.nik}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Usia
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.age} tahun</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Tanggal Lahir
                    </BodySmallMedium>
                    <p className="text-neutral-02">
                      {new Date(child.birth).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Anak Ke-
                    </BodySmallMedium>
                    <p className="text-neutral-02">Anak #{child.childOrder}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Ibu Kandung
                    </BodySmallMedium>
                    <p className="text-neutral-02">
                      {child.biologicalMotherName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Information */}
              {child.education && (
                <div className="bg-white border border-grey-stroke rounded-xl p-6">
                  <Heading5 className="text-neutral-02 mb-4">
                    Informasi Pendidikan
                  </Heading5>
                  <div className="space-y-3">
                    <div>
                      <BodySmallMedium className="text-grey mb-1">
                        Jenjang Pendidikan
                      </BodySmallMedium>
                      <p className="text-neutral-02">{child.education.stage}</p>
                    </div>
                    <div>
                      <BodySmallMedium className="text-grey mb-1">
                        Kelas
                      </BodySmallMedium>
                      <p className="text-neutral-02">{child.education.class}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Therapy Sessions Sidebar */}
        <div className="lg:col-span-1">
          {isLoading ? (
            // Therapy Sessions Skeleton
            <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse sticky top-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-grey-stroke rounded-xl p-6 sticky top-6">
              <Heading5 className="text-neutral-02 mb-4">Sesi Terapi</Heading5>
              {childTherapies && childTherapies.length > 0 ? (
                <div className="space-y-4">
                  {childTherapies.map((therapy, index) => {
                    const counselor = counselors?.find(
                      (c) => c._id === therapy.counselorId
                    );
                    return (
                      <Link
                        key={therapy._id}
                        href={`/parent/therapy/${therapy._id}`}
                        className="block p-4 border border-grey-stroke rounded-lg hover:border-moss-stone transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-neutral-02">
                            Terapi #{index + 1}
                          </p>
                          <span className="px-2 py-1 bg-moss-stone/10 text-moss-stone text-xs rounded">
                            {new Date(therapy.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {counselor && (
                          <div className="flex items-center gap-2 mt-2">
                            <svg
                              className="w-4 h-4 text-grey"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-xs text-grey">
                              {counselor.fullname}
                            </p>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-grey mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm text-grey">Belum ada sesi terapi</p>
                </div>
              )}

              {/* Quick Actions */}
              {child && (
                <div className="mt-6 pt-6 border-t border-grey-stroke">
                  <Link
                    href={`/parent/therapy?childId=${child._id}`}
                    className="block w-full text-center px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors"
                  >
                    Lihat Semua Progres Terapi
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

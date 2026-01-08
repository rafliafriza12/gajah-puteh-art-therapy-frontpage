"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useParent, useChildrenByParent } from "@/services";

export default function ParentDetailPage() {
  const params = useParams();
  const parentId = params.id as string;

  const { data: parent, isLoading: parentLoading } = useParent(parentId);
  const { data: children, isLoading: childrenLoading } =
    useChildrenByParent(parentId);

  const isLoading = parentLoading || childrenLoading;

  if (!parent && !isLoading) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Orangtua tidak ditemukan</p>
          <Link
            href="/counselor/children"
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
          href="/counselor/children"
          className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4 inline-block"
        >
          ← Kembali ke Daftar Anak
        </Link>
        <div className="flex items-center gap-3">
          <Heading3 className="text-neutral-02">Detail Orangtua</Heading3>
          <span className="px-3 py-1 text-sm font-medium rounded bg-blue-100 text-blue-700">
            Orangtua
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Information */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <>
              {/* Personal Info Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Children List Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </>
          ) : parent ? (
            <>
              {/* Personal Information Card */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <Heading5 className="text-neutral-02 mb-4">
                  Informasi Pribadi
                </Heading5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <BodySmallMedium className="text-grey mb-1">
                      Nama Lengkap
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.fullname}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Email
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.email}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Telepon
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.phone}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Usia
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.age} tahun</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Pekerjaan
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.work}</p>
                  </div>
                  <div className="md:col-span-2">
                    <BodySmallMedium className="text-grey mb-1">
                      Alamat
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.address}</p>
                  </div>
                </div>
              </div>

              {/* Children List Card */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading5 className="text-neutral-02">
                    Anak ({children?.length || 0})
                  </Heading5>
                </div>
                {children && children.length > 0 ? (
                  <div className="space-y-3">
                    {children.map((child) => (
                      <Link
                        key={child._id}
                        href={`/counselor/children/${child._id}`}
                        className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-grey-stroke rounded-lg hover:bg-grey-stroke/5 transition-colors"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-moss-stone/20 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-moss-stone font-medium text-base sm:text-lg">
                            {child.fullname?.charAt(0).toUpperCase() ||
                              child.nik.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h5 className="text-sm sm:text-base font-medium text-neutral-02 truncate">
                              {child.fullname || `Child #${child.childOrder}`}
                            </h5>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700 whitespace-nowrap">
                                Anak
                              </span>
                              <span className="px-2 py-0.5 text-xs font-medium rounded bg-moss-stone/10 text-moss-stone whitespace-nowrap">
                                {child.age} tahun
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-grey">
                            <span className="truncate">NIK: {child.nik}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">
                              {child.education.stage} - Class{" "}
                              {child.education.class}
                            </span>
                          </div>
                        </div>
                        <span className="hidden sm:inline text-moss-stone font-medium text-sm whitespace-nowrap">
                          Lihat Detail →
                        </span>
                        <span className="sm:hidden text-moss-stone font-medium text-xs mt-1">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-grey text-sm">
                      Belum ada anak terdaftar untuk orangtua ini
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Quick Stats Sidebar */}
        <div className="lg:col-span-1">
          {isLoading ? (
            // Stats Skeleton
            <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse sticky top-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-200 rounded-lg h-20"
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-grey-stroke rounded-xl p-6 sticky top-6">
              <Heading5 className="text-neutral-02 mb-4">
                Statistik Cepat
              </Heading5>
              <div className="space-y-4">
                {/* Total Children */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-grey mb-1">Total Anak</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {children?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Average Age */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-grey mb-1">Rata-rata Usia</p>
                      <p className="text-2xl font-bold text-green-700">
                        {children && children.length > 0
                          ? Math.round(
                              children.reduce(
                                (sum, child) => sum + child.age,
                                0
                              ) / children.length
                            )
                          : 0}{" "}
                        tahun
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-4 bg-moss-stone/5 border border-moss-stone/20 rounded-lg">
                  <p className="text-sm text-grey mb-2">Hubungi Orangtua</p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${parent?.email}`}
                      className="flex items-center gap-2 text-sm text-moss-stone hover:text-moss-stone-dark"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Kirim Email
                    </a>
                    <a
                      href={`tel:${parent?.phone}`}
                      className="flex items-center gap-2 text-sm text-moss-stone hover:text-moss-stone-dark"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Hubungi Telepon
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

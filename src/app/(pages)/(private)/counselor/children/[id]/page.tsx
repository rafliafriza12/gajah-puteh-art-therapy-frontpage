"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useChild, useParent, useTherapies } from "@/services";

export default function ChildDetailPage() {
  const params = useParams();
  const childId = params.id as string;

  const { data: child, isLoading: childLoading } = useChild(childId);
  const { data: parent, isLoading: parentLoading } = useParent(
    child?.parentId || ""
  );
  const { data: allTherapies, isLoading: therapiesLoading } = useTherapies();

  // Filter therapies untuk child ini
  const childTherapies = allTherapies?.filter(
    (therapy) => therapy.childId === childId
  );

  const isLoading = childLoading || parentLoading;

  if (!child && !isLoading) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Anak tidak ditemukan</p>
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
        <Heading3 className="text-neutral-02">Detail Anak</Heading3>
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
                  {[1, 2, 3, 4, 5, 6].map((i) => (
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
                  {[1, 2, 3].map((i) => (
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
                      Urutan Anak
                    </BodySmallMedium>
                    <p className="text-neutral-02">
                      Anak ke-{child.childOrder}
                    </p>
                  </div>
                  <div className="md:col-span-2">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <p className="text-neutral-02">
                        Kelas {child.education.class}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Therapy Sessions */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading5 className="text-neutral-02">Sesi Terapi</Heading5>
                  <Link
                    href={`/counselor/therapy/create?childId=${child._id}`}
                    className="text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                  >
                    + Sesi Baru
                  </Link>
                </div>
                {therapiesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 border border-grey-stroke rounded-lg animate-pulse"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                          <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                        <div className="w-20 h-8 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                ) : childTherapies && childTherapies.length > 0 ? (
                  <div className="space-y-3">
                    {childTherapies.map((therapy, index) => (
                      <div
                        key={therapy._id}
                        className="flex items-center gap-4 p-4 border border-grey-stroke rounded-lg hover:bg-grey-stroke/5 transition-colors"
                      >
                        <div className="w-10 h-10 bg-moss-stone/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-moss-stone">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-02">
                            Terapi #{index + 1}
                          </p>
                          <p className="text-xs text-grey">
                            {new Date(therapy.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/counselor/therapy/${therapy._id}`}
                          className="px-4 py-2 text-sm text-moss-stone border border-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                        >
                          Lihat
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-grey text-sm mb-3">
                      Belum ada sesi terapi untuk anak ini
                    </p>
                    <Link
                      href={`/counselor/therapy/create?childId=${child._id}`}
                      className="text-moss-stone hover:underline text-sm"
                    >
                      Buat sesi pertama →
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Parent Information Sidebar */}
        <div className="lg:col-span-1">
          {isLoading ? (
            // Parent Info Skeleton
            <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse sticky top-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
                <div className="pt-4 border-t border-grey-stroke space-y-2">
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-grey-stroke rounded-xl p-6 sticky top-6">
              <Heading5 className="text-neutral-02 mb-4">
                Informasi Orangtua
              </Heading5>
              {parent ? (
                <div className="space-y-4">
                  <div>
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
                      Alamat
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.address}</p>
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
                </div>
              ) : (
                <p className="text-grey text-sm">
                  Memuat informasi orangtua...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

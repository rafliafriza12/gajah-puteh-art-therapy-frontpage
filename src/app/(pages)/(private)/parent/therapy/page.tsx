"use client";

import { Heading3, BodySmallMedium } from "@/components/atoms/Typography";
import Link from "next/link";
import {
  useCurrentUser,
  useChildrenByParent,
  useTherapiesByParent,
  useCounselors,
} from "@/services";
import { isParent } from "@/types/auth";

export default function ParentTherapyPage() {
  const { data: user } = useCurrentUser();
  const parentId = user && isParent(user) ? user._id : "";

  const { data: children, isLoading: childrenLoading } =
    useChildrenByParent(parentId);
  const { data: therapies, isLoading: therapiesLoading } =
    useTherapiesByParent();
  const { data: counselors, isLoading: counselorsLoading } = useCounselors();

  const isLoading = childrenLoading || therapiesLoading || counselorsLoading;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading3 className="text-neutral-02">Progres Terapi</Heading3>
          <p className="text-grey mt-2">
            Pantau sesi terapi dan perkembangan anak-anak Anda
          </p>
        </div>
      </div>

      {/* Therapy Sessions Table */}
      <div className="bg-white border border-grey-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-stroke/10 border-b border-grey-stroke">
              <tr>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    ID Sesi
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Anak
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Konselor
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Tanggal
                  </BodySmallMedium>
                </th>
                <th className="px-6 py-4 text-left">
                  <BodySmallMedium className="text-neutral-02">
                    Aksi
                  </BodySmallMedium>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-stroke">
              {isLoading ? (
                // Skeleton rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-36"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                  </tr>
                ))
              ) : therapies && therapies.length > 0 ? (
                therapies.map((therapy) => {
                  const child = children?.find(
                    (c) => c._id === therapy.childId
                  );
                  const counselor = counselors?.find(
                    (c) => c._id === therapy.counselorId
                  );
                  return (
                    <tr
                      key={therapy._id}
                      className="hover:bg-grey-stroke/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-02 font-mono">
                          {therapy._id.slice(0, 12)}...
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-neutral-02 font-medium">
                            {child?.fullname ||
                              `Child #${child?.childOrder}` ||
                              "N/A"}
                          </p>
                          <p className="text-xs text-grey">
                            NIK: {child?.nik.slice(0, 8)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-neutral-02 font-medium">
                            {counselor?.fullname || "N/A"}
                          </p>
                          <p className="text-xs text-grey">
                            {counselor?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-02">
                          {new Date(therapy.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/parent/therapy/${therapy._id}`}>
                          <button className="text-sm text-moss-stone hover:text-moss-stone-dark font-medium">
                            Lihat Detail
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <svg
                      className="w-16 h-16 text-grey mx-auto mb-4"
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
                    <p className="text-grey mb-2">Belum ada sesi terapi</p>
                    <p className="text-sm text-grey">
                      Anak-anak Anda belum memulai sesi terapi
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      {!isLoading && therapies && therapies.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            Tentang Sesi Terapi
          </h4>
          <p className="text-sm text-blue-800">
            Setiap sesi terapi mencakup observasi, asesmen (skrining DASS), dan
            pemantauan perkembangan. Klik "Lihat Detail" untuk melihat informasi
            lengkap tentang setiap sesi.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useScreening,
  useTherapy,
  useChild,
  useDeleteScreening,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { Modal } from "@/components/molecules/Modal";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function ScreeningDetailPage() {
  const params = useParams();
  const router = useRouter();
  const screeningId = params.id as string;

  const { data: screening, isLoading: screeningLoading } =
    useScreening(screeningId);
  const { data: therapy } = useTherapy(screening?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteScreening, isPending: isDeleting } =
    useDeleteScreening();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  const handleDelete = () => {
    deleteScreening(screeningId, {
      onSuccess: () => {
        toast.success("Asesmen screening berhasil dihapus");
        router.push("/counselor/assessments/screening");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Gagal menghapus screening"
        );
      },
    });
  };

  if (screeningLoading) {
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

  if (!screening) {
    return (
      <div className="">
        <div className="text-center py-12">
          <p className="text-grey mb-4">Asesmen screening tidak ditemukan</p>
          <button
            onClick={() => router.back()}
            className="text-moss-stone hover:text-moss-stone-dark font-medium"
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
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-moss-stone hover:text-moss-stone-dark mb-4"
      >
        <svg
          className="w-5 h-5 mr-1"
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
        Kembali
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col gap-4 md:flex-row  w-full md:w-auto">
        <div>
          <Heading3 className="text-neutral-02">
            Detail Asesmen Screening (DASS)
          </Heading3>
          <p className="text-grey mt-2">
            {canEdit
              ? "Lihat dan kelola asesmen screening"
              : "Lihat asesmen screening (Hanya baca)"}
          </p>
        </div>
        {canEdit && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/counselor/assessments/screening/${screeningId}/edit`}
              className="w-full md:w-auto text-center px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full md:w-auto text-center px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Asesmen Screening"
      >
        <div className="space-y-4">
          <p className="text-grey">
            Apakah Anda yakin ingin menghapus asesmen screening ini? Tindakan
            ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-grey hover:text-neutral-02 transition-colors"
              disabled={isDeleting}
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors disabled:bg-grey disabled:cursor-not-allowed"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Child Info */}
      {child && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>Anak:</strong> {child.fullname}
          </p>
        </div>
      )}

      {/* Assessment Content */}
      <div className="space-y-6">
        {/* Depression */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">Depresi</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {screening.depressionScore}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
                {screening.depressionInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Anxiety */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">Kecemasan</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {screening.anxietyScore}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
                {screening.anxietyInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Stress */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">Stres</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {screening.stressScore}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
                {screening.stressInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Score */}
        <div className="bg-moss-stone/5 border border-moss-stone/20 rounded-xl p-6">
          <Heading5 className="text-neutral-02 mb-4">
            Total Skor Screening
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Total Skor
              </label>
              <p className="text-2xl font-bold text-moss-stone">
                {screening.totalScreeningScore}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi Keseluruhan
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
                {screening.totalScreeningInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-grey-stroke/5 rounded-xl p-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-grey">Dibuat:</span>{" "}
              <span className="text-neutral-02">
                {new Date(screening.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div>
              <span className="text-grey">Terakhir Diperbarui:</span>{" "}
              <span className="text-neutral-02">
                {new Date(screening.updatedAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

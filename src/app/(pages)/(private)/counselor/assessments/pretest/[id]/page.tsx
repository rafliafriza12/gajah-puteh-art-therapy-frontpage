"use client";

import { Heading3, Heading5 } from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  usePretest,
  useTherapy,
  useChild,
  useDeletePretest,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { Modal } from "@/components/molecules/Modal";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function PretestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pretestId = params.id as string;

  const { data: pretest, isLoading: pretestLoading } = usePretest(pretestId);
  const { data: therapy } = useTherapy(pretest?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: deletePretest, isPending: isDeleting } = useDeletePretest();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  const handleDelete = () => {
    deletePretest(pretestId, {
      onSuccess: () => {
        toast.success("Asesmen pretest berhasil dihapus");
        router.push("/counselor/assessments/pretest");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Gagal menghapus pretest");
      },
    });
  };

  if (pretestLoading) {
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

  if (!pretest) {
    return (
      <div className="">
        <div className="text-center py-12">
          <p className="text-grey mb-4">Asesmen pretest tidak ditemukan</p>
          <Link
            href="/counselor/assessments/pretest"
            className="text-moss-stone hover:text-moss-stone-dark font-medium"
          >
            ← Kembali ke Pretest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4 flex items-center"
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col gap-4 md:flex-row  w-full md:w-auto">
        <div>
          <Heading3 className="text-neutral-02">
            Detail Asesmen Pretest (SDQ)
          </Heading3>
          <p className="text-grey mt-2">
            {canEdit
              ? "Lihat dan kelola asesmen pretest"
              : "Lihat asesmen pretest (Hanya baca)"}
          </p>
        </div>
        {canEdit && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/counselor/assessments/pretest/${pretestId}/edit`}
              className="px-4 py-2 w-full md:w-auto bg-moss-stone text-center text-white rounded-lg hover:bg-moss-stone-dark transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 w-full md:w-auto text-center bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
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
        title="Hapus Asesmen Pretest"
      >
        <div className="space-y-4">
          <p className="text-grey">
            Apakah Anda yakin ingin menghapus asesmen pretest ini? Tindakan ini
            tidak dapat dibatalkan.
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
        {/* Emotional Symptoms */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">Gejala Emosional</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.emotionalSymptomsScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.emotionalSymptomsInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Conduct Problems */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">Masalah Perilaku</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.conductProblemScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.conductProblemInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Hyperactivity/Inattention */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">
            Hiperaktivitas / Kurang Perhatian
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.hyperactivityScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.hyperactivityInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Peer Relationship Problems */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">
            Masalah Hubungan Sebaya
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.peerProblemScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.peerProblemInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Prosocial Behaviour */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">
            Perilaku Prososial
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.prosocialBehaviourScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.prosocialBehaviourInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Difficulties */}
        <div className="bg-white border border-grey-stroke rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">Total Kesulitan</Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Skor
              </label>
              <p className="text-lg font-semibold text-neutral-02">
                {pretest.totalDifficultiesScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.totalDifficultiesInterpretation || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Pretest Score */}
        <div className="bg-moss-stone/5 border border-moss-stone/20 rounded-xl p-6 overflow-hidden">
          <Heading5 className="text-neutral-02 mb-4">
            Total Skor Pretest
          </Heading5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">
                Total Skor
              </label>
              <p className="text-2xl font-bold text-moss-stone">
                {pretest.totalPretestScore}
              </p>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-grey mb-1">
                Interpretasi Keseluruhan
              </label>
              <p className="text-neutral-02 whitespace-pre-wrap wrap-break-word">
                {pretest.totalPretestInterpretation || "-"}
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
                {new Date(pretest.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div>
              <span className="text-grey">Terakhir Diperbarui:</span>{" "}
              <span className="text-neutral-02">
                {new Date(pretest.updatedAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

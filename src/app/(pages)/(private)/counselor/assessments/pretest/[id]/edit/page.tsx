"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import {
  usePretest,
  useUpdatePretest,
  useTherapy,
  useChild,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function EditPretestPage() {
  const params = useParams();
  const router = useRouter();
  const pretestId = params.id as string;

  const { data: pretest, isLoading } = usePretest(pretestId);
  const { data: therapy } = useTherapy(pretest?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: updatePretest, isPending } = useUpdatePretest();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "Anda hanya dapat mengedit asesmen untuk sesi terapi Anda sendiri"
      );
      router.push(`/counselor/assessments/pretest/${pretestId}`);
    }
  }, [therapy, currentUser, canEdit, router, pretestId]);

  const [formData, setFormData] = useState({
    emotionalSymptomsScore: "",
    emotionalSymptomsInterpretation: "",
    conductProblemScore: "",
    conductProblemInterpretation: "",
    hyperactivityScore: "",
    hyperactivityInterpretation: "",
    peerProblemScore: "",
    peerProblemInterpretation: "",
    prosocialBehaviourScore: "",
    prosocialBehaviourInterpretation: "",
    totalDifficultiesScore: "",
    totalDifficultiesInterpretation: "",
    totalPretestScore: "",
    totalPretestInterpretation: "",
  });

  // Load existing data when pretest is fetched
  useEffect(() => {
    if (pretest) {
      setFormData({
        emotionalSymptomsScore:
          pretest.emotionalSymptomsScore?.toString() || "",
        emotionalSymptomsInterpretation:
          pretest.emotionalSymptomsInterpretation || "",
        conductProblemScore: pretest.conductProblemScore?.toString() || "",
        conductProblemInterpretation:
          pretest.conductProblemInterpretation || "",
        hyperactivityScore: pretest.hyperactivityScore?.toString() || "",
        hyperactivityInterpretation: pretest.hyperactivityInterpretation || "",
        peerProblemScore: pretest.peerProblemScore?.toString() || "",
        peerProblemInterpretation: pretest.peerProblemInterpretation || "",
        prosocialBehaviourScore:
          pretest.prosocialBehaviourScore?.toString() || "",
        prosocialBehaviourInterpretation:
          pretest.prosocialBehaviourInterpretation || "",
        totalDifficultiesScore:
          pretest.totalDifficultiesScore?.toString() || "",
        totalDifficultiesInterpretation:
          pretest.totalDifficultiesInterpretation || "",
        totalPretestScore: pretest.totalPretestScore?.toString() || "",
        totalPretestInterpretation: pretest.totalPretestInterpretation || "",
      });
    }
  }, [pretest]);

  // Calculate total pretest score (sum of all scores)
  useEffect(() => {
    const emotional = parseInt(formData.emotionalSymptomsScore) || 0;
    const conduct = parseInt(formData.conductProblemScore) || 0;
    const hyperactivity = parseInt(formData.hyperactivityScore) || 0;
    const peer = parseInt(formData.peerProblemScore) || 0;
    const prosocial = parseInt(formData.prosocialBehaviourScore) || 0;
    const difficulties = parseInt(formData.totalDifficultiesScore) || 0;
    const totalPretest =
      emotional + conduct + hyperactivity + peer + prosocial + difficulties;

    setFormData((prev) => ({
      ...prev,
      totalPretestScore: totalPretest.toString(),
    }));
  }, [
    formData.emotionalSymptomsScore,
    formData.conductProblemScore,
    formData.hyperactivityScore,
    formData.peerProblemScore,
    formData.prosocialBehaviourScore,
    formData.totalDifficultiesScore,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePretest(
      {
        id: pretestId,
        data: {
          emotionalSymptomsScore: parseInt(formData.emotionalSymptomsScore),
          emotionalSymptomsInterpretation:
            formData.emotionalSymptomsInterpretation,
          conductProblemScore: parseInt(formData.conductProblemScore),
          conductProblemInterpretation: formData.conductProblemInterpretation,
          hyperactivityScore: parseInt(formData.hyperactivityScore),
          hyperactivityInterpretation: formData.hyperactivityInterpretation,
          peerProblemScore: parseInt(formData.peerProblemScore),
          peerProblemInterpretation: formData.peerProblemInterpretation,
          prosocialBehaviourScore: parseInt(formData.prosocialBehaviourScore),
          prosocialBehaviourInterpretation:
            formData.prosocialBehaviourInterpretation,
          totalDifficultiesScore: parseInt(formData.totalDifficultiesScore),
          totalDifficultiesInterpretation:
            formData.totalDifficultiesInterpretation,
          totalPretestScore: parseInt(formData.totalPretestScore),
          totalPretestInterpretation: formData.totalPretestInterpretation,
        },
      },
      {
        onSuccess: () => {
          toast.success("Asesmen pretest berhasil diperbarui!");
          router.push(`/counselor/assessments/pretest/${pretestId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Gagal memperbarui asesmen pretest");
        },
      }
    );
  };

  if (isLoading) {
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
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Pretest tidak ditemukan</p>
          <Link
            href="/counselor/assessments/pretest"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Kembali ke Daftar Pretest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
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
        <Heading3 className="text-neutral-02">
          Edit Asesmen Pretest (SDQ)
        </Heading3>
        {child && (
          <p className="text-grey mt-2">
            Untuk anak:{" "}
            <span className="font-medium text-neutral-02">
              {child.fullname || `Anak #${child.childOrder}`}
            </span>
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-grey-stroke rounded-xl p-6 lg:p-8 space-y-6 overflow-x-hidden"
      >
        {/* Emotional Symptoms */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">Gejala Emosional</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="emotionalSymptomsScore"
                value={formData.emotionalSymptomsScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="emotionalSymptomsInterpretation"
                value={formData.emotionalSymptomsInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Conduct Problems */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">Masalah Perilaku</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="conductProblemScore"
                value={formData.conductProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="conductProblemInterpretation"
                value={formData.conductProblemInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Hyperactivity */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Hiperaktivitas / Kurang Perhatian
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="hyperactivityScore"
                value={formData.hyperactivityScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="hyperactivityInterpretation"
                value={formData.hyperactivityInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Peer Problems */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Masalah Hubungan Sebaya
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="peerProblemScore"
                value={formData.peerProblemScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="peerProblemInterpretation"
                value={formData.peerProblemInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Prosocial Behaviour */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Perilaku Prososial
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="prosocialBehaviourScore"
                value={formData.prosocialBehaviourScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="prosocialBehaviourInterpretation"
                value={formData.prosocialBehaviourInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Total Difficulties */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">Total Kesulitan</Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalDifficultiesScore"
                value={formData.totalDifficultiesScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi *</BodySmallMedium>
              </label>
              <textarea
                name="totalDifficultiesInterpretation"
                value={formData.totalDifficultiesInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi"
              />
            </div>
          </div>
        </div>

        {/* Total Pretest Score */}
        <div>
          <Heading5 className="text-neutral-02 mb-4">
            Total Skor Pretest
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Total Skor Pretest</BodySmallMedium>
              </label>
              <input
                type="number"
                name="totalPretestScore"
                value={formData.totalPretestScore}
                readOnly
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg bg-grey-stroke/10 text-neutral-02 font-semibold"
                placeholder="Dihitung otomatis"
              />
              <p className="text-xs text-grey mt-1">
                Termasuk semua skor (kesulitan + prososial)
              </p>
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi Total Pretest *</BodySmallMedium>
              </label>
              <textarea
                name="totalPretestInterpretation"
                value={formData.totalPretestInterpretation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder="Masukkan interpretasi keseluruhan"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/counselor/assessments/pretest/${pretestId}`}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center"
          >
            Batal
          </Link>
          <SubmitButton
            variant="primary"
            text={isPending ? "Menyimpan..." : "Simpan Perubahan"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}

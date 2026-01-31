"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import {
  useScreening,
  useUpdateScreening,
  useTherapy,
  useChild,
  useCurrentUser,
} from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function EditScreeningPage() {
  const router = useRouter();
  const params = useParams();
  const screeningId = params.id as string;

  const { data: screening, isLoading } = useScreening(screeningId);
  const { data: therapy } = useTherapy(screening?.therapyId || "");
  const { data: child } = useChild(therapy?.childId || "");
  const { data: currentUser } = useCurrentUser();
  const { mutate: updateScreening, isPending } = useUpdateScreening();

  const [formData, setFormData] = useState({
    screeningScore: "",
  });
  const [interpretation, setInterpretation] = useState("");

  // Fungsi logika interpretasi (Disamakan dengan Create)
  const generateInterpretation = useCallback((score: number) => {
    if (score <= 4) {
      setInterpretation(
        "Tidak terindikasi risiko PTSD berdasarkan hasil skrining awal. Anak berada dalam rentang respons stres yang masih adaptif pasca kejadian traumatis.",
      );
    } else {
      setInterpretation(
        "Hasil skrining menunjukkan bahwa anak menunjukkan tanda-tanda risiko reaksi stres pasca kejadian traumatis. Hasil ini bukan diagnosis, namun menjadi gambaran bahwa anak membutuhkan perhatian dan pendampingan emosional lebih lanjut. Melalui terapi, anak akan mengikuti pendampingan psikososial sebagai bagian dari proses pemulihan. Jika selama pendampingan terdapat kebutuhan tambahan, anak dapat dirujuk untuk mendapatkan asesmen lanjutan dari psikolog atau psikiater anak.Anak teridentifikasi berisiko mengalami gejala PTSD.",
      );
    }
  }, []);

  // Load existing data
  useEffect(() => {
    if (screening) {
      const score = screening.screeningScore;
      setFormData({
        screeningScore: score.toString(),
      });
      generateInterpretation(score);
    }
  }, [screening, generateInterpretation]);

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "Anda hanya dapat mengedit asesmen untuk sesi terapi Anda sendiri",
      );
      router.push(`/counselor/assessments/screening/${screeningId}`);
    }
  }, [therapy, currentUser, canEdit, router, screeningId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ screeningScore: value });

    // Auto generate saat input berubah
    if (value !== "") {
      generateInterpretation(parseInt(value));
    } else {
      setInterpretation("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateScreening(
      {
        id: screeningId,
        data: {
          screeningScore: parseInt(formData.screeningScore),
          // Backend akan mengurus counselorInterpretation & parentInterpretation
          // berdasarkan screeningScore di service layer yang sudah kita buat sebelumnya.
        },
      },
      {
        onSuccess: () => {
          toast.success("Asesmen screening berhasil diperbarui!");
          router.push(`/counselor/assessments/screening/${screeningId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Gagal memperbarui asesmen screening");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 overflow-x-hidden">
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
        <Heading3 className="text-neutral-02">Edit Asesmen Screening</Heading3>
        {child && (
          <p className="text-grey mt-2">
            Untuk anak:{" "}
            <span className="font-medium text-neutral-02">
              {child.fullname}
            </span>
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-grey-stroke rounded-xl p-6 lg:p-8 space-y-6"
      >
        <div className="pb-6">
          <Heading5 className="text-neutral-02 mb-4">
            Input Skor Terbaru
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor Screening *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="screeningScore"
                value={formData.screeningScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi (Auto-generated)</BodySmallMedium>
              </label>
              <textarea
                value={interpretation}
                disabled
                rows={6}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg bg-gray-50 text-gray-600 resize-none italic"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-grey-stroke">
          <Link
            href={`/counselor/assessments/screening/${screeningId}`}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center"
          >
            Batal
          </Link>
          <SubmitButton
            variant="primary"
            text={isPending ? "Memperbarui..." : "Simpan Perubahan"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}

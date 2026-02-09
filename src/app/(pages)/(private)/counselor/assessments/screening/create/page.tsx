"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import Link from "next/link";
import { useCreateScreening, useTherapy, useCurrentUser } from "@/services";
import { toast } from "react-toastify";
import { canEditTherapyAssessment } from "@/libs/authorization";

export default function CreateScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTherapyId = searchParams.get("therapyId") || "";

  const [selectedTherapyId, setSelectedTherapyId] = useState(initialTherapyId);
  const [interpretation, setInterpretation] = useState("");

  const { data: therapy } = useTherapy(selectedTherapyId);
  const { data: currentUser } = useCurrentUser();
  const { mutate: createScreening, isPending } = useCreateScreening();

  // Check authorization
  const canEdit = canEditTherapyAssessment(therapy, currentUser);

  // Redirect if user cannot edit
  useEffect(() => {
    if (therapy && currentUser && !canEdit) {
      toast.error(
        "Anda hanya dapat membuat asesmen untuk sesi terapi Anda sendiri",
      );
      router.push("/counselor/assessments/screening");
    }
  }, [therapy, currentUser, canEdit, router]);

  const [formData, setFormData] = useState({
    screeningScore: "",
  });

  // Calculate total score when individual scores change

  const getInterpretation = (score: number) => {
    score <= 4
      ? setInterpretation(
          "Tidak terindikasi risiko PTSD berdasarkan hasil skrining awal. Anak berada dalam rentang respons stres yang masih adaptif pasca kejadian traumatis.",
        )
      : setInterpretation(
          "Hasil skrining menunjukkan bahwa anak menunjukkan tanda-tanda risiko reaksi stres pasca kejadian traumatis. Hasil ini bukan diagnosis, namun menjadi gambaran bahwa anak membutuhkan perhatian dan pendampingan emosional lebih lanjut. Melalui terapi, anak akan mengikuti pendampingan psikososial sebagai bagian dari proses pemulihan. Jika selama pendampingan terdapat kebutuhan tambahan, anak dapat dirujuk untuk mendapatkan asesmen lanjutan dari psikolog atau psikiater anak.Anak teridentifikasi berisiko mengalami gejala PTSD.",
        );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    getInterpretation(+value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTherapyId) {
      toast.error("Silakan pilih sesi terapi");
      return;
    }

    createScreening(
      {
        therapyId: selectedTherapyId,
        screeningScore: parseInt(formData.screeningScore),
      },
      {
        onSuccess: () => {
          toast.success("Asesmen screening berhasil dibuat!");
          router.push(`/counselor/therapy/${selectedTherapyId}`);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Gagal membuat asesmen screening");
        },
      },
    );
  };

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
          Buat Asesmen Screening (CSTQ)
        </Heading3>
        <p className="text-grey mt-2">Child Screening Trauma Questionnaire</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-grey-stroke rounded-xl p-6 lg:p-8 space-y-6 overflow-x-hidden"
      >
        {/* Depression Section */}
        <div className="pb-6 border-b border-grey-stroke">
          <Heading5 className="text-neutral-02 mb-4">
            Asesmen Screening
          </Heading5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Skor screening *</BodySmallMedium>
              </label>
              <input
                type="number"
                name="screeningScore"
                value={formData.screeningScore}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent"
                placeholder="Masukkan skor depresi"
              />
            </div>
            <div>
              <label className="block mb-2">
                <BodySmallMedium>Interpretasi screening *</BodySmallMedium>
              </label>
              <textarea
                name="depressionInterpretation"
                value={interpretation}
                disabled
                rows={5}
                className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent resize-none"
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/* Anxiety Section */}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="flex-1 px-4 py-2 border border-grey-stroke rounded-lg text-neutral-02 hover:bg-grey-stroke/10 transition-colors text-center disabled:opacity-50"
          >
            Batal
          </button>
          <SubmitButton
            variant="primary"
            text={isPending ? "Membuat..." : "Buat Screening"}
            className="flex-1 flex justify-center items-center"
            disabled={isPending || !selectedTherapyId}
          />
        </div>
      </form>
    </div>
  );
}

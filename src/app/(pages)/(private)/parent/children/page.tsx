"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import {
  useCurrentUser,
  useChildrenByParent,
  useCreateChild,
  useUpdateChild,
  useDeleteChild,
} from "@/services";
import { isParent } from "@/types/auth";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { showToast, showErrorToast } from "@/libs/toast";
import { ICreateChildInput, IUpdateChildInput, IChild } from "@/types/child";

export default function ParentChildrenPage() {
  const { data: user } = useCurrentUser();
  const parentId = user && isParent(user) ? user._id : "";
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const { data: children, isLoading, refetch } = useChildrenByParent(parentId);
  const createChild = useCreateChild();
  const updateChild = useUpdateChild();
  const deleteChild = useDeleteChild();

  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState<IChild | null>(null);
  const [formData, setFormData] = useState<ICreateChildInput>({
    fullname: "",
    nik: "",
    age: 0,
    birth: "",
    childOrder: 1,
    biologicalMotherName: "",
    education: {
      stage: "SD",
      class: 1,
    },
  });

  // Auto open modal if edit query param exists
  useEffect(() => {
    if (editId && children) {
      const childToEdit = children.find((c) => c._id === editId);
      if (childToEdit) {
        handleOpenModal(childToEdit);
      }
    }
  }, [editId, children]);

  const handleOpenModal = (child?: IChild) => {
    if (child) {
      setEditingChild(child);
      setFormData({
        fullname: child.fullname,
        nik: child.nik,
        age: child.age,
        birth: child.birth.split("T")[0], // Format for date input
        childOrder: child.childOrder,
        biologicalMotherName: child.biologicalMotherName,
        education: child.education || { stage: "SD", class: 1 },
      });
    } else {
      setEditingChild(null);
      setFormData({
        fullname: "",
        nik: "",
        age: 0,
        birth: "",
        childOrder: (children?.length || 0) + 1,
        biologicalMotherName: "",
        education: { stage: "SD", class: 1 },
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingChild(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingChild) {
        await updateChild.mutateAsync({
          id: editingChild._id,
          data: formData as IUpdateChildInput,
        });
        showToast.success("Data anak berhasil diperbarui");
      } else {
        await createChild.mutateAsync(formData);
        showToast.success("Anak berhasil ditambahkan");
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleDelete = async (childId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data anak ini?")) return;
    try {
      await deleteChild.mutateAsync(childId);
      showToast.success("Data anak berhasil dihapus");
      refetch();
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading3 className="text-neutral-02">Anak Saya</Heading3>
          <p className="text-grey mt-2">Kelola informasi anak-anak Anda</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="fixed md:static p-4 bottom-4 right-4 md:px-4 md:py-2 bg-moss-stone text-white rounded-full md:rounded-lg hover:bg-moss-stone-dark transition-colors flex items-center gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden md:block">Tambah Anak</span>
        </button>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton for children cards
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-grey-stroke">
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </>
        ) : children && children.length > 0 ? (
          children.map((child) => (
            <div
              key={child._id}
              className="bg-white border border-grey-stroke rounded-xl p-6 hover:border-moss-stone transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-moss-stone/20 rounded-full flex items-center justify-center">
                  <span className="text-moss-stone font-medium text-xl">
                    {child.fullname?.charAt(0).toUpperCase() ||
                      child.nik.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-neutral-02">
                    {child.fullname || `Child #${child.childOrder}`}
                  </h4>
                  <p className="text-sm text-grey">{child.age} tahun</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    NIK
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">{child.nik}</p>
                </div>
                <div>
                  <BodySmallMedium className="text-grey mb-1">
                    Tanggal Lahir
                  </BodySmallMedium>
                  <p className="text-sm text-neutral-02">
                    {new Date(child.birth).toLocaleDateString("id-ID")}
                  </p>
                </div>
                {child.education && (
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Pendidikan
                    </BodySmallMedium>
                    <p className="text-sm text-neutral-02">
                      {child.education.stage} - Kelas {child.education.class}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-grey-stroke flex gap-2">
                <Link
                  href={`/parent/children/${child._id}`}
                  className="flex-1 text-center px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors"
                >
                  Lihat Detail
                </Link>
                <button
                  onClick={() => handleOpenModal(child)}
                  className="px-4 py-2 border border-moss-stone text-moss-stone rounded-lg hover:bg-moss-stone/5 transition-colors"
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
                </button>
                <button
                  onClick={() => handleDelete(child._id)}
                  className="px-4 py-2 border border-error text-error rounded-lg hover:bg-error/5 transition-colors"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-grey mb-2">Belum ada anak yang terdaftar</p>
              <p className="text-sm text-grey mb-4">
                Klik tombol "Tambah Anak" untuk mendaftarkan anak pertama Anda
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-grey-stroke flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-neutral-02">
                {editingChild ? "Edit Data Anak" : "Tambah Anak Baru"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-grey hover:text-neutral-02"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Nama Lengkap <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Masukkan nama lengkap anak"
                  />
                </div>

                {/* NIK */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    NIK <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nik}
                    onChange={(e) =>
                      setFormData({ ...formData, nik: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Masukkan NIK"
                  />
                </div>

                {/* Biological Mother Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Nama Ibu Kandung <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.biologicalMotherName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        biologicalMotherName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Masukkan nama ibu kandung"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Tanggal Lahir <span className="text-error">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birth}
                    onChange={(e) =>
                      setFormData({ ...formData, birth: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Usia <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Usia"
                  />
                </div>

                {/* Child Order */}
                <div>
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Anak Ke- <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.childOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        childOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Anak ke-1, ke-2, ke-3..."
                  />
                </div>

                {/* Education Stage */}
                <div>
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Jenjang Pendidikan <span className="text-error">*</span>
                  </label>
                  <select
                    required
                    value={formData.education.stage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: {
                          ...formData.education,
                          stage: e.target.value as "SD" | "SMP" | "SMA",
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                  >
                    <option value="SD">SD (Sekolah Dasar)</option>
                    <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                    <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                  </select>
                </div>

                {/* Education Class */}
                <div>
                  <label className="block text-sm font-medium text-neutral-02 mb-2">
                    Kelas <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    value={formData.education.class}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: {
                          ...formData.education,
                          class: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone"
                    placeholder="Nomor kelas"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-grey-stroke">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-grey-stroke text-neutral-02 rounded-lg hover:bg-grey-stroke/10 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createChild.isPending || updateChild.isPending}
                  className="flex-1 px-4 py-2 bg-moss-stone text-white rounded-lg hover:bg-moss-stone-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createChild.isPending || updateChild.isPending
                    ? "Menyimpan..."
                    : editingChild
                    ? "Perbarui Data Anak"
                    : "Tambah Anak"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

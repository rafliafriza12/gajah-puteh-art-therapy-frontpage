"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import ImagePlusIcon from "@/components/atoms/icons/ImagePlusIcon";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";

interface SubsidiaryImage {
  id: number;
  src: string;
  alt: string;
}

const SubsidiariesSection = () => {
  const [activeTab, setActiveTab] = useState<"coal" | "mineral">("coal");
  const [coalImages, setCoalImages] = useState<SubsidiaryImage[]>([
    { id: 1, src: "/img/avatar.jpeg", alt: "KPC" },
    { id: 2, src: "/img/avatar.jpeg", alt: "Coal Mine" },
    { id: 3, src: "/img/avatar.jpeg", alt: "Indonesia" },
    { id: 4, src: "/img/avatar.jpeg", alt: "KPC" },
    { id: 5, src: "/img/avatar.jpeg", alt: "Coal Mine" },
    { id: 6, src: "/img/avatar.jpeg", alt: "Indonesia" },
  ]);
  const [mineralImages, setMineralImages] = useState<SubsidiaryImage[]>([]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("Upload image:", files[0]);
    }
  };

  const handleEditImage = (id: number) => {
    console.log("Edit image:", id);
  };

  const handleDeleteImage = (id: number) => {
    if (activeTab === "coal") {
      setCoalImages(coalImages.filter((img) => img.id !== id));
    } else {
      setMineralImages(mineralImages.filter((img) => img.id !== id));
    }
  };

  const currentImages = activeTab === "coal" ? coalImages : mineralImages;

  return (
    <PageMenuContentContainer
      id="SubsidiariesPageBussinesAndOperations"
      title="Subsidiaries"
      refreshFunction={refresh("Subsidiaries")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Category</Heading5>

        {/* Tab Navigation */}
        <div className="w-full border-b border-grey-stroke mb-4">
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => setActiveTab("coal")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "coal"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Coal
              {activeTab === "coal" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("mineral")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "mineral"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Mineral / Non-Coal
              {activeTab === "mineral" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="w-full grid grid-cols-3 gap-4 items-start">
          {currentImages.map((image) => (
            <div
              key={image.id}
              className="w-full aspect-414/520 rounded-xl overflow-hidden relative group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditImage(image.id)}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-grey-lightest flex items-center justify-center transition-colors"
                >
                  <EditIcon className="text-neutral-03" />
                </button>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 flex items-center justify-center transition-colors"
                >
                  <TrashIcon className="text-red-500" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Image */}
          <label className="w-full aspect-414/520 rounded-xl border-2 border-dashed border-grey-stroke bg-grey-lightest hover:border-moss-stone hover:bg-moss-stone/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImagePlusIcon className="text-moss-stone" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-neutral-03">
                Add New Image
              </span>
              <span className="text-xs text-grey">JPG or PNG</span>
              <span className="text-xs text-grey">414px x 520px</span>
              <span className="text-xs text-grey">
                Max 200kb files are allowed
              </span>
            </div>
          </label>
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default SubsidiariesSection;

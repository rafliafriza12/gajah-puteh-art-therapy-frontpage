"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";
import LinkedinIcon from "@/components/atoms/icons/LinkedinIcon";
import InstagramIcon from "@/components/atoms/icons/InstagramIcon";
import Image from "next/image";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const CommitteesSection = () => {
  const [activeTab, setActiveTab] = useState<"boc" | "bod">("boc");
  const [bocStaff, setBocStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "Kanaka Puradiredja",
      position: "Independent Commissioner",
      image: "/img/avatar.jpeg",
    },
    {
      id: 2,
      name: "Kanaka Puradiredja",
      position: "Independent Commissioner",
      image: "/img/avatar.jpeg",
    },
  ]);
  const [bodStaff, setBodStaff] = useState<StaffMember[]>([]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const handleAddStaff = () => {
    console.log("Add new staff member");
  };

  const handleEditStaff = (id: number) => {
    console.log("Edit staff:", id);
  };

  const handleDeleteStaff = (id: number) => {
    if (activeTab === "boc") {
      setBocStaff(bocStaff.filter((staff) => staff.id !== id));
    } else {
      setBodStaff(bodStaff.filter((staff) => staff.id !== id));
    }
  };

  const currentStaff = activeTab === "boc" ? bocStaff : bodStaff;

  return (
    <PageMenuContentContainer
      id="committeesPageGovernance"
      title="Committies"
      refreshFunction={refresh("committies")}
    >
      <div className="w-full flex flex-col gap-4">
        {/* Tab Navigation */}
        <div className="w-full border-b border-grey-stroke">
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => setActiveTab("boc")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "boc"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              BOC Committies
              {activeTab === "boc" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("bod")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "bod"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              BOD Committies
              {activeTab === "bod" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-4 mt-3">
          <div className="flex flex-col gap-2">
            <ContentLabel>Headline</ContentLabel>
            <ContentInput placeholder="Headline" />
          </div>
          <div className="flex flex-col gap-2">
            <ContentLabel>Descriptions</ContentLabel>
            <ContentTextArea placeholder="Descriptions" rows={8} />
          </div>
        </div>

        <div className="w-full h-px bg-grey-stroke"></div>

        {/* Staff List Header */}
        <div className="w-full flex items-center justify-between mt-2">
          <Heading5>Staff List</Heading5>
          <button
            onClick={handleAddStaff}
            className="text-sm text-moss-stone hover:bg-moss-stone/20 duration-200 font-medium flex items-center gap-2 bg-moss-stone/10 rounded-lg px-3 py-1.5"
          >
            <span className="text-sm">+</span>
            Add New Staff
          </button>
        </div>

        {/* Staff Grid */}
        <div className="w-full grid grid-cols-3 gap-6 items-start">
          {currentStaff.map((staff) => (
            <div key={staff.id} className="w-full flex flex-col gap-3">
              {/* Photo */}
              <div className="w-full aspect-3/4 rounded-xl overflow-hidden relative group">
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  className="w-full h-full object-cover"
                />
                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditStaff(staff.id)}
                    className="w-10 h-10 rounded-lg bg-white/90 hover:bg-white/95 flex items-center justify-center transition-colors"
                  >
                    <EditIcon className="text-moss-stone" />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(staff.id)}
                    className="w-10 h-10 rounded-lg bg-white/90 hover:bg-white/95 flex items-center justify-center transition-colors"
                  >
                    <TrashIcon className="text-error" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-neutral-03">
                  {staff.name}
                </h4>
                <p className="text-xs text-moss-stone">{staff.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default CommitteesSection;

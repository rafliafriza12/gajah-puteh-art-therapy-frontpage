"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";
import LinkedinIcon from "@/components/atoms/icons/LinkedinIcon";
import InstagramIcon from "@/components/atoms/icons/InstagramIcon";
import { Heading5 } from "@/components/atoms/Typography";
import Image from "next/image";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  instagram?: string;
}

const OurTeamsSection = () => {
  const [activeTab, setActiveTab] = useState<"commissioners" | "directors">(
    "commissioners"
  );
  const [commissioners, setCommissioners] = useState<StaffMember[]>([
    {
      id: 1,
      name: "Sharif Cicip Sutardjo",
      position: "President Commissioner and Independent Commissioner",
      image: "/img/avatar.jpeg",
    },
    {
      id: 2,
      name: "Adika Nuraga Bakrie",
      position: "President Director",
      image: "/img/avatar.jpeg",
    },
    {
      id: 3,
      name: "Adika Nuraga Bakrie",
      position: "President Director",
      image: "/img/avatar.jpeg",
    },
  ]);
  const [directors, setDirectors] = useState<StaffMember[]>([]);

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
    if (activeTab === "commissioners") {
      setCommissioners(commissioners.filter((staff) => staff.id !== id));
    } else {
      setDirectors(directors.filter((staff) => staff.id !== id));
    }
  };

  const currentStaff = activeTab === "commissioners" ? commissioners : directors;

  return (
    <PageMenuContentContainer
      id="ourTeamsPageGovernance"
      title="Our Teams"
      refreshFunction={refresh("ourTeams")}
    >
      <div className="w-full flex flex-col gap-4">
        {/* Tab Navigation */}
        <div className="w-full border-b border-grey-stroke">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setActiveTab("commissioners")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "commissioners"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Board of Commissioners
              {activeTab === "commissioners" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("directors")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "directors"
                  ? "text-moss-stone"
                  : "text-neutral-02 hover:text-neutral-03"
              }`}
            >
              Board of Directors
              {activeTab === "directors" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moss-stone"></div>
              )}
            </button>
          </div>
        </div>

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
                <h4 className="text-base font-normal text-neutral-03">
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

export default OurTeamsSection;

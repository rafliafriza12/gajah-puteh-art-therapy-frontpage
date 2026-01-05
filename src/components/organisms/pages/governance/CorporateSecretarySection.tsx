"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import CalendarIcon from "@/components/atoms/icons/CalendarIcon";

interface Experience {
  id: number;
  position: string;
  year: string;
}

const CorporateSecretarySection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      position: "Superintendent for Legal Division PT Bumi Resources, Tbk",
      year: "2016",
    },
    {
      id: 2,
      position: "Corporate Secretary Manager PT Bumi Resources, Tbk",
      year: "2012",
    },
    {
      id: 3,
      position: "VP Corporate Secretary PT Bumi Resources, Tbk",
      year: "2015 - Present",
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("Upload image:", files[0]);
    }
  };

  return (
    <PageMenuContentContainer
      id="corporateSecretaryPageGovernance"
      title="Corporate Secretary"
      refreshFunction={refresh("corporateSecretary")}
    >
      <div className="w-full grid grid-cols-5 gap-4">
        {/* Media Upload */}
        <div className="flex flex-col gap-2 col-span-2">
          <ContentLabel className="text-xs">Media Upload</ContentLabel>
          <p className="text-xs text-grey">Add your image here.  </p>
          <label className="w-full max-w-xs aspect-5/6 rounded-xl border-2 border-dashed border-grey-stroke bg-grey-lightest hover:border-moss-stone hover:bg-moss-stone/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
            <svg
              className="w-12 h-12 text-charcoal-green-lighter"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 15V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-neutral-03">
                Drag your file(s) or browse
              </span>
              <span className="text-xs text-grey">
                Max 200 kb files are allowed
              </span>
              <span className="text-xs text-grey">414px x 474px</span>
            </div>
            <div className="text-xs text-grey">
              Only support .jpg & .png files
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-4 col-span-3">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <ContentLabel>Name</ContentLabel>
            <ContentInput placeholder="Name" />
          </div>

          {/* Descriptions */}
          <div className="flex flex-col gap-2">
            <ContentLabel>Descriptions</ContentLabel>
            <ContentTextArea placeholder="Descriptions" rows={6} />
          </div>
        </div>

        <div className="w-full h-px bg-grey-stroke col-span-5 my-2"></div>

        {/* Experience */}
        <Heading5 className="col-span-5">Experience</Heading5>

        {/* Experience List */}
        <div className="w-full flex flex-col gap-4 col-span-5">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="w-full flex flex-col gap-3">
              <div className="text-sm text-moss-stone font-medium">
                Experience {index + 1}
              </div>
              <div className="w-full grid grid-cols-[1fr_auto] gap-4">
                {/* Position */}
                <div className="flex flex-col gap-2">
                  <ContentLabel>Position</ContentLabel>
                  <ContentInput
                    placeholder="Position"
                    value={exp.position}
                    className="text-xs"
                    onChange={(e) => {
                      setExperiences(
                        experiences.map((item) =>
                          item.id === exp.id
                            ? { ...item, position: e.target.value }
                            : item
                        )
                      );
                    }}
                  />
                </div>

                {/* Year */}
                <div className="flex flex-col gap-2">
                  <ContentLabel>Year</ContentLabel>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CalendarIcon className="w-5 h-5 text-grey" />
                    </div>
                    <ContentInput
                      placeholder="Year"
                      value={exp.year}
                      onChange={(e) => {
                        setExperiences(
                          experiences.map((item) =>
                            item.id === exp.id
                              ? { ...item, year: e.target.value }
                              : item
                          )
                        );
                      }}
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default CorporateSecretarySection;

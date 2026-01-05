"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput } from "@/components/atoms/Input";
import CallIcon from "@/components/atoms/icons/CallIcon";
import VoiceMailIcon from "@/components/atoms/icons/VoiceMailIcon";
import BuildingIcon from "@/components/atoms/icons/BuildingIcon";
import SimplePaperNoteIcon from "@/components/atoms/icons/SimplePaperNote";

interface ProfessionalService {
  id: number;
  name: string;
  address: string;
  phone: string;
  fax?: string;
  ext?: string;
}

const SupportingProfessionSection = () => {
  const [services, setServices] = useState<ProfessionalService[]>([
    {
      id: 1,
      name: "Public Accountant Amir Abadi Jusuf, Aryanto, Mawar & Rekan",
      address: "Plaza Asia Level 10, Jl. Jend. Sudirman Kav. 59, Jakarta 12190",
      phone: "+6221 514913430",
      fax: "+6221 51491360",
    },
    {
      id: 2,
      name: "Securities Administration Bureau PT Ficomindo Buana Registrar",
      address: "Jl. Ryal Cemara No. 2 J, Jakarta 11950",
      phone: "+6221 2263 6937",
      fax: "+6221 2263 9048",
    },
    {
      id: 3,
      name: "Trustee PT Bank BRI Bukopin Tbk Treasury Division - Trustee Dept. Unit",
      address:
        "Bank Bukopin Tower 9th Floor, Jl. MT Haryono Kav. 50-51, Jakarta 12770",
      phone: "+6221 79182096",
      ext: "3849/1481/2882",
      fax: "+6221 7980765",
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  return (
    <PageMenuContentContainer
      id="supportingProfessionPageGovernance"
      title="Supporting Profession"
      refreshFunction={refresh("supportingProfession")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>

        <div className="w-full h-px bg-grey-stroke"></div>

        <Heading5>Professional Service List</Heading5>

        {/* Service List */}
        <div className="w-full flex flex-col gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="w-full flex flex-col gap-4">
              <div className="text-sm text-moss-stone font-medium">
                Address {index + 1}
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">Name</ContentLabel>
                  <ContentInput
                    className="text-xs"
                    placeholder="Name"
                    value={service.name}
                    onChange={(e) => {
                      setServices(
                        services.map((item) =>
                          item.id === service.id
                            ? { ...item, name: e.target.value }
                            : item
                        )
                      );
                    }}
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">Address</ContentLabel>
                  <ContentInput
                    className="text-xs"
                    placeholder="Address"
                    value={service.address}
                    onChange={(e) => {
                      setServices(
                        services.map((item) =>
                          item.id === service.id
                            ? { ...item, address: e.target.value }
                            : item
                        )
                      );
                    }}
                  />
                </div>
              </div>

              <div
                className={`w-full grid ${
                  service.ext && service.fax ? "grid-cols-3" : "grid-cols-2"
                } gap-4`}
              >
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">Phone</ContentLabel>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CallIcon className="w-5 h-5 text-grey" />
                    </div>
                    <ContentInput
                      placeholder="Phone"
                      value={service.phone}
                      onChange={(e) => {
                        setServices(
                          services.map((item) =>
                            item.id === service.id
                              ? { ...item, phone: e.target.value }
                              : item
                          )
                        );
                      }}
                      className="pl-12 text-xs"
                    />
                  </div>
                </div>

                {/* Fax/Ext */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">
                    {service.ext ? "Ext." : "Fax"}
                  </ContentLabel>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      {/* <VoiceMailIcon className="w-5 h-5 text-grey" /> */}
                      {service.ext ? (
                        <BuildingIcon className="w-5 h-5 text-grey" />
                      ) : (
                        <SimplePaperNoteIcon className="w-5 h-5 text-grey" />
                      )}
                    </div>
                    <ContentInput
                      placeholder={service.ext ? "Ext." : "Fax"}
                      value={service.ext || service.fax || ""}
                      onChange={(e) => {
                        setServices(
                          services.map((item) =>
                            item.id === service.id
                              ? service.ext
                                ? { ...item, ext: e.target.value }
                                : { ...item, fax: e.target.value }
                              : item
                          )
                        );
                      }}
                      className="pl-12 text-xs"
                    />
                  </div>
                </div>
                {/* Third row for services with both Ext and Fax */}
                {service.ext && service.fax && (
                  <div>
                    <div className="flex flex-col gap-2">
                      <ContentLabel className="text-xs">Fax</ContentLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <SimplePaperNoteIcon className="w-5 h-5 text-grey" />
                        </div>
                        <ContentInput
                          placeholder="Fax"
                          value={service.fax}
                          onChange={(e) => {
                            setServices(
                              services.map((item) =>
                                item.id === service.id
                                  ? { ...item, fax: e.target.value }
                                  : item
                              )
                            );
                          }}
                          className="pl-12 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default SupportingProfessionSection;


import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import PageMenuContentContainer from "@/components/organisms/pages/PageMenuContentContainer";
import { useState } from "react";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import LinkIcon from "@/components/atoms/icons/LinkIcon";

interface ContactData {
  id: number;
  name: string;
  detail: string;
  link: string;
}


const ContactSection = () => {
  const [contacts, setContacts] = useState<ContactData[]>([
    {
      id: 1,
      name: "Career & Internship",
      detail: "talentaquisition@bumiresources.com",
      link: "talentaquisition@bumiresources.com",
    },
    {
      id: 2,
      name: "Investor & Relations",
      detail: "investor.relations@bumiresources.com",
      link: "talentaquisition@bumiresources.com",
    },
    {
      id: 3,
      name: "Investor & Relations",
      detail: "investor.relations@bumiresources.com",
      link: "talentaquisition@bumiresources.com",
    },
    {
      id: 4,
      name: "Investor & Relations",
      detail: "investor.relations@bumiresources.com",
      link: "talentaquisition@bumiresources.com",
    },
  ]);
  const [openContactIds, setOpenContactIds] = useState<number[]>(
    contacts.map((contact) => contact.id)
  );

  const toggleContact = (id: number) => {
    setOpenContactIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleContactChange = (
    id: number,
    field: keyof ContactData,
    value: string
  ) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };
  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };
  return (
    <PageMenuContentContainer
      id="contactPageHome"
      title="Contact"
      refreshFunction={refresh("contact")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea
            placeholder="Descriptions"
            maxLength={200}
            
          />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Contact List</Heading5>
        <div className="w-full grid grid-cols-2 gap-4 items-start">
          {contacts.map((contact) => {
            const isOpen = openContactIds.includes(contact.id);
            return (
              <div
                key={contact.id}
                className="w-full border border-grey-stroke rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleContact(contact.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-neutral-01 hover:bg-grey-lightest transition-colors"
                >
                  <span className="text-sm font-medium">
                    Contact {contact.id}
                  </span>
                  <ChevronLeftIcon
                    className={`w-5 h-5 text-neutral-02 transition-transform duration-200 ${
                      isOpen ? "-rotate-90" : "rotate-180"
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-5 py-4 flex flex-col gap-4 bg-neutral-01">
                    <div className="flex flex-col gap-2">
                      <ContentLabel>Contact Name</ContentLabel>
                      <ContentInput
                        placeholder="Contact Name"
                        value={contact.name}
                        onChange={(e) =>
                          handleContactChange(
                            contact.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <ContentLabel>Contact Detail</ContentLabel>
                      <ContentInput
                        placeholder="Contact Detail"
                        value={contact.detail}
                        onChange={(e) =>
                          handleContactChange(
                            contact.id,
                            "detail",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <ContentLabel>Link</ContentLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <LinkIcon className="w-5 h-5 text-grey" />
                        </div>
                        <ContentInput
                          placeholder="Link"
                          value={contact.link}
                          onChange={(e) =>
                            handleContactChange(
                              contact.id,
                              "link",
                              e.target.value
                            )
                          }
                          className="pl-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default ContactSection;

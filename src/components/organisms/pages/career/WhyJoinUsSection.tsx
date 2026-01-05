import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";

interface Card {
  id: number;
  headline: string;
  description: string;
  image: {
    url: string;
    uploadProgress?: number;
  } | null;
}

const WhyJoinUsSection = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      headline: "Growth Opportunities",
      description:
        "Build your skills and advance your career in a leading natural resources company.",
      image: {
        url: "/img/avatar.jpeg",
      },
    },
    {
      id: 2,
      headline: "Meaningful Impact",
      description:
        "Contribute to sustainable development and responsible resource management.",
      image: {
        url: "/img/avatar.jpeg",
      },
    },
    {
      id: 3,
      headline: "Supportive Culture",
      description:
        "Work in an environment that values collaboration and well-being.",
      image: {
        url: "/img/avatar.jpeg",
        uploadProgress: 60,
      },
    },
    {
      id: 4,
      headline: "Competitive Benefits",
      description:
        "Enjoy remuneration and benefits on par with top industry standards.",
      image: null,
    },
  ]);
  const [openCardIds, setOpenCardIds] = useState<number[]>(
    cards.map((card) => card.id)
  );

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const toggleCard = (id: number) => {
    setOpenCardIds((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (
    cardId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setCards(
        cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                image: {
                  url: imageUrl,
                  uploadProgress: 0,
                },
              }
            : card
        )
      );
    }
  };

  const handleCancelUpload = (cardId: number) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, image: null } : card
      )
    );
  };

  const handleCardChange = (
    cardId: number,
    field: keyof Card,
    value: string
  ) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };
  return (
    <PageMenuContentContainer
      id="whyJoinUsPageCareer"
      title="Why Join Us?"
      refreshFunction={refresh("whyJoinUs")}
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
            maxLength={500}
            rows={6}
          />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Content List</Heading5>
        <div className="w-full flex flex-col gap-3">
          {cards.map((card) => {
            const isOpen = openCardIds.includes(card.id);
            return (
              <div
                key={card.id}
                className="w-full border border-grey-stroke rounded-xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleCard(card.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-grey-lightest transition-colors"
                >
                  <span className="text-sm font-medium">Card {card.id}</span>
                  <ChevronLeftIcon
                    className={`w-5 h-5 text-neutral-02 transition-transform duration-200 ${
                      isOpen ? "-rotate-90" : "rotate-180"
                    }`}
                  />
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-5 py-4 border-t border-grey-stroke bg-white flex gap-4">
                    {/* Image Upload Area */}
                    <div className="w-[200px] shrink-0">
                      {card.image ? (
                        <div className="w-full aspect-3/4 rounded-xl overflow-hidden relative">
                          <img
                            src={card.image.url}
                            alt={card.headline}
                            className="w-full h-full object-cover"
                          />
                          {/* Upload Progress Overlay */}
                          {card.image.uploadProgress !== undefined &&
                            card.image.uploadProgress < 100 && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                                {/* Circular Progress */}
                                <div className="relative w-16 h-16">
                                  <svg
                                    className="w-16 h-16 transform -rotate-90"
                                    viewBox="0 0 64 64"
                                  >
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      fill="none"
                                      stroke="rgba(255,255,255,0.2)"
                                      strokeWidth="4"
                                    />
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      fill="none"
                                      stroke="#A0AC67"
                                      strokeWidth="4"
                                      strokeDasharray={`${2 * Math.PI * 28}`}
                                      strokeDashoffset={`${
                                        2 *
                                        Math.PI *
                                        28 *
                                        (1 - card.image.uploadProgress / 100)
                                      }`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                      {card.image.uploadProgress}%
                                    </span>
                                  </div>
                                </div>
                                {/* Uploading Text */}
                                <span className="text-white text-xs">
                                  Uploading...
                                </span>
                                {/* Cancel Button */}
                                <button
                                  onClick={() => handleCancelUpload(card.id)}
                                  className="px-4 py-1.5 bg-white/90 hover:bg-white rounded-lg text-xs font-medium text-neutral-03 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                        </div>
                      ) : (
                        <label className="w-full aspect-3/4 cursor-pointer">
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => handleImageUpload(card.id, e)}
                            className="hidden"
                          />
                          <div className="w-full h-full border-2 border-dashed border-grey-stroke rounded-xl bg-grey-lightest hover:border-moss-stone hover:bg-moss-stone/5 transition-colors flex flex-col items-center justify-center gap-3 p-4">
                            <svg
                              className="w-10 h-10 text-charcoal-green-lighter"
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
                            <div className="text-center">
                              <p className="text-xs text-neutral-03">
                                Drag your file(s) or{" "}
                                <span className="text-charcoal-green-lighter underline font-medium">
                                  browse
                                </span>
                              </p>
                              <p className="text-xs text-grey mt-3">
                                Max 200 KB files are allowed
                              </p>
                            </div>
                            <p className="text-xs text-grey">305px x 405px</p>
                          </div>
                        </label>
                      )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Headline */}
                      <div className="flex flex-col gap-2">
                        <ContentLabel className="text-xs font-medium text-neutral-03">
                          Headline
                        </ContentLabel>
                        <ContentInput
                          placeholder="Headline"
                          className="text-xs"
                          value={card.headline}
                          onChange={(e) =>
                            handleCardChange(
                              card.id,
                              "headline",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Descriptions */}
                      <div className="flex flex-col gap-2">
                        <ContentLabel className="text-xs font-medium text-neutral-03">
                          Descriptions
                        </ContentLabel>
                        <ContentTextArea
                          className="text-xs"
                          placeholder="Descriptions"
                          value={card.description}
                          onChange={(e) =>
                            handleCardChange(
                              card.id,
                              "description",
                              e.target.value
                            )
                          }
                          maxLength={200}
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

export default WhyJoinUsSection;

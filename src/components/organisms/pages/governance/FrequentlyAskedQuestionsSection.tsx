"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const FrequentlyAskedQuestionsSection = () => {
  const [openQuestionIds, setOpenQuestionIds] = useState<number[]>([1]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "When should you use the Speak Up System?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuam viverra amet neque, vel tincidunt ligula porttitor quis. Fusce sit consectetur.",
    },
    {
      id: 2,
      question: "In BUMI's Code of Conduct, what does a Speak Up System mean?",
      answer: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 3,
      question:
        "How to report the violation of the Code of Conduct to the Speak Up System?",
      answer: "Lorem ipsum dolor sit amet...",
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const handleAddQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id), 0) + 1;
    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
  };

  const handleEditQuestion = (id: number) => {
    console.log("Edit question:", id);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    setOpenQuestionIds(openQuestionIds.filter((qId) => qId !== id));
  };

  return (
    <PageMenuContentContainer
      id="frequentlyAskedQuestionsPageGovernance"
      title="Frequently Asked Questions"
      refreshFunction={refresh("faq")}
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

        {/* Question List Header */}
        <Heading5>Question List</Heading5>

        {/* Questions */}
        <div className="w-full flex flex-col gap-3">
          {questions.map((question) => {
            const isOpen = openQuestionIds.includes(question.id);
            return (
              <div className="flex gap-4" key={question.id}>
                <div                  
                  className="w-full border border-grey-stroke rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(question.id)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-grey-lightest transition-colors"
                  >
                    <span className="text-sm font-medium text-left">
                      {question.question}
                    </span>
                    <div className="flex items-center gap-2 ml-4">
                      <ChevronLeftIcon
                        className={`w-5 h-5 text-neutral-02 transition-transform duration-200 shrink-0 ${
                          isOpen ? "-rotate-90" : "rotate-180"
                        }`}
                      />
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-5 py-4 border-t border-grey-stroke bg-white flex items-start justify-between gap-4">
                      <p className="text-sm text-grey text-xs">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditQuestion(question.id);
                    }}
                    className="text-moss-stone hover:text-moss-stone/80"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuestion(question.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Question Button */}
        <button
          onClick={handleAddQuestion}
          className="w-full py-3 border border-moss-stone rounded-lg text-sm text-moss-stone hover:border-moss-stone hover:bg-moss-stone/5 font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-lg">+</span>
          Add New Question
        </button>
      </div>
    </PageMenuContentContainer>
  );
};

export default FrequentlyAskedQuestionsSection;

"use client";

import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput, ContentTextArea } from "@/components/atoms/Input";
import PDFIcon from "@/components/atoms/icons/PDFIcon";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";

interface Document {
  id: number;
  name: string;
  file: {
    name: string;
    size: string;
    uploadProgress?: number;
  } | null;
}

const PolicySection = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Sustainability Policy",
      file: {
        name: "Sustainability Policy.pdf",
        size: "9.6 MB",
      },
    },
    {
      id: 2,
      name: "BUMI Human Rights Policy",
      file: {
        name: "BUMI Human Rights Policy.pdf",
        size: "9.6 MB",
        uploadProgress: 80,
      },
    },
    {
      id: 3,
      name: "CSR Policy & Procedure V.2",
      file: null,
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const handleFileUpload = (
    documentId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("Upload file for document:", documentId, files[0]);
      // Simulate upload
      setDocuments(
        documents.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                file: {
                  name: files[0].name,
                  size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
                  uploadProgress: 0,
                },
              }
            : doc
        )
      );
    }
  };

  const handleDeleteDocument = (documentId: number) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId));
  };

  const handleRemoveFile = (documentId: number) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === documentId ? { ...doc, file: null } : doc
      )
    );
  };

  return (
    <PageMenuContentContainer
      id="policyPageSustainability"
      title="Policy"
      refreshFunction={refresh("policy")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="flex flex-col gap-2">
          <ContentLabel>Descriptions</ContentLabel>
          <ContentTextArea placeholder="Descriptions" rows={8} />
        </div>

        <div className="w-full h-px bg-grey-stroke"></div>

        <Heading5>Document List</Heading5>

        {/* Documents */}
        <div className="w-full flex flex-col gap-6">
          {documents.map((document, index) => (
            <div key={document.id} className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-base text-moss-stone font-medium">
                  Document {index + 1}
                </div>
                <button
                  onClick={() => handleDeleteDocument(document.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                {/* Document Name */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">Document Name</ContentLabel>
                  <ContentInput
                    className="text-xs"
                    placeholder="Document Name"
                    value={document.name}
                    onChange={(e) => {
                      setDocuments(
                        documents.map((doc) =>
                          doc.id === document.id
                            ? { ...doc, name: e.target.value }
                            : doc
                        )
                      );
                    }}
                  />
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <ContentLabel className="text-xs">File Upload</ContentLabel>
                  {document.file ? (
                    <div className="w-full">
                      {/* Uploaded File Display */}
                      <div className="w-full flex items-center gap-3 px-4 py-3 border border-grey-stroke rounded-xl bg-white">
                        <PDFIcon className="w-10 h-10 text-red-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-03 truncate">
                            {document.file.name}
                          </p>
                          <p className="text-xs text-neutral-02">
                            {document.file.size}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => console.log("Edit file")}
                            className="text-moss-stone hover:text-moss-stone/80"
                          >
                            <EditIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveFile(document.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      {/* Upload Progress */}
                      {document.file.uploadProgress !== undefined &&
                        document.file.uploadProgress < 100 && (
                          <div className="w-full mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-neutral-02">
                                Uploading...
                              </span>
                              <span className="text-xs text-neutral-02">
                                {document.file.uploadProgress}%
                              </span>
                            </div>
                            <div className="w-full h-1 bg-grey-stroke rounded-full overflow-hidden">
                              <div
                                className="h-full bg-moss-stone transition-all duration-300"
                                style={{
                                  width: `${document.file.uploadProgress}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <label className="w-full cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(document.id, e)}
                        className="hidden"
                      />
                      <div className="w-full px-4 py-8 border-2 border-dashed border-grey-stroke rounded-xl bg-grey-lightest hover:border-moss-stone hover:bg-moss-stone/5 transition-colors flex flex-col items-center gap-3">
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
                          <p className="text-sm text-neutral-03">
                            Drag your file(s) or{" "}
                            <span className="text-charcoal-green-lighter underline font-medium">
                              browse
                            </span>
                          </p>
                          <p className="text-xs text-grey mt-3">
                            Max 10 MB files are allowed
                          </p>
                        </div>
                        <p className="text-xs text-grey">
                          Only support .pdf files
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageMenuContentContainer>
  );
};

export default PolicySection;

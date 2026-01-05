import React, { useState } from "react";
import PageMenuContentContainer from "../PageMenuContentContainer";
import { ContentLabel, Heading5 } from "@/components/atoms/Typography";
import { ContentInput } from "@/components/atoms/Input";
import { ContentTextArea } from "@/components/atoms/Input";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import PDFIcon from "@/components/atoms/icons/PDFIcon";
import EditIcon from "@/components/atoms/icons/EditIcon";
import TrashIcon from "@/components/atoms/icons/TrashIcon";

interface Asset {
  id: number;
  name: string;
  file: {
    name: string;
    size: string;
    uploadProgress?: number;
  } | null;
}

interface ContentItem {
  id: number;
  title: string;
  description?: string;
  type: "text" | "assets";
  assets?: Asset[];
}

const MediaKitSection = () => {
  const [openItemIds, setOpenItemIds] = useState<number[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Who we Are?",
      type: "text",
      description:
        "BUMI is a leading energy and natural resources company committed to driving sustainable growth for Indonesia and beyond. Rooted in responsibility, we balance performance with purpose—harnessing our resources to create long-term value for stakeholders, empower communities, and protect the environment. Guided by strong governance and a forward-looking vision, we continue to evolve toward a more sustainable and resilient future.",
    },
    {
      id: 2,
      title: "Our Leadership",
      type: "text",
      description: "",
    },
    {
      id: 3,
      title: "Assets",
      type: "assets",
      assets: [
        {
          id: 1,
          name: "Logo",
          file: {
            name: "BUMI Resources Logo.pdf",
            size: "8.6 MB",
          },
        },
        {
          id: 2,
          name: "Brand Colors",
          file: {
            name: "BUMI Resources Brand Colors.pdf",
            size: "8.6 MB",
          },
        },
        {
          id: 3,
          name: "Font",
          file: {
            name: "BUMI Resources Font.pdf",
            size: "8.6 MB",
            uploadProgress: 60,
          },
        },
        {
          id: 4,
          name: "Brand Patterns",
          file: null,
        },
      ],
    },
    {
      id: 4,
      title: "Boilerplate",
      type: "text",
      description: "",
    },
  ]);

  const refresh = (section: string) => () => {
    console.log(`Refresh ${section} section`);
  };

  const toggleItem = (id: number) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleDescriptionChange = (id: number, value: string) => {
    setContentItems(
      contentItems.map((item) =>
        item.id === id ? { ...item, description: value } : item
      )
    );
  };

  const handleFileUpload = (
    contentId: number,
    assetId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      setContentItems(
        contentItems.map((item) =>
          item.id === contentId && item.assets
            ? {
                ...item,
                assets: item.assets.map((asset) =>
                  asset.id === assetId
                    ? {
                        ...asset,
                        file: {
                          name: files[0].name,
                          size: `${(files[0].size / (1024 * 1024)).toFixed(
                            1
                          )} MB`,
                          uploadProgress: 0,
                        },
                      }
                    : asset
                ),
              }
            : item
        )
      );
    }
  };

  const handleRemoveFile = (contentId: number, assetId: number) => {
    setContentItems(
      contentItems.map((item) =>
        item.id === contentId && item.assets
          ? {
              ...item,
              assets: item.assets.map((asset) =>
                asset.id === assetId ? { ...asset, file: null } : asset
              ),
            }
          : item
      )
    );
  };

  const handleDeleteAsset = (contentId: number, assetId: number) => {
    setContentItems(
      contentItems.map((item) =>
        item.id === contentId && item.assets
          ? {
              ...item,
              assets: item.assets.filter((asset) => asset.id !== assetId),
            }
          : item
      )
    );
  };
  return (
    <PageMenuContentContainer
      id="mediaKitPageMedia"
      title="Media Kit"
      refreshFunction={refresh("mediaKit")}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ContentLabel>Headline</ContentLabel>
          <ContentInput placeholder="Headline" />
        </div>
        <div className="w-full h-px bg-grey-stroke"></div>
        <Heading5>Content List</Heading5>
        <div className="w-full flex flex-col gap-3">
          {contentItems.map((item) => {
            const isOpen = openItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="w-full border border-grey-stroke rounded-xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-grey-lightest transition-colors"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <ChevronLeftIcon
                    className={`w-5 h-5 text-neutral-02 transition-transform duration-200 ${
                      isOpen ? "-rotate-90" : "rotate-180"
                    }`}
                  />
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-5 py-4 border-t border-grey-stroke bg-white">
                    {item.type === "text" ? (
                      /* Text Content */
                      <ContentTextArea
                        placeholder="Description"
                        value={item.description || ""}
                        onChange={(e) =>
                          handleDescriptionChange(item.id, e.target.value)
                        }
                        rows={8}
                        maxLength={500}
                      />
                    ) : (
                      /* Assets Content */
                      <div className="w-full flex flex-col gap-6">
                        {item.assets?.map((asset) => (
                          <div
                            key={asset.id}
                            className="w-full flex flex-col gap-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-moss-stone font-medium">
                                Assets
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteAsset(item.id, asset.id)
                                }
                                className="text-red-500 hover:text-red-600"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-4">
                              {/* Assets Name */}
                              <div className="flex flex-col gap-2">
                                <ContentLabel className="text-xs font-medium text-neutral-03">
                                  Assets Name
                                </ContentLabel>
                                <div className="px-4 py-3 border border-grey-stroke rounded-xl bg-grey-lightest">
                                  <span className="text-xs text-neutral-03">
                                    {asset.name}
                                  </span>
                                </div>
                              </div>

                              {/* File Upload */}
                              <div className="flex flex-col gap-2">
                                <ContentLabel className="text-xs font-medium text-neutral-03">
                                  File Upload
                                </ContentLabel>
                                {asset.file ? (
                                  <div className="w-full">
                                    {/* Uploaded File Display */}
                                    <div className="w-full flex items-center gap-3 px-4 py-3 border border-grey-stroke rounded-xl bg-white">
                                      <PDFIcon className="w-10 h-10 text-red-500 shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-neutral-03 truncate">
                                          {asset.file.name}
                                        </p>
                                        <p className="text-xs text-neutral-02">
                                          {asset.file.size}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <button
                                          onClick={() =>
                                            console.log("Edit file")
                                          }
                                          className="text-moss-stone hover:text-moss-stone/80"
                                        >
                                          <EditIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleRemoveFile(item.id, asset.id)
                                          }
                                          className="text-red-500 hover:text-red-600"
                                        >
                                          <TrashIcon className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                    {/* Upload Progress */}
                                    {asset.file.uploadProgress !== undefined &&
                                      asset.file.uploadProgress < 100 && (
                                        <div className="w-full mt-2">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-neutral-02">
                                              Uploading...
                                            </span>
                                            <span className="text-xs text-neutral-02">
                                              {asset.file.uploadProgress}%
                                            </span>
                                          </div>
                                          <div className="w-full h-1 bg-grey-stroke rounded-full overflow-hidden">
                                            <div
                                              className="h-full bg-moss-stone transition-all duration-300"
                                              style={{
                                                width: `${asset.file.uploadProgress}%`,
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
                                      onChange={(e) =>
                                        handleFileUpload(item.id, asset.id, e)
                                      }
                                      className="hidden"
                                    />
                                    <div className="w-full px-4 py-8 border-2 border-dashed border-grey-stroke rounded-xl bg-grey-lightest hover:border-moss-stone hover:bg-moss-stone/5 transition-colors flex flex-col items-center gap-3">
                                      <svg
                                        className="w-10 h-10 text-moss-stone"
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
                                          <span className="text-moss-stone font-medium">
                                            browse
                                          </span>
                                        </p>
                                        <p className="text-xs text-neutral-02 mt-1">
                                          Max 10 MB files are allowed
                                        </p>
                                      </div>
                                      <p className="text-xs text-neutral-02">
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
                    )}
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

export default MediaKitSection;

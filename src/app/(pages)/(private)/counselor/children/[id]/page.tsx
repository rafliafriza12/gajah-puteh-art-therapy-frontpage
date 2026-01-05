"use client";

import {
  Heading3,
  Heading5,
  BodySmallMedium,
} from "@/components/atoms/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useChild, useParent, useTherapies } from "@/services";

export default function ChildDetailPage() {
  const params = useParams();
  const childId = params.id as string;

  const { data: child, isLoading: childLoading } = useChild(childId);
  const { data: parent, isLoading: parentLoading } = useParent(
    child?.parentId || ""
  );
  const { data: allTherapies, isLoading: therapiesLoading } = useTherapies();

  // Filter therapies untuk child ini
  const childTherapies = allTherapies?.filter(
    (therapy) => therapy.childId === childId
  );

  const isLoading = childLoading || parentLoading;

  if (!child && !isLoading) {
    return (
      <div className="">
        <div className="bg-white border border-grey-stroke rounded-xl p-12 text-center">
          <p className="text-grey">Child not found</p>
          <Link
            href="/counselor/children"
            className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mt-4 inline-block"
          >
            ← Back to Children List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header with Back Button */}
      <div className="mb-6">
        <Link
          href="/counselor/children"
          className="text-moss-stone hover:text-moss-stone-dark font-medium text-sm mb-4 inline-block"
        >
          ← Back to Children List
        </Link>
        <Heading3 className="text-neutral-02">Child Details</Heading3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child Information */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <>
              {/* Basic Info Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Education Skeleton */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : child ? (
            <>
              {/* Basic Info Card */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <Heading5 className="text-neutral-02 mb-4">
                  Basic Information
                </Heading5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <BodySmallMedium className="text-grey mb-1">
                      Full Name
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.fullname}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      NIK
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.nik}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Age
                    </BodySmallMedium>
                    <p className="text-neutral-02">{child.age} years</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Date of Birth
                    </BodySmallMedium>
                    <p className="text-neutral-02">
                      {new Date(child.birth).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Child Order
                    </BodySmallMedium>
                    <p className="text-neutral-02">Child #{child.childOrder}</p>
                  </div>
                  <div className="md:col-span-2">
                    <BodySmallMedium className="text-grey mb-1">
                      Biological Mother
                    </BodySmallMedium>
                    <p className="text-neutral-02">
                      {child.biologicalMotherName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Information */}
              {child.education && (
                <div className="bg-white border border-grey-stroke rounded-xl p-6">
                  <Heading5 className="text-neutral-02 mb-4">
                    Education Information
                  </Heading5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <BodySmallMedium className="text-grey mb-1">
                        Education Stage
                      </BodySmallMedium>
                      <p className="text-neutral-02">{child.education.stage}</p>
                    </div>
                    <div>
                      <BodySmallMedium className="text-grey mb-1">
                        Class/Grade
                      </BodySmallMedium>
                      <p className="text-neutral-02">
                        Class {child.education.class}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Therapy Sessions */}
              <div className="bg-white border border-grey-stroke rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading5 className="text-neutral-02">
                    Therapy Sessions
                  </Heading5>
                  <Link
                    href={`/counselor/therapy/create?childId=${child._id}`}
                    className="text-sm text-moss-stone hover:text-moss-stone-dark font-medium"
                  >
                    + New Session
                  </Link>
                </div>
                {therapiesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 border border-grey-stroke rounded-lg animate-pulse"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                          <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                        <div className="w-20 h-8 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                ) : childTherapies && childTherapies.length > 0 ? (
                  <div className="space-y-3">
                    {childTherapies.map((therapy, index) => (
                      <div
                        key={therapy._id}
                        className="flex items-center gap-4 p-4 border border-grey-stroke rounded-lg hover:bg-grey-stroke/5 transition-colors"
                      >
                        <div className="w-10 h-10 bg-moss-stone/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-moss-stone">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-02">
                            Terapi #{index + 1}
                          </p>
                          <p className="text-xs text-grey">
                            {new Date(therapy.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/counselor/therapy/${therapy._id}`}
                          className="px-4 py-2 text-sm text-moss-stone border border-moss-stone rounded-lg hover:bg-moss-stone hover:text-white transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-grey text-sm mb-3">
                      No therapy sessions yet for this child
                    </p>
                    <Link
                      href={`/counselor/therapy/create?childId=${child._id}`}
                      className="text-moss-stone hover:underline text-sm"
                    >
                      Create first session →
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Parent Information Sidebar */}
        <div className="lg:col-span-1">
          {isLoading ? (
            // Parent Info Skeleton
            <div className="bg-white border border-grey-stroke rounded-xl p-6 animate-pulse sticky top-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
                <div className="pt-4 border-t border-grey-stroke space-y-2">
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-grey-stroke rounded-xl p-6 sticky top-6">
              <Heading5 className="text-neutral-02 mb-4">
                Parent Information
              </Heading5>
              {parent ? (
                <div className="space-y-4">
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Full Name
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.fullname}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Email
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.email}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Phone
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.phone}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Address
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.address}</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Age
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.age} years</p>
                  </div>
                  <div>
                    <BodySmallMedium className="text-grey mb-1">
                      Occupation
                    </BodySmallMedium>
                    <p className="text-neutral-02">{parent.work}</p>
                  </div>
                </div>
              ) : (
                <p className="text-grey text-sm">
                  Loading parent information...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

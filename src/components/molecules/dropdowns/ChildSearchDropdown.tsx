"use client";

import { useState, useEffect, useRef } from "react";
import { useParents, useChildrenByParent, useTherapies } from "@/services";
import { IChild } from "@/types/child";

interface ChildSearchDropdownProps {
  selectedChildId: string;
  onSelectChild: (childId: string, therapyId: string) => void;
  disabled?: boolean;
}

// Custom Dropdown Item Component
function DropdownItem({
  child,
  isSelected,
  onClick,
}: {
  child: IChild;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer hover:bg-grey-stroke/5 transition-colors border-b border-grey-stroke/30 last:border-b-0 ${
        isSelected ? "bg-moss-stone/5" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-moss-stone/20 rounded-full flex items-center justify-center shrink-0">
          <span className="text-moss-stone font-medium">
            {child.fullname?.charAt(0).toUpperCase() || child.nik.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-sm font-medium text-neutral-02 truncate">
              {child.fullname || `Child #${child.childOrder}`}
            </p>
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700 shrink-0">
              Child
            </span>
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-moss-stone/10 text-moss-stone shrink-0">
              {child.age} years
            </span>
          </div>
          <p className="text-xs text-grey truncate">
            NIK: {child.nik.slice(0, 12)}... • {child.education.stage} - Class{" "}
            {child.education.class}
          </p>
        </div>
        {isSelected && (
          <svg
            className="w-5 h-5 text-moss-stone shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

// Parent Group Header Component
function ParentGroupHeader({ parent }: { parent: any }) {
  return (
    <div className="px-4 py-2 bg-blue-50 border-y border-blue-200 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
          <span className="text-blue-700 font-medium text-sm">
            {parent.fullname.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-900">
            {parent.fullname}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">
            Parent
          </span>
        </div>
      </div>
    </div>
  );
}

// Component to fetch and display children for each parent
function ParentChildrenGroup({
  parent,
  selectedChildId,
  onSelectChild,
  searchQuery = "",
}: {
  parent: any;
  selectedChildId: string;
  onSelectChild: (child: IChild) => void;
  searchQuery?: string;
}) {
  const { data: children, isLoading } = useChildrenByParent(parent._id);

  if (isLoading) {
    return (
      <>
        <ParentGroupHeader parent={parent} />
        <div className="px-4 py-3 animate-pulse border-b border-grey-stroke/30">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </>
    );
  }

  if (!children || children.length === 0) return null;

  // Filter children based on search query
  const filteredChildren = children.filter((child: IChild) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const fullname = child.fullname?.toLowerCase() || "";
    const nik = child.nik.toLowerCase();
    return fullname.includes(query) || nik.includes(query);
  });

  // Don't show parent header if no children match search
  if (filteredChildren.length === 0) return null;

  // Limit to first 5 children
  const limitedChildren = filteredChildren.slice(0, 5);

  return (
    <>
      <ParentGroupHeader parent={parent} />
      {limitedChildren.map((child: IChild) => (
        <DropdownItem
          key={child._id}
          child={child}
          isSelected={selectedChildId === child._id}
          onClick={() => onSelectChild(child)}
        />
      ))}
    </>
  );
}

export default function ChildSearchDropdown({
  selectedChildId,
  onSelectChild,
  disabled = false,
}: ChildSearchDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<IChild | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: parents, isLoading: parentsLoading } = useParents();
  const { data: therapies } = useTherapies();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelectChild = (child: IChild) => {
    // Find therapy session for this child
    const therapy = therapies?.find((t) => t.childId === child._id);

    if (!therapy) {
      // Show error if no therapy found for this child
      alert(
        `No therapy session found for ${
          child.fullname || "this child"
        }. Please create a therapy session first.`
      );
      return;
    }

    setSelectedChild(child);
    setSearchQuery(child.fullname || `Child #${child.childOrder}`);
    setIsDropdownOpen(false);
    onSelectChild(child._id, therapy._id);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
    if (selectedChild) {
      setSearchQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    if (!e.target.value && selectedChild) {
      setSelectedChild(null);
      onSelectChild("", "");
    }
  };

  const handleClear = () => {
    setSelectedChild(null);
    setSearchQuery("");
    onSelectChild("", "");
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search child by name or NIK..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled || parentsLoading}
          className="w-full pl-10 pr-10 py-3 border border-grey-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-stone focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {selectedChild && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-neutral-02 disabled:opacity-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-grey-stroke rounded-lg shadow-xl max-h-[400px] overflow-y-auto">
          {parentsLoading ? (
            <div className="p-4 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            </div>
          ) : parents && parents.length > 0 ? (
            parents.map((parent) => (
              <ParentChildrenGroup
                key={parent._id}
                parent={parent}
                selectedChildId={selectedChildId}
                onSelectChild={handleSelectChild}
                searchQuery={debouncedSearch}
              />
            ))
          ) : (
            <div className="p-4 text-center text-grey text-sm">
              No parents or children found
            </div>
          )}
        </div>
      )}

      {/* Selected Child Info */}
      {selectedChild && !isDropdownOpen && (
        <div className="mt-2 p-3 bg-moss-stone/5 border border-moss-stone/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-moss-stone/20 rounded-full flex items-center justify-center shrink-0">
              <span className="text-moss-stone font-medium text-sm">
                {selectedChild.fullname?.charAt(0).toUpperCase() ||
                  selectedChild.nik.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-02 truncate">
                {selectedChild.fullname || `Child #${selectedChild.childOrder}`}
              </p>
              <p className="text-xs text-grey truncate">
                {selectedChild.age} years • {selectedChild.education.stage} -
                Class {selectedChild.education.class}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

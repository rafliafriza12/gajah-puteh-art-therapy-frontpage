"use client";

import CalendarIcon from "@/components/atoms/icons/CalendarIcon";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import GlobeIcon from "@/components/atoms/icons/GlobeIcon";
import { Heading4 } from "@/components/atoms/Typography";
import { useState, useRef, useEffect } from "react";

const GeneralSettings = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("GMT +7 (Jakarta)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YY");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isDateFormatOpen, setIsDateFormatOpen] = useState(false);
  const [isTimeFormatOpen, setIsTimeFormatOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const timezoneRef = useRef<HTMLDivElement>(null);
  const dateFormatRef = useRef<HTMLDivElement>(null);
  const timeFormatRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: "English", label: "English" },
    { value: "Indonesia", label: "Indonesia" },
  ];

  const timezones = [
    { value: "GMT +7 (Jakarta)", label: "GMT +7 (Jakarta)" },
    { value: "GMT +8 (Singapore)", label: "GMT +8 (Singapore)" },
    { value: "GMT +9 (Tokyo)", label: "GMT +9 (Tokyo)" },
  ];

  const dateFormats = [
    { value: "DD/MM/YY", label: "DD/MM/YY" },
    { value: "MM/DD/YY", label: "MM/DD/YY" },
    { value: "YY/MM/DD", label: "YY/MM/DD" },
  ];

  const timeFormats = [
    { value: "12h", label: "12h" },
    { value: "24h", label: "24h" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (timezoneRef.current && !timezoneRef.current.contains(event.target as Node)) {
        setIsTimezoneOpen(false);
      }
      if (dateFormatRef.current && !dateFormatRef.current.contains(event.target as Node)) {
        setIsDateFormatOpen(false);
      }
      if (timeFormatRef.current && !timeFormatRef.current.contains(event.target as Node)) {
        setIsTimeFormatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveChanges = () => {
    console.log("Saving settings changes...", {
      language,
      timezone,
      dateFormat,
      timeFormat,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading4>General Settings</Heading4>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Default Language</label>
          <p className="text-xs text-grey mb-1">
            Select the default language for all content.
          </p>
        </div>
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-grey-stroke transition-all duration-200 min-w-[140px] bg-neutral-01 text-xs font-medium"
          >
            <GlobeIcon className="w-4 h-5 shrink-0" />
            <span className="text-xs font-medium flex-1 text-left">
              {language}
            </span>
            <ChevronLeftIcon
              className={`w-4 h-4 text-neutral-02 transition-transform duration-200 shrink-0 ${
                isLanguageOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[140px] bg-neutral-01 border border-grey-stroke rounded-lg shadow-lg overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    setLanguage(lang.value);
                    setIsLanguageOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-moss-stone/10 transition-colors duration-150 ${
                    language === lang.value ? "bg-moss-stone/5" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-neutral-02">
                    {lang.label}
                  </span>
                  {language === lang.value && (
                    <svg
                      className="w-4 h-4 text-moss-stone ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Timezone</label>
          <p className="text-xs text-grey mb-1">
            Set the timezone used for scheduling and logs.
          </p>
        </div>
        <div className="relative" ref={timezoneRef}>
          <button
            onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
            className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-grey-stroke transition-all duration-200 min-w-40 bg-neutral-01 text-xs font-medium"
          >
            <span className="text-xs font-medium flex-1 text-left">
              {timezone}
            </span>
            <ChevronLeftIcon
              className={`w-4 h-4 text-neutral-02 transition-transform duration-200 shrink-0 ${
                isTimezoneOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>

          {isTimezoneOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-40 bg-neutral-01 border border-grey-stroke rounded-lg shadow-lg overflow-hidden z-50">
              {timezones.map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    setTimezone(tz.value);
                    setIsTimezoneOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-moss-stone/10 transition-colors duration-150 ${
                    timezone === tz.value ? "bg-moss-stone/5" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-neutral-02">
                    {tz.label}
                  </span>
                  {timezone === tz.value && (
                    <svg
                      className="w-4 h-4 text-moss-stone ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Date Format</label>
          <p className="text-xs text-grey mb-1">
            Choose how dates appear across the dashboard.
          </p>
        </div>
        <div className="relative" ref={dateFormatRef}>
          <button
            onClick={() => setIsDateFormatOpen(!isDateFormatOpen)}
            className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-grey-stroke transition-all duration-200 min-w-[140px] bg-neutral-01 text-xs font-medium"
          >
            <CalendarIcon className="w-4 h-5 shrink-0" />
            <span className="text-xs font-medium flex-1 text-left">
              {dateFormat}
            </span>
            <ChevronLeftIcon
              className={`w-4 h-4 text-neutral-02 transition-transform duration-200 shrink-0 ${
                isDateFormatOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>

          {isDateFormatOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[140px] bg-neutral-01 border border-grey-stroke rounded-lg shadow-lg overflow-hidden z-50">
              {dateFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => {
                    setDateFormat(format.value);
                    setIsDateFormatOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-moss-stone/10 transition-colors duration-150 ${
                    dateFormat === format.value ? "bg-moss-stone/5" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-neutral-02">
                    {format.label}
                  </span>
                  {dateFormat === format.value && (
                    <svg
                      className="w-4 h-4 text-moss-stone ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Time Format</label>
          <p className="text-xs text-grey mb-1">
            Display time in 12-hour or 24-hour format.
          </p>
        </div>
        <div className="relative" ref={timeFormatRef}>
          <button
            onClick={() => setIsTimeFormatOpen(!isTimeFormatOpen)}
            className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-grey-stroke transition-all duration-200 min-w-[100px] bg-neutral-01 text-xs font-medium"
          >
            <span className="text-xs font-medium flex-1 text-left">
              {timeFormat}
            </span>
            <ChevronLeftIcon
              className={`w-4 h-4 text-neutral-02 transition-transform duration-200 shrink-0 ${
                isTimeFormatOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>

          {isTimeFormatOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[100px] bg-neutral-01 border border-grey-stroke rounded-lg shadow-lg overflow-hidden z-50">
              {timeFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => {
                    setTimeFormat(format.value);
                    setIsTimeFormatOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-moss-stone/10 transition-colors duration-150 ${
                    timeFormat === format.value ? "bg-moss-stone/5" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-neutral-02">
                    {format.label}
                  </span>
                  {timeFormat === format.value && (
                    <svg
                      className="w-4 h-4 text-moss-stone ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-end mt-4">
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2.5 bg-moss-stone text-neutral-01 rounded-lg text-base font-medium hover:bg-moss-stone/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;

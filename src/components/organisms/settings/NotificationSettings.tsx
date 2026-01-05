"use client";

import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import { Heading4 } from "@/components/atoms/Typography";
import { useState, useRef, useEffect } from "react";

const NotificationSettings = () => {
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [reviewNotifications, setReviewNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState("Weekly");
  const [isDigestFrequencyOpen, setIsDigestFrequencyOpen] = useState(false);
  const digestFrequencyRef = useRef<HTMLDivElement>(null);

  const digestFrequencies = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (digestFrequencyRef.current && !digestFrequencyRef.current.contains(event.target as Node)) {
        setIsDigestFrequencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveChanges = () => {
    console.log("Saving notification settings...", {
      systemNotifications,
      reviewNotifications,
      emailAlerts,
      digestFrequency,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading4>Notification Settings</Heading4>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">System Notifications</label>
          <p className="text-xs text-grey mb-1">
            Receive alerts for system activities like publish or error.
          </p>
        </div>
        <button
          onClick={() => setSystemNotifications(!systemNotifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            systemNotifications ? "bg-moss-stone" : "bg-grey-stroke"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-neutral-01 transition-transform ${
              systemNotifications ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Review Notifications</label>
          <p className="text-xs text-grey mb-1">
            Notify reviewers when content is submitted for approval.
          </p>
        </div>
        <button
          onClick={() => setReviewNotifications(!reviewNotifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            reviewNotifications ? "bg-moss-stone" : "bg-grey-stroke"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-neutral-01 transition-transform ${
              reviewNotifications ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Email Alerts</label>
          <p className="text-xs text-grey mb-1">
            Enable email notifications for publishing and updates.
          </p>
        </div>
        <button
          onClick={() => setEmailAlerts(!emailAlerts)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            emailAlerts ? "bg-moss-stone" : "bg-grey-stroke"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-neutral-01 transition-transform ${
              emailAlerts ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Digest Frequency</label>
          <p className="text-xs text-grey mb-1">
            Choose how often to receive summarized reports.
          </p>
        </div>
        <div className="relative" ref={digestFrequencyRef}>
          <button
            onClick={() => setIsDigestFrequencyOpen(!isDigestFrequencyOpen)}
            className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-grey-stroke transition-all duration-200 min-w-[120px] bg-neutral-01 text-xs font-medium"
          >
            <span className="text-xs font-medium flex-1 text-left">
              {digestFrequency}
            </span>
            <ChevronLeftIcon
              className={`w-4 h-4 text-neutral-02 transition-transform duration-200 shrink-0 ${
                isDigestFrequencyOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>

          {isDigestFrequencyOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[120px] bg-neutral-01 border border-grey-stroke rounded-lg shadow-lg overflow-hidden z-50">
              {digestFrequencies.map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => {
                    setDigestFrequency(freq.value);
                    setIsDigestFrequencyOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-moss-stone/10 transition-colors duration-150 ${
                    digestFrequency === freq.value ? "bg-moss-stone/5" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-neutral-02">
                    {freq.label}
                  </span>
                  {digestFrequency === freq.value && (
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

export default NotificationSettings;

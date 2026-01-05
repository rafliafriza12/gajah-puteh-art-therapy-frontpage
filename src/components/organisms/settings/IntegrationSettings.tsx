"use client";

import { Heading4 } from "@/components/atoms/Typography";
import { useState } from "react";

const IntegrationSettings = () => {
  const [analyticsConnected, setAnalyticsConnected] = useState(true);
  const [crmConnected, setCrmConnected] = useState(false);

  const handleSaveChanges = () => {
    console.log("Saving integration settings...", {
      analyticsConnected,
      crmConnected,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading4>Integrations Settings</Heading4>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Analytics</label>
          <p className="text-xs text-grey mb-1">
            Track site performance and visitor behavior.
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setAnalyticsConnected(!analyticsConnected)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              analyticsConnected
                ? "bg-moss-stone text-neutral-01"
                : "border border-moss-stone text-moss-stone hover:bg-moss-stone/5"
            }`}
          >
            {analyticsConnected ? "Connected" : "Connect"}
          </button>
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">CRM</label>
          <p className="text-xs text-grey mb-1">
            Connect to your CRM or newsletter system.
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCrmConnected(!crmConnected)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              crmConnected
                ? "bg-moss-stone text-neutral-01"
                : "border border-moss-stone text-moss-stone hover:bg-moss-stone/5"
            }`}
          >
            {crmConnected ? "Connected" : "Connect"}
          </button>
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

export default IntegrationSettings;

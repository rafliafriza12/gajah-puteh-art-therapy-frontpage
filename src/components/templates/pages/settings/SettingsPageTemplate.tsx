"use client";

import { Heading3 } from "@/components/atoms/Typography";
import SettingsMenuSidebar from "@/components/molecules/settings/SettingsMenuSidebar";
import GeneralSettings from "@/components/organisms/settings/GeneralSettings";
import NotificationSettings from "@/components/organisms/settings/NotificationSettings";
import IntegrationSettings from "@/components/organisms/settings/IntegrationSettings";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SettingsContent = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationSettings />;
      case "integrations":
        return <IntegrationSettings />;
      case "general":
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading3>Settings</Heading3>        
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <SettingsMenuSidebar />
        
        <div className="flex-1 bg-neutral-01 rounded-[20px] p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SettingsPageTemplate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
};

export default SettingsPageTemplate;

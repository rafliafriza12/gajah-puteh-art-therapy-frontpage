"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const menuItems = [
  { id: "general", label: "General" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
];

const SettingsMenuSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  const handleMenuClick = (tabId: string) => {
    router.push(`${pathname}?tab=${tabId}`);
  };

  return (
    <div className="w-full lg:w-[220px]">
      <div className="bg-neutral-01 rounded-[20px] p-4 shrink-0">
        <h3 className="text-base font-medium mb-4">Settings Menu</h3>
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs transition-colors border border-grey-stroke ${
                  activeTab === item.id
                    ? "bg-charcoal-green-lighter text-neutral-01 font-medium"
                    : "text-neutral-02 hover:bg-moss-stone/10"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsMenuSidebar;

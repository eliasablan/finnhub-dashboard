"use client";

import { useDashboardContext } from "@/providers/DashboardContext";

export function CloseSidebarButton() {
  const { setMobileOpen, mobileOpen } = useDashboardContext();

  return (
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-search-icon lucide-search"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
    </button>
  );
}

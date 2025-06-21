"use client";

import { useDashboardContext } from "../providers/DashboardContext";

export function MobileMenuButton() {
  const { mobileOpen, setMobileOpen } = useDashboardContext();

  // if (mobileOpen) return null;

  return (
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="fixed right-4 bottom-4 z-50 rounded-full bg-slate-900 p-4 text-white shadow-lg transition-transform hover:scale-105 md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}

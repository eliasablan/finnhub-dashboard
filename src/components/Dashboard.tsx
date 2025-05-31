"use client";

import { Data } from "@/types/types";
import React from "react";
import { useDashboardContext } from "./DashboardContext";

function Dashboard({ data }: { data: Data }) {
  const { selectedCompanyId } = useDashboardContext();
  console.log({ selectedCompanyId });

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1440px] p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">
            {data.companies.length > 0 ? "Companies Overview" : "No Companies"}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Content area ready for components */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

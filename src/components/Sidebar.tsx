"use client";

import React from "react";
import { Data } from "@/types/types";
import { useDashboardContext } from "./DashboardContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Sidebar({
  className,
  data,
}: {
  className?: string;
  data: Data;
}) {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedCompanyId,
    selectedCompanyId,
  } = useDashboardContext();

  const filteredCompanies = data.companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside
      className={cn(
        "flex max-w-screen flex-col border border-slate-600 bg-white transition-transform duration-300 md:translate-x-0 md:border-0",
        selectedCompanyId
          ? "-translate-x-full md:translate-x-0"
          : "translate-x-0",
        className,
      )}
    >
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-500 p-4">
        <Input
          type="search"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredCompanies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedCompanyId(company.id)}
            className={cn(
              "w-full border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-200",
              selectedCompanyId === company.id && "bg-slate-300",
            )}
          >
            <h3 className="font-medium text-slate-900">{company.name}</h3>
            {company.eod.length > 0 && (
              <span className="text-sm text-slate-600">
                Latest Price: ${company.eod[company.eod.length - 1].close}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}

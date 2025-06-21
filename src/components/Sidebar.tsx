"use client";

import React from "react";
import { useDashboardContext } from "../providers/DashboardContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const {
    mobileOpen,
    setMobileOpen,
    stockResults,
    isLoading,
    searchQuery,
    setSearchQuery,
    setSelectedCompanySymbol,
    selectedCompanySymbol,
  } = useDashboardContext();

  const handleClickCompany = (company: string) => {
    if (company === selectedCompanySymbol) {
      setSelectedCompanySymbol("");
    } else {
      setSelectedCompanySymbol(company);
    }
    setMobileOpen(false);
  };

  return (
    <aside
      className={cn(
        "flex max-w-screen flex-col border border-slate-600 bg-white transition-transform duration-300 md:translate-x-0 md:border-0",
        !mobileOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0",
        className,
      )}
    >
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-500 p-4">
        <Input
          type="search"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="p-4 text-center text-slate-500">Cargando...</div>
        )}
        {!isLoading &&
          Array.isArray(stockResults) &&
          stockResults.map((company) => (
            <button
              key={company.symbol}
              onClick={() => handleClickCompany(company.symbol)}
              className={cn(
                selectedCompanySymbol === company.symbol && "bg-slate-300",
                selectedCompanySymbol !== company.symbol &&
                  "hover:bg-slate-200",
                "w-full border-b border-slate-100 px-4 py-3 text-left transition-colors",
              )}
            >
              <h3 className="font-medium text-slate-900">
                {company.description}
              </h3>
              <div className="text-sm text-slate-600">
                <span className="font-mono">{company.symbol}</span>
                {company.displaySymbol &&
                  company.displaySymbol !== company.symbol && (
                    <span className="ml-2">({company.displaySymbol})</span>
                  )}
              </div>
            </button>
          ))}
        {!isLoading && stockResults?.length === 0 && (
          <div className="p-4 text-center text-slate-500">
            {searchQuery.trim()
              ? "No se encontraron resultados"
              : "Busca una empresa o símbolo de stock"}
          </div>
        )}
      </div>
    </aside>
  );
}

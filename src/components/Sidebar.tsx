"use client";

import React from "react";
import { stockTypes, useDashboardContext } from "../providers/DashboardContext";
import { cn } from "@/lib/utils";
import { CloseSidebarButton } from "./CloseSidebarButton";

export function Sidebar({ className }: { className?: string }) {
  const {
    mobileOpen,
    setMobileOpen,
    stockResults,
    isSidebarLoading,
    searchQuery,
    setSearchQuery,
    setSelectedCompanySymbol,
    selectedCompanySymbol,
    stockType,
    setStockType,
  } = useDashboardContext();

  const handleClickCompany = (company: string) => {
    if (company === selectedCompanySymbol) {
      setSelectedCompanySymbol("");
    } else {
      setSelectedCompanySymbol(company);
    }
    setMobileOpen(false);
  };

  const handleOverlayClick = () => {
    setMobileOpen(false);
  };

  console.log(mobileOpen);

  return (
    <>
      {/* Backdrop overlay - visible cuando el sidebar está abierto en todas las pantallas */}
      {mobileOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/75 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-[400px] max-w-[85vw] flex-col border-r border-slate-600 bg-white shadow-lg transition-transform duration-300",
          !mobileOpen && "-translate-x-full",
          className,
        )}
      >
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-600">
          <div className="space-y-2">
            <div className="my-0 flex items-center justify-between pb-2">
              <CloseSidebarButton />
              <h2 className="font-mono text-3xl font-bold text-slate-200">
                Stock Finder
              </h2>
            </div>
            <div className="relative mt-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar símbolo o empresa..."
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
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
              </span>
            </div>

            <select
              value={stockType}
              onChange={(e) =>
                setStockType(e.target.value as (typeof stockTypes)[number])
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Todos los tipos</option>
              {stockTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">
          {isSidebarLoading && (
            <>
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-2 border-b border-slate-100 px-4 py-3",
                    index % 3 === 0
                      ? "delay-75"
                      : index % 3 === 1
                        ? "delay-150"
                        : "delay-300",
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-3/4 animate-pulse rounded",
                      index % 2 === 0
                        ? "bg-gradient-to-r from-slate-200 to-slate-100"
                        : "bg-gradient-to-l from-slate-200 to-slate-100",
                    )}
                  />
                  <div
                    className={cn(
                      "h-4 w-1/3 animate-pulse rounded",
                      index % 2 === 0
                        ? "bg-gradient-to-r from-slate-100 to-slate-200"
                        : "bg-gradient-to-l from-slate-100 to-slate-200",
                    )}
                  />
                </div>
              ))}
            </>
          )}
          {!isSidebarLoading &&
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
          {!isSidebarLoading && stockResults?.length === 0 && (
            <div className="p-4 text-center text-slate-500">
              {searchQuery.trim()
                ? "No se encontraron resultados"
                : "Busca una empresa o símbolo de stock"}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

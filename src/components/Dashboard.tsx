"use client";

import { Data, InsiderData } from "@/types/types";
import React, { useState } from "react";
import { useDashboardContext } from "./DashboardContext";
import StockInfo from "@/components/StockInfo";
import StockChart from "@/components/StockChart";

function InsiderSection({ insider }: { insider: InsiderData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left hover:bg-slate-50"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-900">
              {insider.insider.name}
            </h3>
            <p className="text-sm text-slate-600">
              {insider.insider.relationship}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">
                Bought: {insider.total_securities_purchased.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600">
                ${insider.total_securities_purchased_value.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-600">
                Sold: {insider.total_securities_sold.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600">
                ${insider.total_securities_sold_value.toLocaleString()}
              </p>
            </div>
            <div className="ml-4">
              {isExpanded ? (
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-200 px-4 py-3">
          <div className="space-y-3">
            {insider.transactions.map((transaction) => {
              const isPurchase =
                transaction.transactionCoding === "P" ||
                transaction.transactionCoding === "A";
              return (
                <div
                  key={transaction.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isPurchase ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isPurchase ? "Purchase" : "Sale"}:{" "}
                        {transaction.quantity.toLocaleString()} shares
                      </p>
                      <p className="text-sm text-slate-600">
                        Price: ${transaction.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-600">
                        Value: $
                        {(
                          transaction.price * transaction.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(transaction.filingDate).toLocaleDateString()}
                    </p>
                  </div>
                  {transaction.footnotes && (
                    <p className="mt-2 text-xs text-slate-500">
                      {Object.values(transaction.footnotes).flat().join(" ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ data }: { data: Data }) {
  const { selectedCompanyId } = useDashboardContext();
  const company = data.companies.find((c) => c.id === selectedCompanyId);
  const insiders = data.insiders.filter(
    (insider) => insider.company.id === selectedCompanyId,
  );

  if (!company) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1440px] p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Please select a company from the sidebar.
          </h2>
        </div>
      </main>
    );
  }

  // Calcular totales de la empresa
  const companyTotals = insiders.reduce(
    (acc, insider) => {
      acc.totalPurchased += insider.total_securities_purchased;
      acc.totalSold += insider.total_securities_sold;
      acc.totalPurchasedValue += insider.total_securities_purchased_value;
      acc.totalSoldValue += insider.total_securities_sold_value;
      return acc;
    },
    {
      totalPurchased: 0,
      totalSold: 0,
      totalPurchasedValue: 0,
      totalSoldValue: 0,
    },
  );

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1440px] p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold text-slate-900">
              {company.name}
            </h1>
            <div className="text-right">
              <p className="text-sm text-slate-600">Symbol: {company.ticker}</p>
              {company.eod.length > 0 && (
                <p className="text-sm text-slate-600">
                  Price: ${company.eod[company.eod.length - 1].close}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="mb-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Insider Trading Summary
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  Total Purchased
                </p>
                <p className="mt-1 text-2xl font-semibold text-green-600">
                  {companyTotals.totalPurchased.toLocaleString()}
                </p>
                <p className="text-sm text-green-700">
                  ${companyTotals.totalPurchasedValue.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">Total Sold</p>
                <p className="mt-1 text-2xl font-semibold text-red-600">
                  {companyTotals.totalSold.toLocaleString()}
                </p>
                <p className="text-sm text-red-700">
                  ${companyTotals.totalSoldValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StockChart data={company.eod} />
          <StockInfo company={company} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Insider Transactions
          </h2>
          <div className="space-y-4">
            {insiders.length > 0 ? (
              insiders
                .sort((a, b) => {
                  // Ordenar primero por volumen total de transacciones
                  const volumeA =
                    a.total_securities_purchased_value +
                    a.total_securities_sold_value;
                  const volumeB =
                    b.total_securities_purchased_value +
                    b.total_securities_sold_value;
                  return volumeB - volumeA;
                })
                .map((insider) => (
                  <InsiderSection key={insider.insider.id} insider={insider} />
                ))
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
                <p className="text-slate-600">
                  No insider trading activity found for this company.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

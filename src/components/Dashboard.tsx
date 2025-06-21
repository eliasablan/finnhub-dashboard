"use client";

import React from "react";
import { useDashboardContext } from "@/providers/DashboardContext";

function Dashboard() {
  const { selectedCompanyId } = useDashboardContext();

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1440px] p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold text-slate-900">
              {selectedCompanyId}
            </h1>
            <div className="text-right">
              {/* <p className="text-sm text-slate-600">Symbol: {company.ticker}</p>
              {company.eod.length > 0 && (
                <p className="text-sm text-slate-600">
                  Price: ${company.eod[company.eod.length - 1].close}
                </p>
              )} */}
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
                {/* <p className="mt-1 text-2xl font-semibold text-green-600">
                  {companyTotals.totalPurchased.toLocaleString()}
                </p>
                <p className="text-sm text-green-700">
                  ${companyTotals.totalPurchasedValue.toLocaleString()}
                </p> */}
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">Total Sold</p>
                {/* <p className="mt-1 text-2xl font-semibold text-red-600">
                  {companyTotals.totalSold.toLocaleString()}
                </p>
                <p className="text-sm text-red-700">
                  ${companyTotals.totalSoldValue.toLocaleString()}
                </p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* <StockChart data={company.eod} />
          <StockInfo company={company} /> */}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Insider Transactions
          </h2>
          {/* <div className="space-y-4">
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
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

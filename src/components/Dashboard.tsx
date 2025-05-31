"use client";

import { Data } from "@/types/types";
import React from "react";
import { useDashboardContext } from "./DashboardContext";
import StockInfo from "@/components/StockInfo";
import StockChart from "@/components/StockChart";
import InsiderTrading from "@/components/InsiderTrading";
import TransactionHistory from "@/components/TransactionHistory";

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

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1440px] p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">
            {company.name}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StockInfo company={company} />
          <StockChart data={company.eod} />
          <InsiderTrading insiders={insiders} />
          {insiders.length > 0 && (
            <TransactionHistory transactions={insiders[0].transactions} />
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

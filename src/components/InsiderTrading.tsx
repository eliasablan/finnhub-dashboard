import { InsiderData } from "@/types/types";
import React from "react";

function InsiderTrading({ insiders }: { insiders: InsiderData[] }) {
  if (!insiders || insiders.length === 0) {
    return <div>No insider trading data available</div>;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Insider Trading
      </h2>
      {insiders.map((insider) => (
        <div
          key={insider.insider.id}
          className="border-b border-slate-200 py-4 last:border-b-0"
        >
          <h3 className="text-base font-semibold text-slate-900">
            {insider.insider.name}
          </h3>
          <div className="mt-4 flex justify-between rounded-lg bg-slate-50 p-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">Purchased</p>
              <p className="text-sm text-slate-600">
                {insider.total_securities_purchased.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">Sold</p>
              <p className="text-sm text-slate-600">
                {insider.total_securities_sold.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InsiderTrading;

import React from "react";

function StockInfo({
  company,
}: {
  company: {
    name: string;
    ticker: string;
    eod: {
      close: number;
      open: number;
      high: number;
      low: number;
      volume: number;
    }[];
  };
}) {
  const latestPrice = company.eod[company.eod.length - 1];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">
        {company.name}
      </h2>
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
        {company.ticker && (
          <p className="text-sm text-slate-600">Symbol: {company.ticker}</p>
        )}
        {latestPrice?.close && (
          <p className="text-sm text-slate-600">
            Last Price: ${latestPrice.close}
          </p>
        )}
        {latestPrice?.open && (
          <p className="text-sm text-slate-600">Open: ${latestPrice.open}</p>
        )}
        {latestPrice?.high && (
          <p className="text-sm text-slate-600">High: ${latestPrice.high}</p>
        )}
        {latestPrice?.low && (
          <p className="text-sm text-slate-600">Low: ${latestPrice.low}</p>
        )}
        {latestPrice?.volume.toLocaleString() && (
          <p className="text-sm text-slate-600">
            Volume: {latestPrice.volume.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default StockInfo;

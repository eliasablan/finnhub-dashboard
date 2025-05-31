import React from "react";

function InsiderTrading({ insiders }: { insiders: any[] }) {
  if (!insiders || insiders.length === 0) {
    return <div>No insider trading data available</div>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">
        Insider Trading
      </h2>
      {insiders.map((insider) => (
        <div
          key={insider.insider.id}
          className="py-4 border-b border-slate-200 last:border-b-0"
        >
          <h3 className="text-base font-semibold text-slate-900">
            {insider.insider.name}
          </h3>
          <div className="flex justify-between mt-4 bg-slate-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">
                Purchased
              </p>
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

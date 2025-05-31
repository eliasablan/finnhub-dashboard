"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StockChart({ data }: { data: { date: string; close: number }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">
        Stock Price History
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="rounded shadow-inner bg-slate-50"
        >
          <LineChart
            data={data}
            className=" -ml-6"
            // className="border"
            // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#e2e8f0" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default StockChart;

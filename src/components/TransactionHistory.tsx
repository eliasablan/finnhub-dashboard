import React from "react";
import { Transaction } from "@/types/types";

function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Transaction History
      </h2>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="border-b border-slate-200 p-4 transition-colors duration-200 last:border-b-0 hover:bg-slate-50"
        >
          <p className="text-sm text-slate-600">
            Date: {new Date(transaction.filingDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-slate-600">
            Type: {transaction.transactionCoding}
          </p>
          <p className="text-sm text-slate-600">
            Shares: {transaction.quantity.toLocaleString()}
          </p>
          <p className="text-sm text-slate-600">
            Price: ${transaction.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;

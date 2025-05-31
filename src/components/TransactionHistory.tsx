import React from "react";

function TransactionHistory({ transactions }: { transactions: any[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">
        Transaction History
      </h2>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="p-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors duration-200"
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

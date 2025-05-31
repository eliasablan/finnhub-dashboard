export interface EODData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close: number;
  volume: number;
}

export interface Company {
  id: string;
  name: string;
  name_display: string;
  ticker: string;
  eodhd_symbol: string;
  eod: EODData[];
}

export interface Insider {
  name: string;
  cik: string;
  id: string;
  relationship: string;
}

export interface Transaction {
  id: string;
  humanUrl: string;
  acquiredOrDisposed: string;
  directOrIndirectOwnership: string;
  filingDate: string;
  isDerivative: boolean;
  planned: boolean;
  securityTitle: string;
  transactionCoding: string;
  quantity: number;
  price: number;
  value: number;
  footnotes: string | null;
  ownedFollowingTransaction: number;
  natureOfOwnership: string;
  groupType: string;
  totalValue: number;
  totalQuantity: number;
  averagePrice: number;
  transactionCount: number;
  originalTransactions: Transaction[];
}

export interface Holdings {
  direct_shares: number;
  indirect_shares: number;
  derivative_shares: number;
  derivative_potential_shares: number;
  total_shares: number;
  last_transactions: Transaction[];
}

export interface InsiderData {
  insider: Insider;
  company: {
    id: string;
    name: string;
    name_display: string;
    ticker: string;
    eodhd_symbol: string;
  };
  total_securities_purchased: number;
  total_securities_purchased_value: number;
  total_securities_sold: number;
  total_securities_sold_value: number;
  net_securities: number;
  net_securities_value: number;
  holdings: Holdings;
  transactions: Transaction[];
}

export interface Data {
  companies: Company[];
  insiders: InsiderData[];
}

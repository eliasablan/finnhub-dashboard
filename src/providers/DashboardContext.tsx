"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useQueryState } from "nuqs";

interface StockSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface StockSearchResponse {
  count: number;
  result: StockSearchResult[];
}

type CompanyProfile = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string; // formato YYYY-MM-DD
  logo: string; // URL
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string; // URL
};

interface DashboardContextType {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  stockType: (typeof stockTypes)[number] | "";
  setStockType: Dispatch<SetStateAction<(typeof stockTypes)[number] | "">>;
  stockResults: StockSearchResult[];
  setStockResults: Dispatch<SetStateAction<StockSearchResult[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCompanySymbol: string;
  setSelectedCompanySymbol: Dispatch<SetStateAction<string>>;
  companyData: CompanyProfile | null;
  setCompanyData: Dispatch<SetStateAction<CompanyProfile | null>>;
  selectedCompanyHasData: boolean;
  setSelectedCompanyHasData: Dispatch<SetStateAction<boolean>>;
  isLoadingCompanyData: boolean;
  setIsLoadingCompanyData: Dispatch<SetStateAction<boolean>>;
}

const DashboardContextInstance = createContext<
  DashboardContextType | undefined
>(undefined);

export const stockTypes = [
  "Common Stock",
  "REIT",
  "Closed-End Fund",
  "ADR",
  "Open-End Fund",
  "ETP",
  "Unit",
  "PUBLIC",
  "Equity WRT",
  "CDI",
  "MLP",
  "Foreign Sh.",
  "NVDR",
  "Right",
  "Preference",
  "Dutch Cert",
  "GDR",
  "Ltd Part",
  "NY Reg Shrs",
  "Savings Share",
  "Royalty Trst",
  "Tracking Stk",
  "SDR",
  "Receipt",
  "PRIVATE",
  "Stapled Security",
  "Misc.",
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [stockResults, setStockResults] = useState<StockSearchResult[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stockType, setStockType] = useQueryState("type", {
    defaultValue: "",
  });
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [selectedCompanySymbol, setSelectedCompanySymbol] = useQueryState(
    "company",
    {
      defaultValue: "",
    },
  );
  const [selectedCompanyHasData, setSelectedCompanyHasData] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyProfile | null>(null);

  // Actualizar la informacion de la empresa seleccionada
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoadingCompanyData(true);
      if (selectedCompanySymbol) {
        const response = await fetch(`/api/stocks/${selectedCompanySymbol}`);
        if (response.ok) {
          const { data }: { data: CompanyProfile } = await response.json();
          setCompanyData(data);
          setSelectedCompanyHasData(true);
        } else {
          setCompanyData(null);
          setSelectedCompanyHasData(false);
        }
      }
      setIsLoadingCompanyData(false);
    };
    fetchCompanyData();
  }, [selectedCompanySymbol]);

  // Busqueda inicial de la empresa seleccionada
  useEffect(() => {
    const fetchInitialCompanyData = async () => {
      if (selectedCompanySymbol) {
        const response = await fetch(`/api/stocks/${selectedCompanySymbol}`);
        if (response.ok) {
          const { data }: { data: CompanyProfile } = await response.json();
          setCompanyData(data);
        }
      }
    };
    fetchInitialCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualizar los resultados de la búsqueda con debounce cuando cambia el tipo de stock o la búsqueda
  useEffect(() => {
    setIsLoading(true);
    const changeStockType = setTimeout(async () => {
      if (searchQuery) {
        const response = await fetch(
          `/api/stocks/search?q=${encodeURIComponent(searchQuery)}`,
        );
        if (response.ok) {
          const { data }: { data: StockSearchResponse } = await response.json();
          const filteredData = data.result.filter((item) => {
            if (stockType === "") {
              return true;
            }
            return item.type === stockType;
          });
          setStockResults(Array.isArray(filteredData) ? filteredData : []);
        } else {
          console.error("Error fetching search results:", response.statusText);
          setStockResults([]);
        }
      } else {
        const response = await fetch("/api/stocks/list");
        if (response.ok) {
          const { data }: { data: StockSearchResult[] } = await response.json();
          const filteredData = data.filter((item) => {
            if (stockType === "") {
              return true;
            }
            return item.type === stockType;
          });
          setStockResults(
            Array.isArray(filteredData) ? filteredData.slice(0, 100) : [],
          );
        }
      }
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(changeStockType);
  }, [stockType, searchQuery]);

  // Búsqueda inicial cuando se monta el componente
  useEffect(() => {
    const initialSearch = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const response = await fetch(
            `/api/stocks/search?q=${encodeURIComponent(searchQuery)}`,
          );
          if (response.ok) {
            const { data }: { data: StockSearchResponse } =
              await response.json();
            const filteredData = data.result.filter((item) => {
              if (stockType === "") {
                return true;
              }
              return item.type === stockType;
            });
            setStockResults(Array.isArray(filteredData) ? filteredData : []);
          } else {
            console.error(
              "Error fetching search results:",
              response.statusText,
            );
            setStockResults([]);
          }
        } else {
          const response = await fetch("/api/stocks/list");
          if (response.ok) {
            const { data }: { data: StockSearchResult[] } =
              await response.json();
            const filteredData = data.filter((item) => {
              if (stockType === "") {
                return true;
              }
              return item.type === stockType;
            });
            setStockResults(
              Array.isArray(filteredData) ? filteredData.slice(0, 100) : [],
            );
          }
        }
      } catch (error) {
        console.error("Error in initial search:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    mobileOpen,
    setMobileOpen,
    stockType,
    setStockType,
    stockResults,
    setStockResults,
    isLoading,
    setIsLoading,
    searchQuery,
    setSearchQuery,
    selectedCompanySymbol,
    setSelectedCompanySymbol,
    companyData,
    setCompanyData,
    selectedCompanyHasData,
    setSelectedCompanyHasData,
    isLoadingCompanyData,
    setIsLoadingCompanyData,
  };

  return (
    <DashboardContextInstance.Provider value={value}>
      {children}
    </DashboardContextInstance.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContextInstance);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
}

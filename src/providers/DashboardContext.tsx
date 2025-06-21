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
}

const DashboardContextInstance = createContext<
  DashboardContextType | undefined
>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockResults, setStockResults] = useState<StockSearchResult[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [selectedCompanySymbol, setSelectedCompanySymbol] = useQueryState(
    "company",
    {
      defaultValue: "",
    },
  );
  const [companyData, setCompanyData] = useState<CompanyProfile | null>(null);

  // Actualizar la informacion de la empresa seleccionada
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (selectedCompanySymbol) {
        const response = await fetch(`/api/stocks/${selectedCompanySymbol}`);
        if (response.ok) {
          const { data }: { data: CompanyProfile } = await response.json();
          setCompanyData(data);
        }
      }
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

  // Actualizar los resultados de la búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const response = await fetch(
            `/api/stocks/search?q=${encodeURIComponent(searchQuery)}`,
          );
          if (response.ok) {
            const { data }: { data: StockSearchResponse } =
              await response.json();
            // Extraer el array result de la respuesta
            setStockResults(Array.isArray(data.result) ? data.result : []);
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
            setStockResults(Array.isArray(data) ? data.slice(0, 100) : []);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setStockResults([]);
      } finally {
        setIsLoading(false);
      }
      // Debounce de 1.5 segundos
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
            // Extraer el array result de la respuesta
            setStockResults(Array.isArray(data.result) ? data.result : []);
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
            setStockResults(Array.isArray(data) ? data.slice(0, 100) : []);
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

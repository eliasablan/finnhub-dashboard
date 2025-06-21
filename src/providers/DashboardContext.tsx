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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

interface DashboardContextType {
  stockResults: StockSearchResult[];
  setStockResults: Dispatch<SetStateAction<StockSearchResult[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (companyId: string | null) => void;
}

const DashboardContextInstance = createContext<
  DashboardContextType | undefined
>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [stockResults, setStockResults] = useState<StockSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Actualizar los resultados de la búsqueda con debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setStockResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/stocks/search?q=${encodeURIComponent(searchQuery)}`,
        );
        if (response.ok) {
          const { data }: { data: StockSearchResponse } = await response.json();
          // Extraer el array result de la respuesta
          setStockResults(Array.isArray(data.result) ? data.result : []);
        } else {
          console.error("Error fetching search results:", response.statusText);
          setStockResults([]);
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
    if (!searchQuery.trim()) {
      const initialSearch = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/stocks");
          if (response.ok) {
            const { data }: { data: StockSearchResult[] } =
              await response.json();
            setStockResults(Array.isArray(data) ? data.slice(0, 100) : []);
          }
        } catch (error) {
          console.error("Error in initial search:", error);
        } finally {
          setIsLoading(false);
        }
      };
      initialSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCompanyId = searchParams.get("company");

  const handleCompanySelection = (companyId: string | null) => {
    if (companyId) {
      router.push(`?company=${companyId}`);
    } else {
      router.push("/");
    }
  };

  const value = {
    stockResults,
    setStockResults,
    isLoading,
    setIsLoading,
    searchQuery,
    setSearchQuery,
    selectedCompanyId,
    setSelectedCompanyId: handleCompanySelection,
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

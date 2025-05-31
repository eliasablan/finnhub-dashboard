"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface DashboardContextType {
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCompanyId = searchParams.get("company");

  const handleCompanySelection = (companyId: string | null) => {
    if (companyId) {
      router.push(`?company=${companyId}`);
    } else {
      router.push("/");
    }
  };

  const value = {
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

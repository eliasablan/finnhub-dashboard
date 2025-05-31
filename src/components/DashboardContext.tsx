"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
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
  setSelectedCompanyId: Dispatch<SetStateAction<string | null>>;
}

const DashboardContextInstance = createContext<
  DashboardContextType | undefined
>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL when company is selected
  const handleCompanySelection: Dispatch<SetStateAction<string | null>> = (
    value,
  ) => {
    const newCompanyId =
      typeof value === "function" ? value(selectedCompanyId) : value;
    setSelectedCompanyId(newCompanyId);

    if (newCompanyId) {
      router.push(`?company=${newCompanyId}`);
    } else {
      router.push("/");
    }
  };

  // Initialize selected company from URL on mount
  useEffect(() => {
    const companyFromUrl = searchParams.get("company");
    if (companyFromUrl) {
      setSelectedCompanyId(companyFromUrl);
    }
  }, [searchParams]);

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

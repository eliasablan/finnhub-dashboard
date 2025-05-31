"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

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

  return (
    <DashboardContextInstance.Provider
      value={{
        isLoading,
        setIsLoading,
        searchQuery,
        setSearchQuery,
        selectedCompanyId,
        setSelectedCompanyId,
      }}
    >
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

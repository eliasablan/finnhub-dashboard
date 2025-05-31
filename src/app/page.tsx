import data from "@/data.json";
import { DashboardProvider } from "@/components/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { Data } from "@/types/types";
import Dashboard from "@/components/Dashboard";
import { MobileMenuButton } from "@/components/MobileMenuButton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <DashboardProvider>
        <div className="flex h-screen max-h-screen overflow-hidden">
          <Sidebar
            className="absolute w-full md:relative md:w-[400px] md:flex-none"
            data={data as unknown as Data}
          />
          <Dashboard data={data as unknown as Data} />
          <MobileMenuButton />
        </div>
      </DashboardProvider>
    </Suspense>
  );
}

import data from "@/data.json";
import { DashboardProvider } from "@/components/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { Data } from "@/types/types";
import Dashboard from "@/components/Dashboard";
import { MobileMenuButton } from "@/components/MobileMenuButton";
import { Suspense } from "react";

function LoadingSkeleton() {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="w-[400px] flex-none border-r border-slate-200 bg-white">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-500 p-4">
          <div className="h-9 w-full animate-pulse rounded bg-slate-400" />
        </div>
        <div className="space-y-4 p-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1440px] p-8">
          <div className="mb-8 space-y-4">
            {/* Company header */}
            <div className="h-10 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-slate-100" />
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="h-24 animate-pulse rounded-lg bg-green-50" />
            <div className="h-24 animate-pulse rounded-lg bg-red-50" />
          </div>

          {/* Charts area */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-[300px] animate-pulse rounded-lg bg-slate-100" />
            <div className="h-[300px] animate-pulse rounded-lg bg-slate-100" />
          </div>

          {/* Transactions list */}
          <div className="mt-8">
            <div className="mb-4 h-8 w-1/4 animate-pulse rounded bg-slate-200" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-lg border border-slate-200 bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default async function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
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

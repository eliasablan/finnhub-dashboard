import data from "@/data.json";
import { DashboardProvider } from "@/components/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { Data } from "@/types/types";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <DashboardProvider>
      <div className="flex h-screen max-h-screen overflow-hidden">
        <Sidebar
          className="w-[400px] flex-none"
          data={data as unknown as Data}
        />
        <Dashboard data={data as unknown as Data} />
      </div>
    </DashboardProvider>
  );
}

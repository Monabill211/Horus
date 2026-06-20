import Header from "./navbar";
import Sidebar from "./saidbar";
import DashboardContent from "./contant";
import StatsCards from "./statcard";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Header />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8" style={{padding:"32px"}}>

          <StatsCards />

          <DashboardContent />

        </main>

      </div>

    </div>
  );
}
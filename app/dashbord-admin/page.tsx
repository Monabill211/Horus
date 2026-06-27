"use client";

import { useState } from "react";
import Sidebar from "./saidbar";
import Topbar from "./navbar";
import OverviewTab from "./Overviewtab";
import ProductsTab from "./add/page";
import CategoriesTab from "./add-catygre/page";
import OrdersTab from "./Orderstab";
import MessagesTab from "./Messagestab";
import SettingsTab from "./setting/page";
import ReportsTab from "./Reportstab";
import AdminGate from "./Admingate";

import { pageTitles, type Tab } from "./data";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
        <AdminGate>

    <div dir="rtl" className="flex min-h-screen bg-[#f7f4ee] text-[#171310] font-['Cairo',sans-serif]">
      <Sidebar activeTab={tab} onTabChange={setTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={pageTitles[tab]} />

        <main className="flex-1 overflow-y-auto" style={{ padding: "28px 24px" }}>
          {tab === "overview" && <OverviewTab onViewOrders={() => setTab("orders")} />}
          {tab === "products" && <ProductsTab />}
          {tab === "categories" && <CategoriesTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "reports" && <ReportsTab />}

          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
        </AdminGate>

  );
}
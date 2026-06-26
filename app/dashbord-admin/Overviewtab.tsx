import { ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { productsData, ordersData } from "./data";
import { StatCard } from "./Shared";

export default function OverviewTab({ onViewOrders }: { onViewOrders: () => void }) {
  const lowStock = productsData.filter((p) => p.stock === 0);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>
          مرحباً بعودتك إلى لوحة التحكم
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "28px" }}>
        <StatCard label="طلبات جديدة" value="1" badge="1+" iconBg="bg-[#c9a84c]/15" iconColor="text-[#c9a84c]" icon={<ShoppingCart size={18} />} />
        <StatCard label="هذا الشهر" value="0 ج.م" badge="0+" iconBg="bg-purple-100" iconColor="text-purple-600" icon={<DollarSign size={18} />} />
        <StatCard label="هذا الأسبوع" value="0 ج.م" badge="0+" iconBg="bg-emerald-100" iconColor="text-emerald-600" icon={<TrendingUp size={18} />} />
        <StatCard label="مبيعات اليوم" value="0 ج.م" badge="0+" iconBg="bg-blue-100" iconColor="text-blue-600" icon={<DollarSign size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <div className="flex items-center gap-2" style={{ marginBottom: "16px" }}>
            <AlertTriangle size={16} color="#e8503a" />
            <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide">مخزون منخفض</h3>
          </div>
          <div className="flex flex-col gap-2">
            {lowStock.length === 0 ? (
              <p className="text-[13px] text-[#8a7e6f]">لا يوجد منتجات منخفضة المخزون</p>
            ) : (
              lowStock.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between bg-rose-50 rounded-lg"
                  style={{ padding: "10px 16px" }}
                >
                  <span className="text-[13px]">{p.name}</span>
                  <span className="text-[11px] text-rose-600">المخزون: 0</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "16px" }}>
            الطلبات الأخيرة
          </h3>
          <div className="flex flex-col" style={{ marginBottom: "16px" }}>
            {ordersData.slice(0, 3).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between border-b border-[#1a1410]/5 last:border-0"
                style={{ padding: "8px 0" }}
              >
                <div>
                  <p className="font-bold text-[13px]">{o.total} ج.م</p>
                  <span className={`inline-block text-[10px] rounded-full ${o.color}`} style={{ marginTop: "4px", padding: "2px 8px" }}>
                    {o.status}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-semibold">{o.id}</p>
                  <p className="text-[11px] text-[#8a7e6f]">{o.customer}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onViewOrders}
            className="w-full text-center text-[12.5px] text-[#c9a84c] font-semibold border border-[#c9a84c]/30 rounded-lg hover:bg-[#c9a84c]/5 transition-colors"
            style={{ padding: "8px 0" }}
          >
            عرض جميع الطلبات
          </button>
        </div>
      </div>
    </div>
  );
}
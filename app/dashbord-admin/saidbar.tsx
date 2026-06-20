"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Folder,
  ShoppingCart,
  Users,
  Mail,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "الفئات",
    href: "/dashboard/categories",
    icon: Folder,
  },
  {
    title: "الطلبات",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },

  {
    title: "رسائل العملاء",
    href: "/dashboard/messages",
    icon: Mail,
  },
  { 
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="bg-white border-l flex flex-col justify-between shadow-sm"
      style={{
        width: "270px",
        height: "calc(100vh - 70px)",
        position: "sticky",
        top: "70px",
      }}
    >
      {/* Logo */}

      <div>
        <div
          className="flex items-center border-b"
          style={{ padding: "25px" }}
        >
          <div
            className="bg-orange-500 text-white flex items-center justify-center font-bold rounded-xl"
            style={{
              width: "45px",
              height: "45px",
              fontSize: "20px",
            }}
          >
            H
          </div>

          <h2
            className="font-bold"
            style={{
              fontSize: "30px",
              marginRight: "12px",
            }}
          >
            HORUS
          </h2>
        </div>

        {/* Links */}

        <div style={{ padding: "20px" }}>
          {links.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center text-gray-700 hover:bg-orange-500 hover:text-white duration-300 rounded-xl"
                style={{
                  padding: "14px 18px",
                  marginBottom: "10px",
                }}
              >
                <Icon size={20} />

                <span
                  style={{
                    marginRight: "14px",
                    fontSize: "17px",
                  }}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <div
        className="border-t"
        style={{
          padding: "20px",
        }}
      >
        <div
          className="bg-gray-100 rounded-xl"
          style={{
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <p
            className="text-gray-500"
            style={{
              fontSize: "13px",
            }}
          >
            مسجل دخول كـ
          </p>

          <h3
            className="font-semibold"
            style={{
              marginTop: "6px",
            }}
          >
            admin@horus.com
          </h3>

          <span
            className="text-orange-500 font-bold"
            style={{
              fontSize: "13px",
              display: "block",
              marginTop: "6px",
            }}
          >
            Admin
          </span>
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center duration-300 w-full"
          style={{
            padding: "14px",
          }}
        >
          <LogOut size={18} />

          <span
            style={{
              marginRight: "10px",
            }}
          >
            تسجيل الخروج
          </span>
        </button>
      </div>
    </aside>
  );
}
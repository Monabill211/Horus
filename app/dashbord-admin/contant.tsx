"use client";

import { Package2, Eye } from "lucide-react";

const lowStock = [
  {
    name: "تيشيرت أسود",
    stock: 2,
  },
  {
    name: "هودي أبيض",
    stock: 1,
  },
  {
    name: "بنطلون جينز",
    stock: 3,
  },
];

const orders = [
  {
    id: "#1001",
    customer: "محمد أحمد",
    total: "850 ج.م",
    status: "قيد التجهيز",
  },
  {
    id: "#1002",
    customer: "أحمد علي",
    total: "420 ج.م",
    status: "تم الشحن",
  },
  {
    id: "#1003",
    customer: "محمود حسن",
    total: "1200 ج.م",
    status: "تم التوصيل",
  },
];

export default function DashboardContent() {
  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-3"
      style={{
        gap: "20px",
      }}
    >
      {/* Low Stock */}

      <div
        className="bg-white rounded-2xl shadow-2xl"
        style={{
          padding: "25px",
        }}
      >
        <h2
          className="font-bold"
          style={{
            fontSize: "22px",
            marginBottom: "25px",
          }}
        >
          المخزون المنخفض
        </h2>

        {lowStock.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-red-50 rounded-xl"
            style={{
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <div className="flex items-center">
              <div
                className="rounded-xl flex items-center justify-center"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#FEE2E2",
                  marginLeft: "15px",
                }}
              >
                <Package2 color="#DC2626" />
              </div>

              <div>
                <h3 className="font-semibold">{item.name}</h3>

                <span
                  className="text-red-500"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  المتبقي {item.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}

      <div
        className="bg-white rounded-2xl shadow-2xl xl:col-span-2"
        style={{
          padding: "25px",
        }}
      >
        <div
          className="flex justify-between items-center"
          style={{
            marginBottom: "25px",
          }}
        >
          <h2
            className="font-bold"
            style={{
              fontSize: "22px",
            }}
          >
            آخر الطلبات
          </h2>

          <button
            className="text-orange-500 font-semibold"
            style={{
              fontSize: "15px",
            }}
          >
            عرض الكل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr
                className="border-b"
                style={{
                  height: "55px",
                }}
              >
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                  style={{
                    height: "70px",
                  }}
                >
                  <td>{order.id}</td>

                  <td>{order.customer}</td>

                  <td>{order.total}</td>

                  <td>
                    <span
                      className="rounded-full text-white"
                      style={{
                        background:
                          order.status === "تم التوصيل"
                            ? "#16A34A"
                            : order.status === "تم الشحن"
                            ? "#2563EB"
                            : "#F59E0B",
                        padding: "6px 14px",
                        fontSize: "13px",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button className="text-gray-500 hover:text-orange-500">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// lib/supabase/orders.ts

import { createClient as createServerClient } from "./Server";
import { createClient as createBrowserClient } from "./Client";
import type { Order, OrderStatus } from "./Types";

/* ───── إنشاء طلب من صفحة الشيك أوت ───── */

type CheckoutInput = {
  customerName: string;
  phone: string;
  email?: string;
  governorate: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: { productId?: string; productName: string; color?: string; size?: string; quantity: number; unitPrice: number }[];
  shippingCost: number;
};

export async function createOrder(input: CheckoutInput) {
  const supabase = createBrowserClient();

  const subtotal = input.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const total = subtotal + input.shippingCost;
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: input.customerName,
      phone: input.phone,
      email: input.email ?? null,
      governorate: input.governorate,
      address: input.address,
      notes: input.notes ?? null,
      payment_method: input.paymentMethod,
      subtotal,
      shipping_cost: input.shippingCost,
      total,
      status: "قيد الانتظار",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const itemRows = input.items.map((i) => ({
    order_id: order.id,
    product_id: i.productId ?? null,
    product_name: i.productName,
    color: i.color ?? null,
    size: i.size ?? null,
    quantity: i.quantity,
    unit_price: i.unitPrice,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(itemRows);
  if (itemsError) throw itemsError;

  return order as Order;
}

/* ───── قراءة الطلبات (الداش بورد) ───── */

export async function getOrders() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Order[];
}

export async function getOrderById(id: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Order;
}

/* ───── تحديث حالة الطلب - بيسجل تلقائي في order_status_history عبر الـ trigger ───── */

export async function updateOrderStatus(orderId: string, status: OrderStatus, note?: string) {
  const supabase = createBrowserClient();

  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) throw error;

  // لو حابب تضيف ملاحظة مخصوصة (مثلاً رقم تتبع الشحنة) مع نفس التحديث
  if (note) {
    await supabase
      .from("order_status_history")
      .update({ note })
      .eq("order_id", orderId)
      .eq("status", status)
      .order("changed_at", { ascending: false })
      .limit(1);
  }
}

export async function getOrderStatusHistory(orderId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("order_status_history")
    .select("*")
    .eq("order_id", orderId)
    .order("changed_at", { ascending: true });

  if (error) throw error;
  return data;
}
// app/supabase/orders.client.ts

import { createClient } from "./Client";
import type { Order, OrderStatus } from "./Types";

type CheckoutInput = {
  customerName: string;
  phone: string;
  email?: string;
  governorate: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: {
    productId?: string;
    productName: string;
    color?: string;
    size?: string;
    quantity: number;
    unitPrice: number;
  }[];
  shippingCost: number;
};

export async function createOrder(input: CheckoutInput) {
  const supabase = createClient();

  const subtotal = input.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

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

if (orderError) {
  console.log(orderError);
  alert(JSON.stringify(orderError, null, 2));
  throw orderError;
}
  const itemRows = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId ?? null,
    product_name: item.productName,
    color: item.color ?? null,
    size: item.size ?? null,
    quantity: item.quantity,
    unit_price: item.unitPrice,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemRows);

if (itemsError) {
  console.log(itemsError);
  alert(JSON.stringify(itemsError, null, 2));
  throw itemsError;
}
  return order as Order;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) throw error;

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
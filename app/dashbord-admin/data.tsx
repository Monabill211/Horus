import { LayoutGrid, Package, FolderOpen, ShoppingCart, Mail, Settings } from "lucide-react";

/* ─────────────────────────────────────────
   بيانات تجريبية - بدّلها باستدعاء Supabase
───────────────────────────────────────── */

export const productsData = [
  { name: "تيشيرت الفرعون أوفرسايز", price: 850, original: 1200, stock: 24, status: true, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
  { name: "بنطلون النيل الكارجو", price: 1450, stock: 0, status: true, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80" },
  { name: "شورت صحراوي كتان", price: 650, stock: 12, status: true, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=100&q=80" },
  { name: "ترنج حورس الرياضي", price: 2100, original: 2600, stock: 8, status: true, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&q=80" },
  { name: "تيشيرت ذهبي مطرز", price: 920, stock: 0, status: false, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100&q=80" },
  { name: "بنطلون أسود ضيق", price: 1250, stock: 6, status: true, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80" },
];

export const categoriesData = [
  { name: "تيشيرت", en: "T-Shirts", count: 14, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80" },
  { name: "بنطلون", en: "Pants", count: 9, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&q=80" },
  { name: "شورت", en: "Shorts", count: 7, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=150&q=80" },
  { name: "ترنج", en: "Tracksuits", count: 6, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&q=80" },
  { name: "هودي", en: "Hoodies", count: 0, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=150&q=80" },
];

export const ordersData = [
  { id: "ORD-000004", customer: "نبيل امام", email: "ahmed@gmail.com", total: "1,449,000", status: "ملغاة", color: "bg-rose-100 text-rose-600", date: "٢٠٢٦/٣/٢" },
  { id: "ORD-000003", customer: "Ella Montgomery", email: "ladezuv@mailinator.com", total: "53.45", status: "تم الشحن", color: "bg-purple-100 text-purple-600", date: "٢٠٢٦/١/٢٥" },
  { id: "ORD-000001", customer: "Odette Haley", email: "kumobusac@mailinator.com", total: "1,178.75", status: "تم التسليم", color: "bg-emerald-100 text-emerald-600", date: "٢٠٢٦/١/٢٢" },
  { id: "ORD-000002", customer: "Kay Washington", email: "fahmyuiux@gmail.com", total: "78.75", status: "قيد الانتظار", color: "bg-amber-100 text-amber-700", date: "٢٠٢٦/١/٢٢" },
];

export const messagesData = [
  { name: "نور الدين", email: "nour@gmail.com", subject: "استفسار عن منتج", message: "هل التيشيرت متوفر بمقاس XXL؟", date: "٢٠٢٦/٦/١٨", read: false },
  { name: "Layla Ahmed", email: "layla@mailinator.com", subject: "مشكلة في طلب", message: "طلبي متأخر عن الميعاد المحدد.", date: "٢٠٢٦/٦/١٧", read: true },
  { name: "محمود عادل", email: "mahmoud@gmail.com", subject: "تعاون أو شراكة", message: "عندي صفحة كبيرة وحابب أعمل تعاون.", date: "٢٠٢٦/٦/١٥", read: true },
  { name: "Hana Saeed", email: "hana@mailinator.com", subject: "استرجاع أو استبدال", message: "عايزة أستبدل المقاس بـ M.", date: "٢٠٢٦/٦/١٤", read: false },
];

/* ─────────────────────────────────────────
   التابات والنافيجيشن
───────────────────────────────────────── */

export type Tab = "overview" | "products" | "categories" | "orders" | "messages" | "settings";

export const navItems: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview", label: "لوحة التحكم", icon: <LayoutGrid size={17} /> },
  { tab: "products", label: "المنتجات", icon: <Package size={17} /> },
  { tab: "categories", label: "الفئات", icon: <FolderOpen size={17} /> },
  { tab: "orders", label: "الطلبات", icon: <ShoppingCart size={17} /> },
  { tab: "messages", label: "رسائل العملاء", icon: <Mail size={17} /> },
  { tab: "settings", label: "الإعدادات", icon: <Settings size={17} /> },
];

export const pageTitles: Record<Tab, string> = {
  overview: "لوحة التحكم",
  products: "المنتجات",
  categories: "الفئات",
  orders: "الطلبات",
  messages: "رسائل العملاء",
  settings: "الإعدادات",
};
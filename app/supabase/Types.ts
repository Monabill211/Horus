// lib/supabase/types.ts
// أنواع TypeScript مطابقة لجداول schema.sql
// لاحقاً تقدر تستبدل الملف ده بنسخة مولّدة تلقائي عبر:
// npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts

export type OrderStatus =
  | "قيد الانتظار"
  | "قيد التحضير"
  | "تم الشحن"
  | "تم التسليم"
  | "ملغاة";

export type Category = {
  id: string;
  name: string;
  name_en: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type ProductColor = {
  id: string;
  product_id: string;
  color_name: string;
  color_hex: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  sizes: string[];
  image_url: string;
  hover_image_url: string | null;
  category_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // علاقات (لو عملت .select بـ join)
  category?: Category;
  product_colors?: ProductColor[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  color: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  governorate: string;
  address: string;
  notes: string | null;
  payment_method: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
};

export type OrderStatusHistory = {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string | null;
  changed_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  source: string | null;
  visitor_id: string | null;
  created_at: string;
};

export type StoreSettings = {
  id: string;
  store_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  x_url: string | null;
  payment_cod: boolean;
  payment_visa: boolean;
  payment_vodafone: boolean;
  payment_instapay: boolean;
  shipping_cairo: number;
  shipping_other: number;
  updated_at: string;
};

// شكل عام مبسّط - لو حابب تستخدم النوع ده مباشرة مع createClient<Database>()
export type Database = {
  public: {
    Tables: {
      categories: { Row: Category; Insert: Partial<Category>; Update: Partial<Category> };
      products: { Row: Product; Insert: Partial<Product>; Update: Partial<Product> };
      product_colors: { Row: ProductColor; Insert: Partial<ProductColor>; Update: Partial<ProductColor> };
      orders: { Row: Order; Insert: Partial<Order>; Update: Partial<Order> };
      order_items: { Row: OrderItem; Insert: Partial<OrderItem>; Update: Partial<OrderItem> };
      order_status_history: { Row: OrderStatusHistory; Insert: Partial<OrderStatusHistory>; Update: Partial<OrderStatusHistory> };
      messages: { Row: Message; Insert: Partial<Message>; Update: Partial<Message> };
      page_views: { Row: PageView; Insert: Partial<PageView>; Update: Partial<PageView> };
      store_settings: { Row: StoreSettings; Insert: Partial<StoreSettings>; Update: Partial<StoreSettings> };
    };
  };
};
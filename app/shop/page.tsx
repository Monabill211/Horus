import { Suspense } from "react";
import Shop from "./shop";

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <Shop />
    </Suspense>
  );
}
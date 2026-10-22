"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import CartToast from "./CartToast";

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CartToast />
    </CartProvider>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, CartTotals } from "../types/cart";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity" | "id"> & { id?: string }, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totals: CartTotals;
  toastMessage: string | null;
  showToast: (message: string) => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75.0;
const STORAGE_KEY = "aesthetique_cart_v1";
const LEGACY_STORAGE_KEY = "lumethique_cart_v2";
const PROMO_STORAGE_KEY = "aesthetique_promo_v1";

// Default initial showcase sample items only on very first clean visit
const INITIAL_CART: CartItem[] = [
  {
    id: "calming_serum",
    productId: "calming_serum",
    slug: "calming_serum",
    name: "Calming Serum",
    price: 38.0,
    priceFormatted: "$38.00",
    image: "/assets/product_1_nobg.png",
    quantity: 1
  },
  {
    id: "anti_aging_serum",
    productId: "anti_aging_serum",
    slug: "anti_aging_serum",
    name: "Anti Aging Serum",
    price: 44.99,
    priceFormatted: "$44.99",
    image: "/assets/product_2_nobg.png",
    quantity: 1
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Keep whatever user had in storage (including an empty cart)
          setItems(parsed);
        } else {
          setItems(INITIAL_CART);
        }
      } else {
        // First ever visit: show initial demonstration cart and persist it
        setItems(INITIAL_CART);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CART));
      }

      const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
      if (savedPromo) {
        setAppliedPromo(savedPromo);
      }
    } catch {
      setItems(INITIAL_CART);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isHydrated]);

  // Save applied promo to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        if (appliedPromo) {
          localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
        } else {
          localStorage.removeItem(PROMO_STORAGE_KEY);
        }
      } catch (e) {
        console.error("Failed to save promo to localStorage", e);
      }
    }
  }, [appliedPromo, isHydrated]);

  // Synchronize cart across browser tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === STORAGE_KEY || e.key === LEGACY_STORAGE_KEY) && e.newValue !== null) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } catch {
          // ignore corrupted cross-tab payload
        }
      } else if (e.key === PROMO_STORAGE_KEY) {
        setAppliedPromo(e.newValue || null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    itemData: Omit<CartItem, "quantity" | "id"> & { id?: string },
    qty = 1
  ) => {
    const itemId = itemData.id || itemData.productId;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...itemData,
            id: itemId,
            quantity: Math.max(1, qty)
          }
        ];
      }
    });

    showToast(`Added ${itemData.name} to shopping bag`);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const removed = prev.find((i) => i.id === id);
      if (removed) {
        showToast(`Removed ${removed.name} from bag`);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "LUMINA10" || normalized === "WELCOME10") {
      setAppliedPromo(normalized);
      showToast("10% promotional discount applied!");
      return { success: true, message: "10% discount applied!" };
    } else if (normalized === "FREESHIP") {
      setAppliedPromo(normalized);
      showToast("Complimentary shipping code applied!");
      return { success: true, message: "Complimentary shipping applied!" };
    } else {
      return { success: false, message: "Invalid promotional code" };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast("Promotional code removed");
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedPromo === "LUMINA10" || appliedPromo === "WELCOME10") {
    discount = rawSubtotal * 0.1;
  }

  const freeShippingQualified =
    rawSubtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === "FREESHIP";
  const shipping = items.length === 0 || freeShippingQualified ? 0 : 8.5;
  const tax = (rawSubtotal - discount) * 0.0825; // standard ~8.25% estimate
  const total = Math.max(0, rawSubtotal - discount + shipping + tax);

  const freeShippingProgress = Math.min(
    100,
    Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - rawSubtotal
  );

  const totals: CartTotals = {
    itemCount,
    subtotal: rawSubtotal,
    subtotalFormatted: `$${rawSubtotal.toFixed(2)}`,
    discount,
    discountFormatted: `-$${discount.toFixed(2)}`,
    shipping,
    shippingFormatted: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`,
    tax,
    taxFormatted: `$${tax.toFixed(2)}`,
    total,
    totalFormatted: `$${total.toFixed(2)}`,
    freeShippingQualified,
    freeShippingProgress,
    freeShippingRemaining
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isHydrated,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totals,
        toastMessage,
        showToast,
        appliedPromo,
        applyPromo,
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

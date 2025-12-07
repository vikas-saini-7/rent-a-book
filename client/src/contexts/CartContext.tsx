"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  rentalPricePerWeek: number;
  depositAmount: number;
  libraryId: string;
  libraryName: string;
  availableCopies: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  getItemQuantity: (bookId: string) => number;
  getTotalItems: () => number;
  getTotalRental: () => number;
  getTotalDeposit: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("rentabook_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rentabook_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists
      const existingIndex = prevCart.findIndex((i) => i.bookId === item.bookId);
      if (existingIndex !== -1) {
        // Update quantity if already in cart
        const newCart = [...prevCart];
        const newQuantity = Math.min(
          newCart[existingIndex].quantity + item.quantity,
          item.availableCopies
        );
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newQuantity,
        };
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.bookId !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.bookId === bookId);
      if (itemIndex === -1) return prevCart;

      const item = prevCart[itemIndex];
      const newQuantity = Math.max(1, Math.min(quantity, item.availableCopies));

      const newCart = [...prevCart];
      newCart[itemIndex] = { ...item, quantity: newQuantity };
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (bookId: string): boolean => {
    return cart.some((item) => item.bookId === bookId);
  };

  const getItemQuantity = (bookId: string): number => {
    const item = cart.find((item) => item.bookId === bookId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalRental = (): number => {
    return cart.reduce((total, item) => {
      const price =
        typeof item.rentalPricePerWeek === "string"
          ? parseFloat(item.rentalPricePerWeek)
          : item.rentalPricePerWeek;
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
  };

  const getTotalDeposit = (): number => {
    return cart.reduce((total, item) => {
      const deposit =
        typeof item.depositAmount === "string"
          ? parseFloat(item.depositAmount)
          : item.depositAmount;
      return total + (isNaN(deposit) ? 0 : deposit * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        getTotalItems,
        getTotalRental,
        getTotalDeposit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Cartoon,
  getStoredCartoons,
  saveCartoons,
  getLikedCartoons,
  saveLikedCartoons,
} from "@/data/cartoons";

interface CartoonContextType {
  cartoons: Cartoon[];
  likedIds: string[];
  addCartoon: (cartoon: Omit<Cartoon, "id" | "likes">) => void;
  deleteCartoon: (id: string) => void;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  getFeaturedCartoon: () => Cartoon | null;
}

const CartoonContext = createContext<CartoonContextType | undefined>(undefined);

export function CartoonProvider({ children }: { children: ReactNode }) {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    setCartoons(getStoredCartoons());
    setLikedIds(getLikedCartoons());
  }, []);

  const addCartoon = (cartoon: Omit<Cartoon, "id" | "likes">) => {
    const newCartoon: Cartoon = {
      ...cartoon,
      id: Date.now().toString(),
      likes: 0,
    };
    const updated = [newCartoon, ...cartoons];
    setCartoons(updated);
    saveCartoons(updated);
  };

  const deleteCartoon = (id: string) => {
    const updated = cartoons.filter((c) => c.id !== id);
    setCartoons(updated);
    saveCartoons(updated);
  };

  const toggleLike = (id: string) => {
    const cartoon = cartoons.find((c) => c.id === id);
    if (!cartoon) return;

    const isCurrentlyLiked = likedIds.includes(id);
    let newLikedIds: string[];
    let updatedCartoons: Cartoon[];

    if (isCurrentlyLiked) {
      newLikedIds = likedIds.filter((likedId) => likedId !== id);
      updatedCartoons = cartoons.map((c) =>
        c.id === id ? { ...c, likes: Math.max(0, c.likes - 1) } : c
      );
    } else {
      newLikedIds = [...likedIds, id];
      updatedCartoons = cartoons.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      );
    }

    setLikedIds(newLikedIds);
    setCartoons(updatedCartoons);
    saveLikedCartoons(newLikedIds);
    saveCartoons(updatedCartoons);
  };

  const isLiked = (id: string) => likedIds.includes(id);

  const getFeaturedCartoon = () => {
    if (cartoons.length === 0) return null;
    // Return most recent or highest liked
    return [...cartoons].sort((a, b) => b.likes - a.likes)[0];
  };

  return (
    <CartoonContext.Provider
      value={{
        cartoons,
        likedIds,
        addCartoon,
        deleteCartoon,
        toggleLike,
        isLiked,
        getFeaturedCartoon,
      }}
    >
      {children}
    </CartoonContext.Provider>
  );
}

export function useCartoons() {
  const context = useContext(CartoonContext);
  if (context === undefined) {
    throw new Error("useCartoons must be used within a CartoonProvider");
  }
  return context;
}

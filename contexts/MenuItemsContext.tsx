import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: { uri: string };
}

interface MenuItemsContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (id: string) => void;
}

const MenuItemsContext = createContext<MenuItemsContextType | undefined>(undefined);

export function MenuItemsProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Roast Chicken",
      price: 20.0,
      unit: "1 kg",
      image: {
        uri: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
      },
    },
    {
      id: "2",
      name: "Adobo Rice Bowl",
      price: 15.0,
      unit: "1 kg",
      image: {
        uri: "https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=400&h=400&fit=crop",
      },
    },
    {
      id: "3",
      name: "Pancit Canton",
      price: 12.0,
      unit: "500 g",
      image: {
        uri: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop",
      },
    },
    {
      id: "4",
      name: "Lumpia Shanghai",
      price: 10.0,
      unit: "12 pcs",
      image: {
        uri: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=400&fit=crop",
      },
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuItemsContext.Provider value={{ menuItems, addMenuItem, deleteMenuItem }}>
      {children}
    </MenuItemsContext.Provider>
  );
}

export function useMenuItems() {
  const context = useContext(MenuItemsContext);
  if (context === undefined) {
    throw new Error("useMenuItems must be used within a MenuItemsProvider");
  }
  return context;
}


import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CourierInfo {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  avatar: string;
  currentLatLng: { latitude: number; longitude: number };
}

export interface OrderStatus {
  label: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  status: string; // "preparing" | "out_for_delivery" | "delivered"
  restaurantName: string;
  items: { name: string; quantity: number }[];
  total: number;
  originLatLng: { latitude: number; longitude: number };
  destLatLng: { latitude: number; longitude: number };
  pathCoordinates: { latitude: number; longitude: number }[];
  courier: CourierInfo;
  eta: string;
  distance: string;
  statusTimeline: OrderStatus[];
}

interface OrdersContextType {
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  subscribeToOrder: (id: string, callback: (order: Order) => void) => () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Mock data
const mockOrders: Order[] = [
  {
    id: "123",
    status: "out_for_delivery",
    restaurantName: "Shakey's",
    items: [
      { name: "Manager's Choice Pizza", quantity: 2 },
      { name: "Chicken & Mojos", quantity: 1 },
    ],
    total: 890,
    originLatLng: { latitude: 14.5995, longitude: 120.9842 }, // Manila (Shakey's)
    destLatLng: { latitude: 14.6091, longitude: 121.0223 }, // Destination (Org)
    pathCoordinates: [
      { latitude: 14.5995, longitude: 120.9842 },
      { latitude: 14.6020, longitude: 120.9900 },
      { latitude: 14.6050, longitude: 121.0000 },
      { latitude: 14.6070, longitude: 121.0100 },
      { latitude: 14.6091, longitude: 121.0223 },
    ],
    courier: {
      id: "c1",
      name: "Juan Dela Cruz",
      vehicle: "Motorcycle - ABC 1234",
      phone: "+63 912 345 6789",
      avatar: "https://i.pravatar.cc/150?img=12",
      currentLatLng: { latitude: 14.6050, longitude: 121.0000 },
    },
    eta: "15 min",
    distance: "2.3 km",
    statusTimeline: [
      { label: "Order Placed", time: "10:30 AM", completed: true, current: false },
      { label: "Preparing", time: "10:35 AM", completed: true, current: false },
      { label: "Out for Delivery", time: "10:50 AM", completed: false, current: true },
      { label: "Delivered", completed: false, current: false },
    ],
  },
];

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const subscribeToOrder = (id: string, callback: (order: Order) => void) => {
    const order = getOrderById(id);
    if (!order) return () => {};

    let currentIndex = 2; // Start at middle of path
    const interval = setInterval(() => {
      const updatedOrder = getOrderById(id);
      if (!updatedOrder) return;

      // Simulate courier moving along path
      currentIndex = (currentIndex + 1) % updatedOrder.pathCoordinates.length;
      const newCourierLocation = updatedOrder.pathCoordinates[currentIndex];

      const newOrder = {
        ...updatedOrder,
        courier: {
          ...updatedOrder.courier,
          currentLatLng: newCourierLocation,
        },
      };

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? newOrder : o))
      );

      callback(newOrder);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  };

  return (
    <OrdersContext.Provider value={{ orders, getOrderById, subscribeToOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}


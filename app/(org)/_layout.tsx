import { Stack } from "expo-router";
import { CartProvider } from "@/contexts/CartContext";
import { OrdersProvider } from "@/contexts/OrdersContext";

export default function OrgLayout() {
  return (
    <OrdersProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="food-list" />
          <Stack.Screen name="food-detail" />
          <Stack.Screen name="set-need-form" options={{ animation: 'none' }} />
          <Stack.Screen name="set-need-form-2" options={{ animation: 'none' }} />
          <Stack.Screen name="set-need-form-3" options={{ animation: 'none' }} />
          <Stack.Screen name="cart-items" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="payment-success" />
          <Stack.Screen name="orders" />
        </Stack>
      </CartProvider>
    </OrdersProvider>
  );
}


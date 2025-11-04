import { Stack } from "expo-router";
import { MenuItemsProvider } from "@/contexts/MenuItemsContext";

export default function RestaurantLayout() {
  return (
    <MenuItemsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="menu-pricing" />
      </Stack>
    </MenuItemsProvider>
  );
}


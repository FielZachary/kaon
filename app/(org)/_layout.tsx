import { Stack } from "expo-router";

export default function OrgLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="food-list" />
      <Stack.Screen name="food-detail" />
      <Stack.Screen name="set-need-form" options={{ animation: 'none' }} />
      <Stack.Screen name="set-need-form-2" options={{ animation: 'none' }} />
      <Stack.Screen name="set-need-form-3" options={{ animation: 'none' }} />
    </Stack>
  );
}


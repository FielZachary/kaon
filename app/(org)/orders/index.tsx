import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOrders } from "@/contexts/OrdersContext";

export default function OrdersListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orders } = useOrders();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => router.push(`/orders/${order.id}`)}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderRestaurant}>{order.restaurantName}</Text>
              <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                <Text style={styles.statusText}>{getStatusLabel(order.status)}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderItems}>
                {order.items.map((item) => `${item.name} (${item.quantity}x)`).join(", ")}
              </Text>
              <Text style={styles.orderTotal}>₱{order.total}</Text>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderEta}>ETA: {order.eta}</Text>
              <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
            </View>
          </TouchableOpacity>
        ))}
        {orders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "preparing":
      return "Preparing";
    case "out_for_delivery":
      return "Out for Delivery";
    case "delivered":
      return "Delivered";
    default:
      return "Unknown";
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "preparing":
      return { backgroundColor: "#FFF5E6" };
    case "out_for_delivery":
      return { backgroundColor: "#E6F7FF" };
    case "delivered":
      return { backgroundColor: "#E6FFE6" };
    default:
      return { backgroundColor: "#F5F5F5" };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  orderCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderRestaurant: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#474141",
  },
  orderDetails: {
    marginBottom: 12,
  },
  orderItems: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
    marginBottom: 4,
  },
  orderTotal: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#FF7622",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderEta: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#A0A5BA",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#A0A5BA",
  },
});


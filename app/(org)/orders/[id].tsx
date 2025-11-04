import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import { useOrders, Order } from "@/contexts/OrdersContext";

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { getOrderById, subscribeToOrder } = useOrders();
  const [order, setOrder] = useState<Order | undefined>(getOrderById(id as string));
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const panelHeight = useRef(new Animated.Value(0.5)).current; // 0.5 = 50% height

  const togglePanel = () => {
    const toValue = isPanelCollapsed ? 0.5 : 0.15;
    Animated.spring(panelHeight, {
      toValue,
      useNativeDriver: false,
      tension: 80,
      friction: 12,
    }).start();
    setIsPanelCollapsed(!isPanelCollapsed);
  };

  useEffect(() => {
    if (!id) return;
    const unsubscribe = subscribeToOrder(id as string, (updatedOrder) => {
      setOrder(updatedOrder);
    });
    return unsubscribe;
  }, [id]);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    const phoneNumber = order.courier.phone.replace(/\s+/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleMessage = () => {
    const phoneNumber = order.courier.phone.replace(/\s+/g, '');
    Linking.openURL(`sms:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: (order.originLatLng.latitude + order.destLatLng.latitude) / 2,
          longitude: (order.originLatLng.longitude + order.destLatLng.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Route Polyline */}
        <Polyline
          coordinates={order.pathCoordinates}
          strokeColor="#FF7622"
          strokeWidth={4}
        />

        {/* Origin (Restaurant) */}
        <Marker coordinate={order.originLatLng} title={order.restaurantName}>
          <View style={styles.markerRestaurant}>
            <Ionicons name="restaurant" size={20} color="#FFFFFF" />
          </View>
        </Marker>

        {/* Destination (Org) */}
        <Marker coordinate={order.destLatLng} title="Delivery Location">
          <View style={styles.markerDestination}>
            <Ionicons name="location" size={20} color="#FFFFFF" />
          </View>
        </Marker>

        {/* Courier (Live) */}
        <Marker coordinate={order.courier.currentLatLng} title={order.courier.name}>
          <View style={styles.markerCourier}>
            <Image
              source={{ uri: order.courier.avatar }}
              style={styles.courierAvatar}
            />
          </View>
        </Marker>
      </MapView>

      {/* Header Overlay */}
      <SafeAreaView style={[styles.headerOverlay, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Tracking</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {/* Bottom Panel */}
      <Animated.View 
        style={[
          styles.bottomPanel, 
          { 
            paddingBottom: insets.bottom + 16,
            maxHeight: panelHeight.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }
        ]}
      >
        {/* Drag Handle */}
        <TouchableOpacity 
          style={styles.dragHandle}
          onPress={togglePanel}
        >
          <View style={styles.dragIndicator} />
          <Ionicons 
            name={isPanelCollapsed ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#A0A5BA" 
          />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ETA & Distance */}
          <View style={styles.etaContainer}>
            <View style={styles.etaItem}>
              <Ionicons name="time-outline" size={20} color="#FF7622" />
              <Text style={styles.etaLabel}>ETA</Text>
              <Text style={styles.etaValue}>{order.eta}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.etaItem}>
              <Ionicons name="navigate-outline" size={20} color="#FF7622" />
              <Text style={styles.etaLabel}>Distance</Text>
              <Text style={styles.etaValue}>{order.distance}</Text>
            </View>
          </View>

          {/* Courier Card */}
          <View style={styles.courierCard}>
            <Image
              source={{ uri: order.courier.avatar }}
              style={styles.courierCardAvatar}
            />
            <View style={styles.courierInfo}>
              <Text style={styles.courierName}>{order.courier.name}</Text>
              <Text style={styles.courierVehicle}>{order.courier.vehicle}</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call" size={20} color="#FF7622" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
              <Ionicons name="chatbubble-outline" size={20} color="#FF7622" />
            </TouchableOpacity>
          </View>

          {/* Status Timeline */}
          <View style={styles.timelineContainer}>
            <Text style={styles.timelineTitle}>Order Status</Text>
            {order.statusTimeline.map((status, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  {status.completed ? (
                    <View style={styles.timelineDotCompleted}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  ) : status.current ? (
                    <View style={styles.timelineDotCurrent} />
                  ) : (
                    <View style={styles.timelineDotPending} />
                  )}
                  {index < order.statusTimeline.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        status.completed && styles.timelineLineCompleted,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineLabel,
                      status.current && styles.timelineLabelCurrent,
                    ]}
                  >
                    {status.label}
                  </Text>
                  {status.time && (
                    <Text style={styles.timelineTime}>{status.time}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  map: {
    flex: 1,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  errorText: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#474141",
    textAlign: "center",
    marginTop: 100,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dragHandle: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 8,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginBottom: 4,
  },
  etaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFF5F0",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  etaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E5E5",
  },
  etaLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
  },
  etaValue: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
  },
  courierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  courierCardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 4,
  },
  courierVehicle: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#A0A5BA",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineContainer: {
    marginBottom: 16,
  },
  timelineTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  timelineIndicator: {
    alignItems: "center",
    marginRight: 12,
  },
  timelineDotCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF7622",
    justifyContent: "center",
    alignItems: "center",
  },
  timelineDotCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FF7622",
  },
  timelineDotPending: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E5E5",
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 30,
    backgroundColor: "#E5E5E5",
    marginTop: 4,
  },
  timelineLineCompleted: {
    backgroundColor: "#FF7622",
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
    marginBottom: 2,
  },
  timelineLabelCurrent: {
    fontFamily: "Sen_700Bold",
    color: "#000000",
  },
  timelineTime: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#A0A5BA",
  },
  markerRestaurant: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF7622",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  markerDestination: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00C853",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  markerCourier: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FF7622",
  },
  courierAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});


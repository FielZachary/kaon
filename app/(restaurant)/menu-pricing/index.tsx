import { useMenuItems } from "@/contexts/MenuItemsContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuPricingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { menuItems, deleteMenuItem } = useMenuItems();
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuVisible) {
      // Animate in
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [menuVisible]);

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Item", `Are you sure you want to delete "${name}"?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMenuItem(id);
          setMenuVisible(null);
        },
      },
    ]);
  };

  const handleEdit = (id: string) => {
    setMenuVisible(null);
    // TODO: Navigate to edit screen
    Alert.alert("Edit", "Edit functionality coming soon!");
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#FF8C5A", "#FF6B35"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>Menu Pricing</Text>
      </LinearGradient>

      {/* Content */}
      <Pressable style={styles.flex1} onPress={() => setMenuVisible(null)}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Set Item Prices</Text>
          <Text style={styles.subtitle}>Upload Or Set Menu With Prices</Text>

          <View style={styles.grid}>
            {menuItems.map((item) => (
              <View key={item.id} style={styles.card}>
                {/* Three dots menu container */}
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() =>
                      setMenuVisible(menuVisible === item.id ? null : item.id)
                    }
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#474141"
                    />
                  </TouchableOpacity>

                  {/* Dropdown Menu */}
                  {menuVisible === item.id && (
                    <Animated.View
                      style={[
                        styles.dropdown,
                        {
                          opacity: opacityAnim,
                          transform: [
                            {
                              scale: scaleAnim,
                            },
                          ],
                        },
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleEdit(item.id)}
                      >
                        <Ionicons
                          name="create-outline"
                          size={16}
                          color="#474141"
                        />
                        <Text style={styles.dropdownText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleDelete(item.id, item.name)}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={16}
                          color="#FF3B30"
                        />
                        <Text style={[styles.dropdownText, styles.deleteText]}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                </View>

                {/* Food Image */}
                <Image source={item.image} style={styles.foodImage} />

                {/* Item Name */}
                <Text style={styles.itemName}>{item.name}</Text>

                {/* Price */}
                <Text style={styles.itemPrice}>P {item.price.toFixed(2)}</Text>

                {/* Bottom Row: Unit and Add Button */}
                <View style={styles.bottomRow}>
                  <Text style={styles.unitText}>{item.unit}</Text>
                  <TouchableOpacity style={styles.cardAddButton}>
                    <Ionicons name="add" size={20} color="#474141" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom Spacer for fixed buttons */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </Pressable>

      {/* Bottom Buttons */}
      <View
        style={[styles.bottomButtons, { paddingBottom: insets.bottom + 24 }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/menu-pricing/add-item")}
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  flex1: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#ffffff",
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 20,
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#757575",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  menuContainer: {
    alignSelf: "flex-end",
    position: "relative",
  },
  menuButton: {},
  foodImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#757575",
  },
  cardAddButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    bottom: 30,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 100,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  dropdownText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
  },
  deleteText: {
    color: "#FF3B30",
  },
  bottomSpacer: {
    height: 20,
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 4,
  },
  backButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

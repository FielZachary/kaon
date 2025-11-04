import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Mock data for menu items
const menuItems = [
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
];

export default function MenuPricingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
              {/* Three dots menu */}
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#474141" />
              </TouchableOpacity>

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

      {/* Bottom Buttons */}
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
  menuButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 4,
  },
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


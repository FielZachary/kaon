import RestaurantCard from "@/components/RestaurantCard";
import StatCard from "@/components/StatCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data
const restaurants = [
  {
    id: "1",
    name: "Barefoot",
    image: {
      uri: "https://cdn.prod.website-files.com/62fe74dd2fabc4077cc276c9/68a59cb764ce46bbe8a7cc47_barefoot%20logo.png",
    },
  },
  {
    id: "2",
    name: "Tugon",
    image: {
      uri: "https://pbs.twimg.com/profile_images/1688521659043758080/4HrZcSXc_400x400.jpg",
    },
  },
  {
    id: "3",
    name: "Kythe",
    image: {
      uri: "https://kythe.org/comms/wp-content/uploads/2024/10/Kythe-Logo-2020-.png",
    },
  },
];

const DRAWER_WIDTH = Dimensions.get("window").width * 0.75;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Ionicons name="menu" size={24} color="#474141" />
          </TouchableOpacity>

          <View style={styles.deliverySection}>
            <Text style={styles.deliverToLabel}>DELIVER TO</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationText}>
                <Text> WWF Quezon City </Text>
              </Text>
              <Ionicons name="chevron-down" size={16} color="#474141" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="basket-outline" size={24} color="#ffffff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            Offer With Impact,{" "}
            <Text style={styles.mainTitleBold}>Jollibee</Text>!
          </Text>
          <Text style={styles.subtitle}>Set Today's Offer</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#A0A5BA"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search organizations/events"
            placeholderTextColor="#A0A5BA"
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            label="FOOD SAVED"
            value="10.50 KG"
            date="October 15, 2025"
          />
          <StatCard
            label="VALUE SAVED"
            value="₱ 6000.00"
            date="October 15, 2025"
          />
        </View>

        {/* Best Matches Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Matches</Text>
            <TouchableOpacity onPress={() => router.push("/food-list")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.restaurantsScroll}
          >
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
              />
            ))}
          </ScrollView>
        </View>

        {/* View Entire List Button */}
        <TouchableOpacity
          style={styles.viewListButton}
          onPress={() => router.push("/food-list")}
        >
          <Text style={styles.viewListButtonText}>View Entire List</Text>
        </TouchableOpacity>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Settings Drawer */}
      {isDrawerOpen && (
        <>
          <TouchableOpacity
            style={styles.drawerOverlay}
            activeOpacity={1}
            onPress={closeDrawer}
          />
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: slideAnim }],
                paddingTop: insets.top,
              },
            ]}
          >
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <TouchableOpacity style={styles.backButton} onPress={closeDrawer}>
                <Ionicons name="arrow-back" size={24} color="#474141" />
              </TouchableOpacity>
              <Text style={styles.drawerTitle}>Settings</Text>
            </View>

            {/* Drawer Content */}
            <ScrollView style={styles.drawerContent}>
              {/* Account Section */}
              <Text style={styles.sectionLabel}>Account</Text>
              <View style={styles.settingsSection}>
                <TouchableOpacity style={styles.settingsItem}>
                  <Image
                    source={require("@/assets/icons/settings-edit-profile.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Edit Profile</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Image
                    source={require("@/assets/icons/settings-security.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Security</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Image
                    source={require("@/assets/icons/settings-notifications.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Notifications</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => router.push("/privacy-policy")}
                >
                  <Image
                    source={require("@/assets/icons/settings-privacy.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Privacy</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>
              </View>

              {/* Menu Options Section */}
              <Text style={styles.sectionLabel}>Menu Options</Text>
              <View style={styles.settingsSection}>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => router.push("/menu-pricing")}
                >
                  <Image
                    source={require("@/assets/icons/settings-edit-menu-pricing.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Edit Menu Pricing</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Image
                    source={require("@/assets/icons/settings-help-and-support.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>Help & Support</Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Image
                    source={require("@/assets/icons/settings-food-safety-policies.png")}
                    style={styles.settingsIcon}
                  />
                  <Text style={styles.settingsItemText}>
                    Food Safety Policies
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  deliverySection: {
    flex: 1,
    marginHorizontal: 16,
  },
  deliverToLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 11,
    color: "#FF6B35",
    marginBottom: 2,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#474141",
    marginRight: 4,
  },
  locationTextBold: {
    fontFamily: "Sen_700Bold",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#474141",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Sen_700Bold",
    fontSize: 11,
    color: "#ffffff",
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    lineHeight: 26,
    color: "#474141",
    marginBottom: 4,
  },
  mainTitleBold: {
    fontFamily: "Sen_700Bold",
  },
  subtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#A0A5BA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    borderWidth: 2,
    borderColor: "#A0A5BA",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FAFAFA",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#474141",
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: -6,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#474141",
  },
  seeAllText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#FF6B35",
  },
  restaurantsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  viewListButton: {
    backgroundColor: "#F5C89B",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  viewListButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#474141",
  },
  bottomSpacer: {
    height: 20,
  },
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  drawerTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#474141",
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  sectionLabel: {
    fontFamily: "Sen_700Bold",
    fontSize: 14,
    color: "#474141",
    marginBottom: 12,
    marginTop: 8,
  },
  settingsSection: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  settingsItemText: {
    flex: 1,
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#474141",
  },
});

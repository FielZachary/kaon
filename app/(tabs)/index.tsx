import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryButton from '@/components/CategoryButton';
import StatCard from '@/components/StatCard';

// Mock data
const categories = [
  { id: '1', name: 'Dessert', image: require('@/assets/images/icon.png') },
  { id: '2', name: 'Savory', image: require('@/assets/images/icon.png') },
  { id: '3', name: 'Beverage', image: require('@/assets/images/icon.png') },
  { id: '4', name: 'Filipino', image: require('@/assets/images/icon.png') },
  { id: '5', name: 'Cafe', image: require('@/assets/images/icon.png') },
];

const restaurants = [
  { id: '1', name: "Domino's", image: require('@/assets/images/icon.png') },
  { id: '2', name: 'Burger King', image: require('@/assets/images/icon.png') },
  { id: '3', name: 'Donuts', image: require('@/assets/images/icon.png') },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#474141" />
          </TouchableOpacity>
          
          <View style={styles.deliverySection}>
            <Text style={styles.deliverToLabel}>DELIVER TO</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationText}>WWF Quezon City</Text>
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
          <Text style={styles.mainTitle}>Order With Impact, WWF!</Text>
          <Text style={styles.subtitle}>Set Today's Target</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0A5BA" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants"
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

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                name={category.name}
                image={category.image}
              />
            ))}
          </ScrollView>
        </View>

        {/* Best Matches Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Matches</Text>
            <TouchableOpacity onPress={() => router.push('/restaurant-list')}>
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
          onPress={() => router.push('/restaurant-list')}
        >
          <Text style={styles.viewListButtonText}>View Entire List</Text>
        </TouchableOpacity>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliverySection: {
    flex: 1,
    marginHorizontal: 16,
  },
  deliverToLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 11,
    color: '#FF6B35',
    marginBottom: 2,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#474141',
    marginRight: 4,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#474141',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 11,
    color: '#ffffff',
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#474141',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#A0A5BA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    borderWidth: 2,
    borderColor: '#A0A5BA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#474141',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#474141',
  },
  seeAllText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#FF6B35',
  },
  categoriesScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  restaurantsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  viewListButton: {
    backgroundColor: '#F5C89B',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  viewListButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#474141',
  },
  bottomSpacer: {
    height: 20,
  },
});


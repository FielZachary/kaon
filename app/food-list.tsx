import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FoodItemCard from '@/components/FoodItemCard';
import CategoryButton from '@/components/CategoryButton';

// Mock data for categories
const categories = [
  { id: '1', name: 'Dessert', image: require('@/assets/images/icon.png') },
  { id: '2', name: 'Savory', image: require('@/assets/images/icon.png') },
  { id: '3', name: 'Beverage', image: require('@/assets/images/icon.png') },
  { id: '4', name: 'Filipino', image: require('@/assets/images/icon.png') },
  { id: '5', name: 'Cafe', image: require('@/assets/images/icon.png') },
];

// Mock data for available food
const availableFood = [
  {
    id: '1',
    restaurantName: 'Jollibee',
    restaurantLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/1200px-Jollibee_2011_logo.svg.png',
    foodDescription: 'Vegetable Fritters with Egg Beef Pares',
    goodUntil: new Date('2025-03-11T12:20:00'),
    category: 'Filipino',
  },
  {
    id: '2',
    restaurantName: "Shakey's",
    restaurantLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qLYvqVqZ3KqxqYqQxY9gQYvGQqHqHYqZqA&s',
    foodDescription: 'Vegetable Fritters with Egg Beef Pares',
    goodUntil: new Date('2025-05-11T12:20:00'),
    category: 'Savory',
  },
  {
    id: '3',
    restaurantName: 'Manam',
    restaurantLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqYvQxY9gQYvGQqHqHYqZqA&s',
    foodDescription: 'Sinigang Beef Pares',
    goodUntil: new Date('2025-10-12T12:20:00'),
    category: 'Filipino',
  },
  {
    id: '4',
    restaurantName: 'McDonalds',
    restaurantLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
    foodDescription: 'Vegetable Fritters with Egg Beef Pares',
    goodUntil: new Date('2025-11-15T14:30:00'),
    category: 'Savory',
  },
];

export default function FoodListScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  // Filter food by category if provided
  const filteredFood = category
    ? availableFood.filter((food) => food.category === category)
    : availableFood;

  // Format current timestamp
  const formatTimestamp = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return now.toLocaleString('en-US', options).replace(',', ', ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0A5BA" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants"
            placeholderTextColor="#A0A5BA"
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              name={cat.name}
              image={cat.image}
              onPress={() => router.push(`/food-list?category=${cat.name}`)}
            />
          ))}
        </ScrollView>

        {/* Timestamp */}
        <Text style={styles.timestamp}>{formatTimestamp()}</Text>

        {/* Food List */}
        <View style={styles.foodListContainer}>
          {filteredFood.map((food) => (
            <FoodItemCard
              key={food.id}
              id={food.id}
              restaurantName={food.restaurantName}
              restaurantLogo={food.restaurantLogo}
              foodDescription={food.foodDescription}
              goodUntil={food.goodUntil}
              category={food.category}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    borderWidth: 2,
    borderColor: '#A0A5BA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 20,
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
  categoriesScroll: {
    marginHorizontal: -24,
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 24,
  },
  timestamp: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  foodListContainer: {
    paddingBottom: 24,
  },
});


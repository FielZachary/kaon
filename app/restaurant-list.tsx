import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data
const allRestaurants = [
  { id: '1', name: "Domino's", image: { uri: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" }, category: 'Pizza' },
  { id: '2', name: 'Burger King', image: { uri: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop" }, category: 'Burger' },
  { id: '3', name: 'Donuts', image: { uri: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" }, category: 'Dessert' },
  { id: '4', name: 'Starbucks', image: { uri: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop" }, category: 'Cafe' },
  { id: '5', name: 'Jollibee', image: { uri: "https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=400&h=400&fit=crop" }, category: 'Filipino' },
  { id: '6', name: 'KFC', image: { uri: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop" }, category: 'Chicken' },
];

export default function RestaurantListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#474141" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Restaurants</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {allRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => router.push(`/restaurant-detail?id=${restaurant.id}`)}
          >
            <View style={styles.imageContainer}>
              <Image source={restaurant.image} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#474141',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  restaurantName: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#474141',
    marginBottom: 4,
  },
  restaurantCategory: {
    fontFamily: 'Sen_400Regular',
    fontSize: 13,
    color: '#A0A5BA',
  },
});


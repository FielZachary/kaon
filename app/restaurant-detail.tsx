import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock data
const restaurantDetails = {
  '1': {
    name: "Domino's",
    category: 'Pizza',
    description: 'Delicious pizzas with fresh ingredients',
    rating: 4.5,
    deliveryTime: '30-40 min',
    image: require('@/assets/images/icon.png'),
  },
  '2': {
    name: 'Burger King',
    category: 'Burger',
    description: 'Flame-grilled burgers and fast food favorites',
    rating: 4.3,
    deliveryTime: '25-35 min',
    image: require('@/assets/images/icon.png'),
  },
  '3': {
    name: 'Donuts',
    category: 'Dessert',
    description: 'Fresh donuts and sweet treats',
    rating: 4.7,
    deliveryTime: '15-25 min',
    image: require('@/assets/images/icon.png'),
  },
};

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const restaurant = restaurantDetails[id as keyof typeof restaurantDetails] || restaurantDetails['1'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#474141" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#474141" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Image */}
        <View style={styles.imageContainer}>
          <Image source={restaurant.image} style={styles.image} />
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.category}>{restaurant.category}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#A0A5BA" />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
          </View>

          <Text style={styles.description}>{restaurant.description}</Text>
        </View>

        {/* Impact Section */}
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactItem}>
              <Text style={styles.impactValue}>2.5 KG</Text>
              <Text style={styles.impactLabel}>Food you can save</Text>
            </View>
            <View style={styles.impactDivider} />
            <View style={styles.impactItem}>
              <Text style={styles.impactValue}>₱ 500</Text>
              <Text style={styles.impactLabel}>Value you can save</Text>
            </View>
          </View>
        </View>

        {/* Order Button */}
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>View Available Orders</Text>
        </TouchableOpacity>
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
    flex: 1,
    textAlign: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  restaurantName: {
    fontFamily: 'Sen_700Bold',
    fontSize: 26,
    color: '#474141',
    marginBottom: 4,
  },
  category: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#A0A5BA',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#474141',
    marginLeft: 6,
  },
  description: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#474141',
  },
  impactSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#474141',
    marginBottom: 16,
  },
  impactCard: {
    flexDirection: 'row',
    backgroundColor: '#F5C89B',
    borderRadius: 12,
    padding: 24,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
  },
  impactValue: {
    fontFamily: 'Sen_700Bold',
    fontSize: 24,
    color: '#474141',
    marginBottom: 4,
  },
  impactLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 13,
    color: '#474141',
    textAlign: 'center',
  },
  impactDivider: {
    width: 1,
    backgroundColor: 'rgba(71, 65, 65, 0.2)',
    marginHorizontal: 24,
  },
  orderButton: {
    backgroundColor: '#474141',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 8,
  },
  orderButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#ffffff',
  },
});


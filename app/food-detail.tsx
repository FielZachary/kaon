import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data for food listings
const foodDetails = {
  "1": {
    restaurantName: "Jollibee",
    restaurantLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/1200px-Jollibee_2011_logo.svg.png",
    foodName: "Vegetable Fritters with Egg Beef Pares",
    description: "Delicious vegetable fritters served with perfectly cooked egg and tender beef pares. A hearty Filipino comfort meal.",
    originalPrice: 250,
    discountedPrice: 125,
    quantityAvailable: 5,
    goodUntil: new Date('2025-03-11T12:20:00'),
    category: "Filipino",
    image: {
      uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    },
    foodSaved: 1.2,
    valueSaved: 125,
  },
  "2": {
    restaurantName: "Shakey's",
    restaurantLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qLYvqVqZ3KqxqYqQxY9gQYvGQqHqHYqZqA&s",
    foodName: "Vegetable Fritters with Egg Beef Pares",
    description: "Crispy fried chicken pieces served with classic Shakey's mojos and gravy.",
    originalPrice: 350,
    discountedPrice: 175,
    quantityAvailable: 3,
    goodUntil: new Date('2025-05-11T12:20:00'),
    category: "Savory",
    image: {
      uri: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop",
    },
    foodSaved: 1.5,
    valueSaved: 175,
  },
  "3": {
    restaurantName: "Manam",
    restaurantLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqYvQxY9gQYvGQqHqHYqZqA&s",
    foodName: "Sinigang Beef Pares",
    description: "Authentic Filipino sinigang with tender beef in a tangy tamarind broth.",
    originalPrice: 300,
    discountedPrice: 150,
    quantityAvailable: 4,
    goodUntil: new Date('2025-10-12T12:20:00'),
    category: "Filipino",
    image: {
      uri: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
    },
    foodSaved: 1.3,
    valueSaved: 150,
  },
  "4": {
    restaurantName: "McDonalds",
    restaurantLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    foodName: "Vegetable Fritters with Egg Beef Pares",
    description: "Classic Big Mac meal with fries and a drink. The iconic McDonald's experience.",
    originalPrice: 200,
    discountedPrice: 100,
    quantityAvailable: 10,
    goodUntil: new Date('2025-11-15T14:30:00'),
    category: "Savory",
    image: {
      uri: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop",
    },
    foodSaved: 0.8,
    valueSaved: 100,
  },
};

export default function FoodDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const food = foodDetails[id as keyof typeof foodDetails] || foodDetails["1"];
  const insets = useSafeAreaInsets();

  const formatExpirationDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${month}-${day}-${year} | ${hours}:${minutes} ${ampm}`;
  };

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
        <Text style={styles.headerTitle}>Food Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#474141" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Food Image */}
        <View style={styles.imageContainer}>
          <Image source={food.image} style={styles.image} />
        </View>

        {/* Restaurant Info */}
        <View style={styles.restaurantBanner}>
          <Image 
            source={{ uri: food.restaurantLogo }} 
            style={styles.restaurantLogo} 
          />
          <Text style={styles.restaurantName}>{food.restaurantName}</Text>
        </View>

        {/* Food Info */}
        <View style={styles.infoSection}>
          <Text style={styles.foodName}>{food.foodName}</Text>
          <Text style={styles.category}>{food.category}</Text>

          {/* Expiration Warning */}
          <View style={styles.expirationBanner}>
            <Ionicons name="time-outline" size={20} color="#FF6B35" />
            <View style={styles.expirationTextContainer}>
              <Text style={styles.expirationLabel}>Good Until:</Text>
              <Text style={styles.expirationTime}>{formatExpirationDate(food.goodUntil)}</Text>
            </View>
          </View>

          {/* Price & Quantity */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₱{food.originalPrice}</Text>
              <Text style={styles.discountedPrice}>₱{food.discountedPrice}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Available:</Text>
              <Text style={styles.quantityValue}>{food.quantityAvailable} left</Text>
            </View>
          </View>

          <Text style={styles.description}>{food.description}</Text>
        </View>

        {/* Impact Section */}
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactItem}>
              <Text style={styles.impactValue}>{food.foodSaved} KG</Text>
              <Text style={styles.impactLabel}>Food you'll save</Text>
            </View>
            <View style={styles.impactDivider} />
            <View style={styles.impactItem}>
              <Text style={styles.impactValue}>₱ {food.valueSaved}</Text>
              <Text style={styles.impactLabel}>Value you'll save</Text>
            </View>
          </View>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>Purchase Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
    color: "#474141",
    flex: 1,
    textAlign: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  restaurantBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  restaurantLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantName: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#474141",
  },
  infoSection: {
    padding: 24,
  },
  foodName: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#474141",
    marginBottom: 4,
  },
  category: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#A0A5BA",
    marginBottom: 16,
  },
  expirationBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },
  expirationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  expirationLabel: {
    fontFamily: "Sen_700Bold",
    fontSize: 12,
    color: "#474141",
  },
  expirationTime: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#FF6B35",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#A0A5BA",
    textDecorationLine: "line-through",
    marginRight: 12,
  },
  discountedPrice: {
    fontFamily: "Sen_700Bold",
    fontSize: 26,
    color: "#FF6B35",
  },
  quantityContainer: {
    alignItems: "flex-end",
  },
  quantityLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#A0A5BA",
  },
  quantityValue: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#474141",
  },
  description: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#474141",
  },
  impactSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#474141",
    marginBottom: 16,
  },
  impactCard: {
    flexDirection: "row",
    backgroundColor: "#F5C89B",
    borderRadius: 12,
    padding: 24,
  },
  impactItem: {
    flex: 1,
    alignItems: "center",
  },
  impactValue: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#474141",
    marginBottom: 4,
  },
  impactLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 13,
    color: "#474141",
    textAlign: "center",
  },
  impactDivider: {
    width: 1,
    backgroundColor: "rgba(71, 65, 65, 0.2)",
    marginHorizontal: 24,
  },
  purchaseButton: {
    backgroundColor: "#474141",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 8,
  },
  purchaseButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
});


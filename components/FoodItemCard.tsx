import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface FoodItemCardProps {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  foodDescription: string;
  goodUntil: Date;
  category?: string;
}

export default function FoodItemCard({
  id,
  restaurantName,
  restaurantLogo,
  foodDescription,
  goodUntil,
}: FoodItemCardProps) {
  const router = useRouter();

  const formatExpirationDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    return `${month}-${day}-${year} | ${hours}:${minutes} ${ampm}`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/food-detail?id=${id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: restaurantLogo }}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.foodDescription} numberOfLines={2}>
          {foodDescription}
        </Text>
        
        <View style={styles.expirationContainer}>
          <Text style={styles.goodUntilLabel}>Good Until:</Text>
          <Text style={styles.expirationTime}>{formatExpirationDate(goodUntil)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
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
  logoContainer: {
    width: 90,
    height: 93,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    marginRight: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#474141',
    marginBottom: 4,
  },
  foodDescription: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginBottom: 8,
  },
  expirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goodUntilLabel: {
    fontFamily: 'Sen_700Bold',
    fontSize: 13,
    color: '#474141',
    marginRight: 6,
  },
  expirationTime: {
    fontFamily: 'Sen_400Regular',
    fontSize: 13,
    color: '#FF6B35',
  },
});


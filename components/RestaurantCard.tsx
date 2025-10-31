import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: any;
}

export default function RestaurantCard({ id, name, image }: RestaurantCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/restaurant-detail?id=${id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginRight: 16,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#474141',
    textAlign: 'center',
  },
});


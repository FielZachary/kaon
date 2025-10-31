import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface CategoryButtonProps {
  name: string;
  image: any;
  onPress?: () => void;
}

export default function CategoryButton({ name, image, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  label: {
    fontFamily: 'Sen_400Regular',
    fontSize: 13,
    lineHeight: 26,
    color: '#474141',
    textAlign: 'center',
  },
});


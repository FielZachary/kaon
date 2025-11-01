import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EventCardProps {
  id: string;
  title: string;
  icon: 'balloon' | 'people';
  onPress?: () => void;
}

export default function EventCard({ title, icon, onPress }: EventCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'balloon':
        return 'balloon-outline';
      case 'people':
        return 'people-outline';
      default:
        return 'calendar-outline';
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={getIcon()} size={24} color="#FF6B35" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 12,
    height: 54,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#474141',
    flex: 1,
  },
});


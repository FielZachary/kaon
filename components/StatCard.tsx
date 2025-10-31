import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  label: string;
  value: string;
  date: string;
  onDatePress?: () => void;
}

export default function StatCard({ label, value, date, onDatePress }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dateButton} onPress={onDatePress}>
        <Text style={styles.dateText}>{date}</Text>
        <Ionicons name="chevron-down" size={16} color="#474141" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F5C89B',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
  },
  value: {
    fontFamily: 'Sen_700Bold',
    fontSize: 26,
    lineHeight: 32,
    color: '#474141',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Sen_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: '#474141',
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 11,
    color: '#474141',
  },
});


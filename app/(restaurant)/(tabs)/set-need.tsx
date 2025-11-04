import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Calendar from '@/components/Calendar';
import EventCard from '@/components/EventCard';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'November Celebrants Celebration',
    date: '2025-11-05',
    icon: 'balloon' as const,
  },
  {
    id: '2',
    title: 'Stakeholders Gala',
    date: '2025-11-05',
    icon: 'people' as const,
  },
];

export default function SetNeedScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 20)); // Nov 20, 2025

  const formatSelectedDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
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

        {/* Title */}
        <Text style={styles.pageTitle}>Schedule Needs!</Text>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* Set Need Button */}
        <TouchableOpacity
          style={styles.setNeedButton}
          onPress={() => router.push('/set-need-form')}
        >
          <Text style={styles.setNeedButtonText}>Set Need</Text>
        </TouchableOpacity>

        {/* Selected Date Display */}
        <Text style={styles.selectedDateText}>{formatSelectedDate(selectedDate)}</Text>

        {/* Event Cards */}
        <View style={styles.eventsContainer}>
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              icon={event.icon}
            />
          ))}
        </View>

        {/* Bottom Spacer */}
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
  pageTitle: {
    fontFamily: 'Sen_700Bold',
    fontSize: 22,
    color: '#474141',
    marginTop: 8,
    marginBottom: 24,
  },
  setNeedButton: {
    backgroundColor: '#FF6B35',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  setNeedButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 22,
    color: '#ffffff',
  },
  selectedDateText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#474141',
    marginBottom: 16,
  },
  eventsContainer: {
    marginBottom: 24,
  },
  bottomSpacer: {
    height: 20,
  },
});

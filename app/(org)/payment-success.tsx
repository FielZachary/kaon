import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Congratulations Title */}
        <Text style={styles.title}>Congratulations!</Text>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            You successfully made a payment,{'\n'}enjoy our service!
          </Text>
        </View>

        {/* Track Order Button */}
        <TouchableOpacity
          style={[styles.trackButton, { marginBottom: Math.max(insets.bottom, 20) }]}
          onPress={() => {
            // Navigate to order tracking screen
            router.push('/orders/123');
          }}
        >
          <Text style={styles.trackButtonText}>TRACK ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Sen_700Bold',
    fontSize: 24,
    lineHeight: 32,
    color: '#111A2C',
    textAlign: 'center',
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 40,
  },
  message: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#525C67',
    opacity: 0.6,
    textAlign: 'center',
  },
  trackButton: {
    backgroundColor: '#FF7622',
    height: 62,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});


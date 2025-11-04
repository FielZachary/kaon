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
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

type PaymentMethod = 'cash' | 'gcash' | 'mastercard' | 'paypal';

export default function PaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { total, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cash');

  const handlePay = () => {
    // Clear cart and navigate to success
    clearCart();
    router.push('/payment-success');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Methods */}
        <View style={styles.paymentMethods}>
          {/* Cash */}
          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={() => setSelectedMethod('cash')}
          >
            {selectedMethod === 'cash' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#FF7622" />
              </View>
            )}
            <View style={styles.paymentIconContainer}>
              <Ionicons name="cash-outline" size={40} color="#FF7622" />
            </View>
            <Text style={styles.paymentMethodLabel}>Cash</Text>
          </TouchableOpacity>

          {/* GCash */}
          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={() => setSelectedMethod('gcash')}
          >
            {selectedMethod === 'gcash' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#FF7622" />
              </View>
            )}
            <View style={[styles.paymentIconContainer]}> 
              <Image
                source={require('@/assets/images/GCashIcon.png')}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.paymentMethodLabel}>Gcash</Text>
          </TouchableOpacity>

          {/* Mastercard */}
          <TouchableOpacity
            style={[
              styles.paymentMethodCard,
              selectedMethod === 'mastercard' && styles.paymentMethodCardSelected,
            ]}
            onPress={() => setSelectedMethod('mastercard')}
          >
            {selectedMethod === 'mastercard' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#FF7622" />
              </View>
            )}
            <View style={styles.paymentIconContainer}>
              <View style={styles.mastercardLogo}>
                <View style={styles.mastercardCircle1} />
                <View style={styles.mastercardCircle2} />
              </View>
            </View>
            <Text style={styles.paymentMethodLabel}>Mastercard</Text>
          </TouchableOpacity>

          {/* PayPal */}
          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={() => setSelectedMethod('paypal')}
          >
            {selectedMethod === 'paypal' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#FF7622" />
              </View>
            )}
            <View style={styles.paymentIconContainer}>
              <Text style={styles.paypalText}>PayPal</Text>
            </View>
            <Text style={styles.paymentMethodLabel}>PayPal</Text>
          </TouchableOpacity>
        </View>

        {/* Card Details Section (for Mastercard) */}
        {selectedMethod === 'mastercard' && (
          <View style={styles.cardSection}>
            <Text style={styles.cardSectionTitle}>No master card added</Text>
            <Text style={styles.cardSectionSubtitle}>
              You can add a mastercard and save it for later
            </Text>
            <TouchableOpacity style={styles.addNewButton}>
              <Ionicons name="add" size={20} color="#FF7622" />
              <Text style={styles.addNewText}>ADD NEW</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Total Display */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalAmount}>P{total.toFixed(0)}</Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>PAY</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={[styles.navButtons, { paddingBottom: Math.max(insets.bottom + 60, 72) }]}>
        <TouchableOpacity
          style={styles.backNavButton}
          onPress={() => router.back()}
        >
          <Text style={styles.navButtonText}>Back</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sen_400Regular',
    fontSize: 17,
    color: '#181C2E',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 21,
    paddingTop: 20,
    paddingBottom: 100,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  paymentMethodCard: {
    width: 85,
    alignItems: 'center',
    position: 'relative',
  },
  paymentMethodCardSelected: {
    borderWidth: 2,
    borderColor: '#FF7622',
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
  },
  paymentIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E6E0D8',
  },
  gcashIcon: {
    backgroundColor: '#0170CE',
  },
  gcashText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mastercardCircle1: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EB001B',
    marginRight: -10,
  },
  mastercardCircle2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F79E1B',
  },
  paypalText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 12,
    color: '#003087',
  },
  paymentMethodLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#464E57',
    textAlign: 'center',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E0D8',
  },
  cardSectionTitle: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#32343E',
    marginBottom: 8,
  },
  cardSectionSubtitle: {
    fontFamily: 'Sen_400Regular',
    fontSize: 15,
    color: '#2D2D2D',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FF7622',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addNewText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#FF7622',
    textTransform: 'uppercase',
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#A0A5BA',
    textTransform: 'uppercase',
    marginRight: 16,
  },
  totalAmount: {
    fontFamily: 'Sen_400Regular',
    fontSize: 30,
    color: '#181C2E',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 21,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  payButton: {
    backgroundColor: '#FF823F',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    minWidth: 102,
  },
  payButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  navButtons: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 13,
  },
  backNavButton: {
    backgroundColor: '#FF823F',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});


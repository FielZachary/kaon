import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, subtotal, deliveryFee, total } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Items List */}
        <View style={styles.itemsSection}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImageContainer}>
                {item.image ? (
                  <Image source={item.image} style={styles.itemImage} />
                ) : (
                  <View style={styles.itemImagePlaceholder} />
                )}
              </View>
              <View style={styles.itemDetails}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemAvailable}>
                    {item.available} {item.unit} available
                  </Text>
                  <Text style={styles.itemPrice}>P {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Ionicons name="remove" size={16} color="#999590" />
                  </TouchableOpacity>
                  <View style={styles.quantityValue}>
                    <Text style={styles.quantityText}>{item.quantity}{item.unit}</Text>
                  </View>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Ionicons name="add" size={16} color="#999590" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>P{subtotal.toFixed(0)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>P{deliveryFee.toFixed(0)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>P{total.toFixed(0)}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
            <TouchableOpacity>
              <Text style={styles.editLink}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>Ateneo, QC</Text>
          </View>
        </View>

        {/* Total Display */}
        <View style={styles.totalSection}>
          <View style={styles.totalDisplay}>
            <Text style={styles.totalLabelSmall}>TOTAL:</Text>
            <Text style={styles.totalAmount}>P{total.toFixed(0)}</Text>
          </View>
          <TouchableOpacity style={styles.breakdownLink}>
            <Text style={styles.breakdownText}>breakdown</Text>
            <Ionicons name="chevron-down" size={16} color="#FF7622" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => router.push('/payment')}
        >
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation buttons removed here; only Payment has Back action */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 47,
    paddingBottom: 200,
  },
  itemsSection: {
    paddingHorizontal: 49,
    gap: 26,
    marginBottom: 40,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 16,
  },
  itemImageContainer: {
    width: 116,
    height: 110,
    backgroundColor: '#FFFEFE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 16,
  },
  itemName: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#262626',
  },
  itemAvailable: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#999590',
  },
  itemPrice: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#262626',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E6E0D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
  },
  priceBreakdown: {
    paddingHorizontal: 36,
    marginBottom: 40,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E0D8',
  },
  priceLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#999590',
  },
  priceValue: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#999590',
  },
  totalRow: {
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#333333',
  },
  totalValue: {
    fontFamily: 'Sen_700Bold',
    fontSize: 18,
    color: '#333333',
  },
  addressSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#A0A5BA',
    textTransform: 'uppercase',
  },
  editLink: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#FF7622',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  addressCard: {
    height: 62,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  addressText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#32343E',
    opacity: 0.5,
  },
  totalSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  totalDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabelSmall: {
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
  breakdownLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
  },
  breakdownText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#FF7622',
    textTransform: 'lowercase',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  placeOrderButton: {
    backgroundColor: '#FF7622',
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  // Removed nav button styles on this screen
});


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/contexts/CartContext';

export default function CartItemsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, updateQuantity, removeItem, subtotal, totalQuantity } = useCart();

  const handleDecrease = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    } else {
      removeItem(id);
    }
  };

  const handleIncrease = (id: string, currentQty: number, available: number) => {
    if (currentQty < available) {
      updateQuantity(id, currentQty + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image Banner */}
      <View style={styles.headerBanner}>
        <ImageBackground
          source={require('@/assets/images/shakeys50.png')}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items List */}
        <View style={styles.itemsContainer}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                {/* Item Image */}
                <View style={styles.itemImageContainer}>
                  {item.image ? (
                    <Image source={item.image} style={styles.itemImage} />
                  ) : (
                    <View style={styles.itemImagePlaceholder} />
                  )}
                </View>

                {/* Item Details */}
                <View style={styles.itemDetails}>
                  <View style={styles.itemInfo}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeItem(item.id)}
                      >
                        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemAvailable}>
                      {item.available} {item.unit} available
                    </Text>
                    <Text style={styles.itemPrice}>P {item.price.toFixed(2)}</Text>
                  </View>

                  {/* Quantity Selector */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrease(item.id, item.quantity)}
                    >
                      <Ionicons name="remove" size={16} color="#999590" />
                    </TouchableOpacity>
                    <View style={styles.quantityValue}>
                      <Text style={styles.quantityText}>{item.quantity}{item.unit}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.quantityButton, styles.quantityButtonActive]}
                      onPress={() => handleIncrease(item.id, item.quantity, item.available)}
                    >
                      <Ionicons name="add" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Add to Cart Tray */}
      {cartItems.length > 0 && (
        <View style={[styles.bottomTray, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.trayContent}>
            <Text style={styles.trayTotal}>P{subtotal.toFixed(0)}</Text>
            <View style={styles.trayQuantityContainer}>
              <TouchableOpacity
                style={styles.trayQuantityButton}
                onPress={() => {
                  if (totalQuantity > 1) {
                    // Decrease all items by 1
                    cartItems.forEach((item) => {
                      handleDecrease(item.id, item.quantity);
                    });
                  }
                }}
              >
                <Ionicons name="remove" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.trayQuantityValue}>
                <Text style={styles.trayQuantityText}>{totalQuantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.trayQuantityButton}
                onPress={() => {
                  // Increase all items by 1 (respecting limits)
                  cartItems.forEach((item) => {
                    handleIncrease(item.id, item.quantity, item.available);
                  });
                }}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation buttons removed on this screen to avoid overlay */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBanner: {
    height: 291,
    backgroundColor: '#FF823F',
    position: 'relative',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 45,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // brand text removed in favor of provided image
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 200,
  },
  itemsContainer: {
    gap: 26,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#999590',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#262626',
    flex: 1,
  },
  deleteButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  quantityButtonActive: {
    backgroundColor: '#FF823F',
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
  bottomTray: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F0F5FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 32,
  },
  trayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trayTotal: {
    fontFamily: 'Sen_700Bold',
    fontSize: 28,
    color: '#181C2E',
  },
  trayQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7622',
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
  trayQuantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trayQuantityValue: {
    minWidth: 20,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  trayQuantityText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  addToCartButton: {
    backgroundColor: '#FF7622',
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addToCartText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  // Removed nav button styles on this screen
});


import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useMenuItems } from "@/contexts/MenuItemsContext";

export default function AddItemScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addMenuItem } = useMenuItems();
  const [priceUnit, setPriceUnit] = useState("P/kg");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [foodName, setFoodName] = useState("");
  const [markedDownPrice, setMarkedDownPrice] = useState("");
  const [pricePerItem, setPricePerItem] = useState("");

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant camera roll permissions to upload images."
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddItem = () => {
    // Validate form
    if (!foodName.trim()) {
      Alert.alert("Error", "Please enter a food item name");
      return;
    }
    if (!markedDownPrice.trim()) {
      Alert.alert("Error", "Please enter a marked down price");
      return;
    }
    if (!imageUri) {
      Alert.alert("Error", "Please upload an image");
      return;
    }

    // Add the item to the list
    addMenuItem({
      name: foodName,
      price: parseFloat(markedDownPrice),
      unit: priceUnit,
      image: { uri: imageUri },
    });

    // Show success and go back
    Alert.alert("Success", "Item added successfully!", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#FF8C5A", "#FF6B35"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>Menu Pricing</Text>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Set Item Prices</Text>
          <Text style={styles.subtitle}>Upload Or Set Menu With Prices</Text>

          {/* Food Item Input */}
          <Text style={styles.inputLabel}>Food Item</Text>
          <TextInput
            style={styles.textInput}
            placeholder=""
            placeholderTextColor="#A0A5BA"
            value={foodName}
            onChangeText={setFoodName}
          />

          {/* Item Marked Down Price */}
          <Text style={styles.inputLabel}>Item Marked Down Price</Text>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder=""
              placeholderTextColor="#A0A5BA"
              keyboardType="numeric"
              value={markedDownPrice}
              onChangeText={setMarkedDownPrice}
            />
            <TouchableOpacity style={styles.unitDropdown}>
              <Text style={styles.unitText}>{priceUnit}</Text>
              <Ionicons name="chevron-down" size={16} color="#474141" />
            </TouchableOpacity>
          </View>

          {/* P/Item Field (gray, no margin) */}
          <TextInput
            style={styles.perItemInput}
            placeholder="P/Item"
            placeholderTextColor="#A0A5BA"
            keyboardType="numeric"
            value={pricePerItem}
            onChangeText={setPricePerItem}
          />

          {/* Upload Picture Card */}
          <View style={styles.uploadCard}>
            <View style={styles.whiteBox}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
              ) : (
                <>
                  <View style={styles.uploadIconContainer}>
                    <Ionicons name="cloud-upload-outline" size={48} color="#FF6B35" />
                  </View>
                  <Text style={styles.uploadTitle}>Upload Picture</Text>
                  <Text style={styles.uploadSubtext}>Supported formats: PNG, JPG</Text>
                </>
              )}
            </View>
            
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>
                {imageUri ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#ffffff",
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 20,
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#757575",
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#000000",
    marginBottom: 6,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
  },
  priceInputContainer: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  unitDropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  unitText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: "#000000",
  },
  perItemInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8",
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#000000",
    marginBottom: 16,
  },
  uploadCard: {
    backgroundColor: "#F5E6D3",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  whiteBox: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  uploadedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  uploadIconContainer: {
    marginBottom: 16,
  },
  uploadTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
  },
  uploadSubtext: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#757575",
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  uploadButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: 100,
    alignSelf: "center",
  },
  addButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
});


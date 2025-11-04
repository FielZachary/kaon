import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { getOCRService } from "@/services/ocr/azureOCR";
import { initOCR } from "@/services/ocr/init";
import { parseMenuLayout } from "@/services/ocr/menuParser";

export default function ImportMenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant photo library access to import menu images."
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant camera access to take menu photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleChooseFromGallery = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAnalyzeMenu = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    try {
      // Enhance image before OCR
      const manipResult = await ImageManipulator.manipulateAsync(
        selectedImage,
        [{ resize: { width: 1200 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      // Ensure OCR service is initialized (handles missing env on cold starts)
      let ocrService;
      try {
        ocrService = getOCRService();
      } catch (e) {
        const ok = initOCR();
        if (!ok) {
          throw new Error(
            "Azure OCR not configured. Set EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT and EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_KEY, then restart Expo."
          );
        }
        ocrService = getOCRService();
      }
      const ocrResult = await ocrService.analyzeMenu(manipResult.uri);

      // Parse layout into menu items
      const parsedData = parseMenuLayout(ocrResult);

      if (parsedData.items.length === 0) {
        Alert.alert(
          "No Items Found",
          "Could not detect menu items. Please try another photo or add items manually."
        );
        setIsAnalyzing(false);
        return;
      }

      // Navigate to review screen with parsed data
      router.push({
        pathname: "/menu-pricing/review-import",
        params: {
          imageUri: selectedImage,
          itemsData: JSON.stringify(parsedData.items),
        },
      });
    } catch (error) {
      console.error("OCR Error:", error);
      Alert.alert(
        "Analysis Failed",
        "Could not analyze menu. Please check your Azure OCR configuration or try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Import Menu</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.changeImageText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            <Text style={styles.instructionText}>
              Capture or upload a photo of your menu to automatically extract items and prices.
            </Text>

            <TouchableOpacity style={styles.optionButton} onPress={handleTakePhoto}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="camera" size={32} color="#FF7622" />
              </View>
              <Text style={styles.optionTitle}>Take Photo</Text>
              <Text style={styles.optionSubtitle}>Use camera to capture menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleChooseFromGallery}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="images" size={32} color="#FF7622" />
              </View>
              <Text style={styles.optionTitle}>Choose from Gallery</Text>
              <Text style={styles.optionSubtitle}>Select existing menu photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedImage && (
          <TouchableOpacity
            style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]}
            onPress={handleAnalyzeMenu}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.analyzeButtonText}>Analyzing Menu...</Text>
              </>
            ) : (
              <Text style={styles.analyzeButtonText}>Analyze Menu</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  instructionText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#474141",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  optionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF5F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  optionTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#A0A5BA",
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#F8F8F8",
  },
  changeImageButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeImageText: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#FF7622",
  },
  analyzeButton: {
    backgroundColor: "#FF7622",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  analyzeButtonDisabled: {
    opacity: 0.6,
  },
  analyzeButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});

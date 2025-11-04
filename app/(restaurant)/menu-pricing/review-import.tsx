import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMenuItems } from "@/contexts/MenuItemsContext";
import { ParsedMenuItem, ReviewedMenuItem } from "@/services/ocr/types";

export default function ReviewImportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bulkAddMenuItems } = useMenuItems();
  const { imageUri, itemsData } = useLocalSearchParams();

  const [items, setItems] = useState<ReviewedMenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (itemsData && typeof itemsData === "string") {
      const parsedItems: ParsedMenuItem[] = JSON.parse(itemsData);
      const reviewed: ReviewedMenuItem[] = parsedItems.map((item) => ({
        ...item,
        isEdited: false,
      }));
      setItems(reviewed);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(parsedItems.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    }
  }, [itemsData]);

  const updateItem = (id: string, field: keyof ReviewedMenuItem, value: any) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value, isEdited: true } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveAll = () => {
    if (items.length === 0) {
      Alert.alert("No Items", "Please add at least one item before saving.");
      return;
    }

    // Validate items
    const invalidItems = items.filter(
      (item) => !item.name.trim() || item.price <= 0
    );

    if (invalidItems.length > 0) {
      Alert.alert(
        "Invalid Items",
        "Some items have missing names or invalid prices. Please fix them before saving."
      );
      return;
    }

    // Convert to MenuItem format
    const menuItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      unit: "kg", // Default unit, can be made editable
      image: { uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop" },
    }));

    bulkAddMenuItems(menuItems);

    Alert.alert(
      "Import Successful",
      `Successfully imported ${items.length} menu items!`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/menu-pricing"),
        },
      ]
    );
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = items.filter((item) => item.category === category);
    return acc;
  }, {} as Record<string, ReviewedMenuItem[]>);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Import</Text>
        <TouchableOpacity onPress={handleSaveAll} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {imageUri && typeof imageUri === "string" && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}>Items Found</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{categories.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {items.filter((item) => item.confidence > 0.8).length}
            </Text>
            <Text style={styles.statLabel}>High Confidence</Text>
          </View>
        </View>

        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {groupedItems[category].map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View
                    style={[
                      styles.confidenceBadge,
                      item.confidence >= 0.8
                        ? styles.confidenceHigh
                        : item.confidence >= 0.5
                        ? styles.confidenceMedium
                        : styles.confidenceLow,
                    ]}
                  >
                    <Text style={styles.confidenceText}>
                      {Math.round(item.confidence * 100)}%
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteItem(item.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemField}>
                  <Text style={styles.fieldLabel}>Item Name</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={item.name}
                    onChangeText={(text) => updateItem(item.id, "name", text)}
                    placeholder="Enter item name"
                  />
                </View>

                {item.description && (
                  <View style={styles.itemField}>
                    <Text style={styles.fieldLabel}>Description</Text>
                    <TextInput
                      style={[styles.fieldInput, styles.fieldInputMultiline]}
                      value={item.description}
                      onChangeText={(text) =>
                        updateItem(item.id, "description", text)
                      }
                      placeholder="Optional description"
                      multiline
                    />
                  </View>
                )}

                <View style={styles.itemField}>
                  <Text style={styles.fieldLabel}>Price (₱)</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={item.price.toString()}
                    onChangeText={(text) => {
                      const price = parseFloat(text) || 0;
                      updateItem(item.id, "price", price);
                    }}
                    placeholder="Enter price"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.itemField}>
                  <Text style={styles.fieldLabel}>Category</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={item.category}
                    onChangeText={(text) => updateItem(item.id, "category", text)}
                    placeholder="Enter category"
                  />
                </View>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.saveAllButton} onPress={handleSaveAll}>
          <Text style={styles.saveAllButtonText}>
            Save {items.length} Items to Menu
          </Text>
        </TouchableOpacity>
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
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 14,
    color: "#FF7622",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imagePreviewContainer: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    backgroundColor: "#F8F8F8",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF5F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Sen_700Bold",
    fontSize: 24,
    color: "#FF7622",
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#474141",
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#000000",
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceHigh: {
    backgroundColor: "#E6FFE6",
  },
  confidenceMedium: {
    backgroundColor: "#FFF5E6",
  },
  confidenceLow: {
    backgroundColor: "#FFE6E6",
  },
  confidenceText: {
    fontFamily: "Sen_700Bold",
    fontSize: 12,
    color: "#474141",
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  itemField: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: "Sen_400Regular",
    fontSize: 12,
    color: "#A0A5BA",
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  fieldInputMultiline: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  bottomSpacer: {
    height: 100,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  saveAllButton: {
    backgroundColor: "#FF7622",
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveAllButtonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});


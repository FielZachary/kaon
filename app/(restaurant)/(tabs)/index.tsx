import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RestaurantHomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Restaurant Dashboard</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Sen_700Bold",
    fontSize: 32,
    color: "#474141",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 18,
    color: "#A0A5BA",
  },
});


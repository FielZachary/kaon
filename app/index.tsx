import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Kaon</Text>
        <Text style={styles.subtitle}>Choose your account type</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.orgButton]}
            onPress={() => router.push("/(org)")}
          >
            <Text style={styles.buttonText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.restaurantButton]}
            onPress={() => router.push("/(restaurant)")}
          >
            <Text style={styles.buttonText}>Restaurant</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 36,
    color: "#474141",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Sen_400Regular",
    fontSize: 18,
    color: "#A0A5BA",
    marginBottom: 48,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  orgButton: {
    backgroundColor: "#FF6B35",
  },
  restaurantButton: {
    backgroundColor: "#474141",
  },
  buttonText: {
    fontFamily: "Sen_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
});


import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#474141" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          At Kaonnect, we uphold the highest standards of integrity, transparency, and
          accountability in all our business operations. We are fully committed to complying
          with all applicable laws, regulations, and industry standards governing food safety,
          labor, data protection, and fair business practices. Every team member, supplier, and
          partner is expected to conduct themselves ethically and responsibly in alignment with
          Kaonnect’s core values.
        </Text>
        <Text style={styles.paragraph}>
          We continuously review and improve our internal systems to ensure ongoing compliance and
          to prevent any form of misconduct, fraud, or negligence. Any violations or concerns must
          be reported immediately through proper channels and will be addressed promptly and fairly.
          By adhering to these standards, Kaonnect ensures the trust of our customers, partners, and
          the communities we serve.
        </Text>
      </ScrollView>

      {/* Accept Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => router.back()}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f5",
  },
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Sen_400Regular",
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  paragraph: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#474141",
    marginBottom: 14,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  acceptButton: {
    backgroundColor: "#FF823F",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  acceptText: {
    fontFamily: "Sen_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});



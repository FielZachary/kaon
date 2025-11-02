import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SetNeedForm3Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Format date as "November 02, 2025"
  const formatDate = () => {
    const date = new Date(2025, 10, 2); // November 2, 2025
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleSet = () => {
    // TODO: Handle form submission
    console.log('Set button pressed - form submitted');
    // Navigate back to calendar or show success message
    router.back();
    router.back(); // Go back twice to return to calendar
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Date and Progress Bar */}
        <View style={styles.header}>
          <View style={styles.dateBar}>
            <Text style={styles.dateText}>{formatDate()}</Text>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              {/* Step 1 - Filled */}
              <View style={[styles.progressStep, styles.progressStepFilled]} />
              {/* Connecting Line */}
              <View style={styles.progressLine} />
              {/* Step 2 - Filled */}
              <View style={[styles.progressStep, styles.progressStepFilled]} />
              {/* Connecting Line */}
              <View style={styles.progressLine} />
              {/* Step 3 - Filled */}
              <View style={[styles.progressStep, styles.progressStepFilled]} />
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Additional Food Safety Requirements */}
          <View style={styles.inputGroup}>
            <View style={styles.labelWithIcon}>
              <Ionicons name="chatbubble-outline" size={14} color="#000000" />
              <Text style={styles.inputLabel}>Additional Food Safety Requirements</Text>
            </View>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={styles.textArea}
                value={additionalRequirements}
                onChangeText={setAdditionalRequirements}
                placeholder="Any additional food requirements..."
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.setButton}
            onPress={handleSet}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Set</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer for Tab Bar */}
        <View style={[styles.bottomSpacer, { height: Math.max(insets.bottom, 20) }]} />
      </ScrollView>
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
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  dateBar: {
    backgroundColor: '#FF823F',
    paddingVertical: 16,
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 20,
    lineHeight: 26,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  progressContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 8,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
    width: '100%',
    maxWidth: 352,
  },
  progressStep: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressStepFilled: {
    backgroundColor: '#FFFFFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  formContainer: {
    paddingHorizontal: 12,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 12,
  },
  inputLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 12,
    color: '#000000',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(66, 80, 102, 0.4)',
    borderRadius: 5,
    padding: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  textAreaContainer: {
    height: 144,
    padding: 12,
  },
  textArea: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    marginTop: 24,
    gap: 16,
  },
  backButton: {
    backgroundColor: '#FF823F',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setButton: {
    backgroundColor: '#FF823F',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Sen_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 20,
  },
});


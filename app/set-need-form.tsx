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

export default function SetNeedFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [requestTitle, setRequestTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('Quezon City');
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

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
              {/* Step 2 - Outlined */}
              <View style={[styles.progressStep, styles.progressStepOutlined]} />
              {/* Connecting Line */}
              <View style={styles.progressLine} />
              {/* Step 3 - Outlined */}
              <View style={[styles.progressStep, styles.progressStepOutlined]} />
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Request Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Request Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={requestTitle}
                onChangeText={setRequestTitle}
                placeholder=""
                placeholderTextColor="transparent"
              />
            </View>
          </View>

          {/* Purpose */}
          <View style={styles.inputGroup}>
            <View style={styles.labelWithIcon}>
              <Ionicons name="chatbubble-outline" size={14} color="#000000" />
              <Text style={styles.inputLabel}>Purpose</Text>
            </View>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={styles.textArea}
                value={purpose}
                onChangeText={setPurpose}
                placeholder="Tell us about your use need..."
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <View style={styles.inputContainer}>
              <View style={styles.locationInputInner}>
                <Ionicons name="location-outline" size={16} color="#000000" />
                <TextInput
                  style={styles.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder=""
                  placeholderTextColor="transparent"
                />
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
            </View>
          </View>

          {/* Contact Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contact Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={contactName}
                onChangeText={setContactName}
                placeholder="Contact Name"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>
          </View>

          {/* Contact Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Contact Number"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                keyboardType="phone-pad"
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
            <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/set-need-form-2')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
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
  progressStepOutlined: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  formContainer: {
    paddingHorizontal: 10,
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
    height: 104,
    padding: 12,
  },
  input: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  textArea: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  locationInputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  locationInput: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 102,
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#FF823F',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
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


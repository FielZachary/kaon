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

export default function SetNeedForm2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [pax, setPax] = useState('');
  const [mealTarget1, setMealTarget1] = useState('');
  const [mealTarget2, setMealTarget2] = useState('');
  const [vegetablesFruitsTarget, setVegetablesFruitsTarget] = useState('');
  const [riceTarget, setRiceTarget] = useState('');
  const [snacksTarget, setSnacksTarget] = useState('');

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
              {/* Step 2 - Filled */}
              <View style={[styles.progressStep, styles.progressStepFilled]} />
              {/* Connecting Line */}
              <View style={styles.progressLine} />
              {/* Step 3 - Outlined */}
              <View style={[styles.progressStep, styles.progressStepOutlined]} />
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Pax Input (Disabled/Greyed) */}
          <View style={styles.paxContainer}>
            <View style={styles.paxInputInner}>
              <TextInput
                style={styles.paxInput}
                value={pax}
                onChangeText={setPax}
                placeholder="Pax"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                editable={false}
              />
            </View>
          </View>

          {/* Section Label */}
          <View style={styles.sectionLabelContainer}>
            <Ionicons name="chatbubble-outline" size={14} color="#000000" />
            <Text style={styles.sectionLabel}>Food Target Estimate per Type</Text>
          </View>

          {/* Meal Target 1 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Meal Target</Text>
            <View style={styles.inputContainer}>
              <View style={styles.unitInputInner}>
                <TextInput
                  style={styles.unitInput}
                  value={mealTarget1}
                  onChangeText={setMealTarget1}
                  placeholder=""
                  placeholderTextColor="transparent"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>Kg</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
            </View>
          </View>

          {/* Meal Target 2 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Meal Target</Text>
            <View style={styles.inputContainer}>
              <View style={styles.unitInputInner}>
                <TextInput
                  style={styles.unitInput}
                  value={mealTarget2}
                  onChangeText={setMealTarget2}
                  placeholder=""
                  placeholderTextColor="transparent"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>Kg</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
            </View>
          </View>

          {/* Vegetables / Fruits Target */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vegetables / Fruits Target</Text>
            <View style={styles.inputContainer}>
              <View style={styles.unitInputInner}>
                <TextInput
                  style={styles.unitInput}
                  value={vegetablesFruitsTarget}
                  onChangeText={setVegetablesFruitsTarget}
                  placeholder=""
                  placeholderTextColor="transparent"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>Kg</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
            </View>
          </View>

          {/* Rice Target */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Rice Target</Text>
            <View style={styles.inputContainer}>
              <View style={styles.unitInputInner}>
                <TextInput
                  style={styles.unitInput}
                  value={riceTarget}
                  onChangeText={setRiceTarget}
                  placeholder=""
                  placeholderTextColor="transparent"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>Cups</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
            </View>
          </View>

          {/* Snacks Target */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Snacks Target</Text>
            <View style={styles.inputContainer}>
              <View style={styles.unitInputInner}>
                <TextInput
                  style={styles.unitInput}
                  value={snacksTarget}
                  onChangeText={setSnacksTarget}
                  placeholder=""
                  placeholderTextColor="transparent"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>Kg</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </View>
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
            style={styles.nextButton}
            onPress={() => router.push('/set-need-form-3')}
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
    paddingHorizontal: 13,
    gap: 16,
  },
  paxContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: 'rgba(66, 80, 102, 0.4)',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
  },
  paxInputInner: {
    opacity: 0.4,
  },
  paxInput: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
  },
  sectionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  sectionLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 12,
    color: '#000000',
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: 'Sen_400Regular',
    fontSize: 12,
    color: '#000000',
    paddingRight: 12,
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
  unitInputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  unitInput: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
    flex: 1,
    textAlign: 'right',
  },
  unitText: {
    fontFamily: 'Sen_400Regular',
    fontSize: 14,
    color: '#000000',
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


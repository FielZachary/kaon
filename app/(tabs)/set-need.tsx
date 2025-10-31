import { StyleSheet, Text, View } from 'react-native';

export default function SetNeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Need</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Sen_700Bold',
    fontSize: 26,
    color: '#474141',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Sen_400Regular',
    fontSize: 16,
    color: '#A0A5BA',
  },
});


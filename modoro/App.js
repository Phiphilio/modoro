import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Minute } from './frontend/minuteur.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Text> modoro</Text>
      <Minute/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 20,
  },
});

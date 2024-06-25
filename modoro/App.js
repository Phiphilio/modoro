import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Minute } from './frontend/minuteur.js';

export default function App() {
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(0);
  const [timerDuration, setTimerDuration] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pauseRunning, setPauseRunning] = useState(false);

  const handleStartTimer = () => {
    setTimerDuration(Number(duration)); // Convertir en nombre si nécessaire
    setPauseDuration(Number(pause)); // Assigner la durée de pause
    setIsRunning(true);
  };

  const handleBreakTimer = () => {
    setIsRunning(false);
    setPauseRunning(true);
  };

  const handleRestartTimer = () => {
    setIsRunning(true);
    setPauseRunning(false);
  };

  return (
    <View style={styles.container}>
      {!isRunning && !pauseRunning ? (
        <View>
          <Text>modoro</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setDuration(text)}
            value={String(duration)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setPause(text)}
            value={String(pause)}
          />
          <Button
            title="Start Timer"
            onPress={handleStartTimer}
          />
        </View>
      ) : (
        <Text style = {styles.text1}>Bon travail !!</Text>
      )}
      {isRunning ? (
        <Minute x={timerDuration} onStop={handleBreakTimer} />
      ) : (
        <Text>repose toi bien</Text>
      )}
      {pauseRunning ? (
        <Minute x={pauseDuration} onStop={handleRestartTimer} />
      ) : (
        <Text>courage !!</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  text1 : {
  display : 'none',
  },
});

import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Minute } from './frontend/minuteur.js';

//https://react.dev/learn/passing-props-to-a-component
export default function App() {
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(0);
  const [timerDuration, setTimerDuration] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(0);
  const [nbreModoro, setNbreModoro] = useState(0)

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
    setNbreModoro(x => x+1)
  };

const notif = () => {

 Alert.alert( //fonction qui a 3 arguments
      'Alerte', //1er argument, le nom de la boite
      'votre progression sera remise à 0 !',//2e argument message de la boite
      [
        { text: 'reset', onPress: () => stopEveryThing() }
      ], //3eme argument, un tableau qui contient des objets représentants les boutons
      { cancelable: true } // 4eme arguments facultatifs. le mettre à true permet que l'alerte disparaisse quand on touche une partie de l'écran
    );
}
  const stopEveryThing = ()=> {

  setIsRunning(false);
  setPauseRunning(false);
  setNbreModoro(0)
  }

  return (
    <View style={styles.container}>
      {!isRunning && !pauseRunning ? (
        <View>
          <Text style = {styles.titre}>modoro</Text>
          <Text> temps de travail</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setDuration(text)}
            value={String(duration)}
          />
          <Text> temps de repos </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setPause(text)}
            value={String(pause)}
          />
          <Button
            title="travailler"
            onPress={handleStartTimer}
          />
        </View>
      ) : (<>
        <Text style = {styles.text1}>Bon travail !!</Text>
        <Text>{nbreModoro}</Text></>
      )}
      {isRunning ? (
        <Minute x={timerDuration} onStop={handleBreakTimer} />
      ) : (
        !pauseRunning ? (
         <Text style = {styles.text1}>repose toi bien</Text>
        ) :(
        <TouchableOpacity
        onPress = {notif}
        >
        <Text style = {styles.text2}>repose toi bien</Text>
        </TouchableOpacity>
        )
      )}
     {pauseRunning ? (
       <Minute x={pauseDuration} onStop={handleRestartTimer} />
     ) : (
       !isRunning ? (
         <Text style={styles.text1}>courage !!</Text>
       ) : (
        <TouchableOpacity
        onPress = {notif}
        >
         <Text style={styles.text2}>courage !!</Text>
         </TouchableOpacity>
       )
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
  titre: {
    flex : 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    width: 100,
  },
  text1 : {
  display : 'none',
  },
  text2 : {
    fontSize : 40,
    },
});

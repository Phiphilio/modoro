import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import {useState, useEffect, useRef} from 'react';


export  function Minute ({x, onStop}) {
const [minute, setMinute] = useState(0)
const [second, setSecond] = useState(0)
const [isrunning, setIsrunning] = useState(true)
const intervalRef = useRef(null) // https://react.dev/learn/referencing-values-with-refs

useEffect( ()=>{
    if ( isrunning ) {
     if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
    intervalRef.current = setInterval(()=>{
        setSecond( preseconde => {
        if ( preseconde === 59 ){
        setMinute( preminute => {
            if(preminute === x-1) {
            /*vu que la vérification arrive à 59s, je dois mettre la valeur n-1*/
            setIsrunning(false)
            onStop()
            return  x
                } else{
                   return preminute+1
                }
            } );
        return 0
        }
        return preseconde +1
        })
         },1000)
    } else {
    clearInterval(intervalRef.current)
    }
   return () => {
    if (intervalRef.current !== null) {
           clearInterval(intervalRef.current);
         }
   }
}, [isrunning])


const demarrage = ()=> setIsrunning(true)
const arret = ()=> setIsrunning(false)


const reset = ()=> {
setMinute(0)
setSecond(0)
}

const notif = () => {

 Alert.alert( //fonction qui a 3 arguments
      'Alerte', //1er argument, le nom de la boite
      'votre progression sera remise à 0 !',//2e argument message de la boite
      [
        { text: 'reset', onPress: () => { reset(); arret()} }
      ], //3eme argument, un tableau qui contient des objets représentants les boutons
      { cancelable: true } // 4eme arguments facultatifs. le mettre à true permet que l'alerte disparaisse quand on touche une partie de l'écran
    );
}
return(
    <View style={styles.container}>
        <Text style = {styles.text}> {minute} : {second} </Text>

    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 40,
    borderRadius : 90,
  },
  text : {
  fontSize : 25,
   textAlign: 'center',
  },
});
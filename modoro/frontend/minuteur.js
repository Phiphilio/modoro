import { Text, View, Button, StyleSheet } from 'react-native';
import {useState, useEffect, useRef} from 'react';


export  function Minute () {
const [minute, setMinute] = useState(0)
const [second, setSecond] = useState(0)
const [isrunning, setIsrunning] = useState(false)
const intervalRef = useRef(null)

useEffect( ()=>{
    if ( isrunning ) {
     if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
    intervalRef.current = setInterval(()=>{
        setSecond( preseconde => {
        if ( preseconde === 59 ){
        setMinute( preminute => preminute+1 );
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


const demarrage = ()=>{ setIsrunning(true) }
const arret = ()=>{ setIsrunning(false) }

const reset = ()=> {
setMinute(0)
setSecond(0)
}
return(
    <View style={styles.container}>
        <Text>{minute} : {second} </Text>
        <Button
           title={isrunning ? "arrêt":"démarrage"}
           onPress={ isrunning ? arret : demarrage}
           />
           <Button
           title = {"reset"}
           onPress = { isrunning ? () => { reset(); arret()} : reset}
           />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 20,
  },
});
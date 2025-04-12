import { LinearGradient } from 'expo-linear-gradient';
import {useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Animated } from "react-native";


export default function HomeScreen() {
  return (
     <LinearGradient colors={["#4CAF50", "#2E7D52FF"]} style={styles.container}>
   <View >
    <Text style={{color:'#fff'}}>Home page</Text>
   </View>
   </LinearGradient>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
      // backgroundColor: '#4caf50'
    },

})

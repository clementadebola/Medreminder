import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

interface CircularProgressProps {
    progress: number;
    totalDoses: number;
    completedDoses: number;
}

function CircularProgress({
    progress,
    totalDoses,
    completedDoses,
  }: CircularProgressProps) {

    const animationValue = useRef(new Animated.Value(0)).current;
    const size = width * 0.55;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, [progress]);

    const strokeDashoffset = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    return(
        <View>
            <View>
                <Text style="">{Math.round(progress)}</Text>
                <Text>{completedDoses} of {totalDoses} doses</Text>
            </View>
            <Svg width={size} height={size} >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
        </View>
    )
  }

export default function HomeScreen() {

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <LinearGradient colors={["#1a8e2d", "#146922"]} style={styles.container}>
        <View>
          <View>
            <View>
                <Text> Daily Progress</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color="white"/>
            </TouchableOpacity>
          </View>



        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#4caf50",
  },
});

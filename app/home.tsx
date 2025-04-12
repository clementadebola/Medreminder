import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <LinearGradient colors={["#1a8e2d", "#146922"]} style={styles.container}>
        <View>
          <View>
            <Text>Hey how u dey na</Text>
            <Text>he don be like this</Text>
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

import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
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

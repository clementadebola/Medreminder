import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      {/* <Redirect href="/home" /> */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
          animation: "slide_from_right",
          header: () => null,
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="medications/add" options={{ headerShown: false,
          headerBackTitle: "",
          title: ""
         }} />

      </Stack>
    </>
  );
}

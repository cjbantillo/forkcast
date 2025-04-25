import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Hide the back button for the index screen */}
      <Stack.Screen name="(tabs)" options={{ headerBackVisible: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
      
    </Stack>
  );
}

// filepath: c:\Users\Christian James\Desktop\mobile-meal-planner\app\_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Hide the back button for the index screen --turn to true if you want to know the header*/}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
    </Stack>
  );
}
// filepath: c:\Users\Christian James\Desktop\mobile-meal-planner\app\_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define the tabs layout for routes with bottom navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Define other routes without bottom navigation */}
      <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
      <Stack.Screen name="backupindex" options={{ title: "Backup Index" }} />
    </Stack>
  );
}
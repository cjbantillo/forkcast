// filepath: c:\Users\Christian James\Desktop\mobile-meal-planner\app\_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
<<<<<<< HEAD
      {/* Hide the back button for the index screen */}
      <Stack.Screen name="(tabs)" options={{ headerBackVisible: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
      
=======
      {/* Define the tabs layout for routes with bottom navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Define other routes without bottom navigation */}
      <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
      <Stack.Screen name="backupindex" options={{ title: "Backup Index" }} />
      <Stack.Screen name="nickname" options={{ title: "nickname" }} />
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820
    </Stack>
  );
}
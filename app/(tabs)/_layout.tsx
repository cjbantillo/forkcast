// filepath: c:\Users\Christian James\Desktop\mobile-meal-planner\app\_layout.tsx
import React from "react";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Hide the back button for the index screen --turn to true if you want to know the header*/}
      
    </Tabs>
  );
}
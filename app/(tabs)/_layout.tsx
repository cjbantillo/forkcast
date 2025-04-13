import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E69145",
        headerStyle: { backgroundColor: "#17181D" },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderTopWidth: 0, // Remove the top border line
        },
      }}
    >
      {/* Define Planner first to make it appear on the left */}
      <Tabs.Screen name="planner" options={{ title: "Planner" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
    </Tabs>
  );
}

import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Swap the order of the screens */}
      <Tabs.Screen name="planner" options={{ title: "Planner" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
    </Tabs>
  );
}

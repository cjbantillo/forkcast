import React from "react";
import { Tabs } from "expo-router";

<<<<<<< HEAD
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#17181D" },
        tabBarActiveTintColor: "#E69145",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => null, // Add icons later if needed
        }}
      />
 
      <Tabs.Screen
        name="Recipe"
        options={{
          tabBarLabel: "Recipe",
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => null,
        }}
      />
=======
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
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820
    </Tabs>
  );
}

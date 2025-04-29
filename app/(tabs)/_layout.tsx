import React from "react";
import { Tabs } from "expo-router";

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
        name="Favorites"
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="Browse_recipe"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="Shopping_list"
        options={{
          tabBarLabel: "Shopping List",
          tabBarIcon: () => null,
        }} 
      />
      <Tabs.Screen
        name="Meal_planner"
        options={{
          tabBarLabel: "Meal Plan",
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
    </Tabs>
  );
}

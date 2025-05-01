import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6 } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 24,
          height: 50,
          borderRadius: 35,
          backgroundColor: "#17181D",
          backdropFilter: "blur",
          paddingTop: 8,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: "#E69145",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" color={color} size={size ?? 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Meal_planner"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="calendar" color={color} size={size ?? 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="heart" color={color} size={size ?? 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" color={color} size={size ?? 20} />
          ),
        }}
      />
    </Tabs>
  );
}

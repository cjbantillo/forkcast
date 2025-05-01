import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

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
        overflow: 'hidden', // important for BlurView to respect border radius
        elevation: 10,
        paddingBottom: 8,
        paddingTop: 8,
        justifyContent: 'center',
        
      },
      tabBarBackground: () => (
        <BlurView
          tint="dark" // can be "light", "dark", or "default"
          intensity={50}
          style={{ flex: 1 }}
        />
      ),
        tabBarActiveTintColor: "#E69145",
        tabBarInactiveTintColor: "#17181D",
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

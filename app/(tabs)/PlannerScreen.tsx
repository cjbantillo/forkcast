import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../../components/ModernButton";
import { useThemeColor } from "../../hooks/useThemeColor";

const PlannerScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const handleGenerate = () => {
    console.log("Generate meal plan using MealDB API");
    // Add API call logic here
  };

  const handleCopyPrevious = () => {
    console.log("Copy previous meal plan");
  };

  const handlePlanManually = () => {
    console.log("Plan meals manually");
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: accentColor }]}>
          <Text style={[styles.editButtonText, { color: "#FFFFFF" }]}>Edit Day</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.menuIcon, { color: textColor }]}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: textColor }]}>Today</Text>

      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/favicon1.png")} // Replace with your image later
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: textColor }]}>What are we eating today?</Text>

      {/* Buttons */}
      <ModernButton
        title="Generate"
        onPress={handleGenerate}
        style={StyleSheet.flatten([styles.button, { backgroundColor: accentColor }])}
      />
      <ModernButton
        title="Copy Previous"
        onPress={handleCopyPrevious}
        style={StyleSheet.flatten([styles.secondaryButton, { borderColor: textColor }])}
      />
      <ModernButton
        title="Plan Manually"
        onPress={handlePlanManually}
        style={StyleSheet.flatten([styles.secondaryButton, { borderColor: textColor }])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  menuIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292C35", // Placeholder background
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
  },
});

export default PlannerScreen;
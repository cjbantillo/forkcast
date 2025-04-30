import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../_layout";

/*
Need: Meal Planning
Add to Plan: schedule recipes for breakfast, lunch, or dinner in a weekly grid (Mon–Sun).
Local Storage: persist planned meals locally (using AsyncStorage, SQLite, or file‑based JSON).
*/

const MealPlanner = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const meals = ["Breakfast", "Lunch", "Dinner"];

  const [mealPlan, setMealPlan] = useState({});
  
  const user = useContext(AuthContext)?.user;
  
    useEffect(() => {
      if (!user) {
        router.replace('/');
        return;
      }
    });

  const handleAddMeal = (day, meal) => {
    Alert.prompt(
      `Add ${meal} for ${day}`,
      "Enter the recipe name:",
      (recipe) => {
        if (recipe) {
          const updatedPlan = {
            ...mealPlan,
            [day]: {
              ...mealPlan[day],
              [meal]: recipe,
            },
          };
          setMealPlan(updatedPlan);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plan</Text>
      <View style={styles.calendar}>
        {days.map((day) => (
          <View key={day} style={styles.dayCell}>
            <Text style={styles.dayText}>{day}</Text>
            {meals.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={styles.mealButton}
                onPress={() => handleAddMeal(day, meal)}
              >
                <Text style={styles.mealText}>
                  {mealPlan[day]?.[meal] || `Add ${meal}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181D",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayCell: {
    width: "30%", // Adjust width for 3 columns
    backgroundColor: "#2A2B2F",
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  mealButton: {
    backgroundColor: "#3A3B3F",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  mealText: {
    color: "#ffffff",
    fontSize: 14,
  },
});

export default MealPlanner;

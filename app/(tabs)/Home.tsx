import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// Need: quick overview of today’s meals and random recipe.

const Dashboard = () => {
  const todayMeals = "Breakfast: Pancakes, Lunch: Salad, Dinner: Pasta";
  const randomRecipe = "Spaghetti Carbonara";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What Are we Eating?</Text>

      {/* Quick Overview Section */}
      <View style={styles.overview}>
        <Text style={styles.overviewText}>Today's Meals: {todayMeals}</Text>
        <Text style={styles.overviewText}>Random Recipe: {randomRecipe}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Meals</Text>
        <Text style={styles.cardContent}>Plan your meals for the day!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Meals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shopping List</Text>
        <Text style={styles.cardContent}>Check your shopping list.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View List</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Summary</Text>
        <Text style={styles.cardContent}>Track your weekly progress.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Summary</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#17181D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  overview: {
    backgroundColor: "#292C35",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewText: {
    fontSize: 16,
    color: "#E69145",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#292C35",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 10,
    color: "#E69145",
  },
  button: {
    backgroundColor: "#E69145",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Dashboard;
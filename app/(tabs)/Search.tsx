import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
/*
Need: 
1. Recipe Browsing
Search meals by name or by ingredients on hand.
Browse by category (e.g., seafood, vegetarian) or area (e.g., Mexican, Italian).
Filter results by ingredient, category, or region.
Discover a random recipe.

2. Recipe Detail View
Display meal details:
High‑resolution image, list of ingredients with measurements, and step‑by‑step instructions.
Category, origin (area), and any tags.
Embedded YouTube video link if available.
*/
/*Search Recipes by Name:
https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}

Fetch Random Recipe:
https://www.themealdb.com/api/json/v1/1/random.php

Fetch Categories:
https://www.themealdb.com/api/json/v1/1/categories.php

Fetch Areas (Regions):
https://www.themealdb.com/api/json/v1/1/list.php?a=list */

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [recipes, setRecipes] = useState([]); // State for fetched recipes

  const handleSearch = () => {
    // Backend integration: Fetch recipes by name or ingredients
    // Use TheMealDB API: https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}
    console.log("Search query:", searchQuery);
  };

  const handleRandomRecipe = () => {
    // Backend integration: Fetch a random recipe
    // Use TheMealDB API: https://www.themealdb.com/api/json/v1/1/random.php
    console.log("Fetching random recipe...");
  };

  const handleFetchCategories = () => {
    // Backend integration: Fetch recipe categories
    // Use TheMealDB API: https://www.themealdb.com/api/json/v1/1/categories.php
    console.log("Fetching categories...");
  };

  const handleFetchAreas = () => {
    // Backend integration: Fetch recipe areas (regions)
    // Use TheMealDB API: https://www.themealdb.com/api/json/v1/1/list.php?a=list
    console.log("Fetching areas...");
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem}>
      <Text style={styles.recipeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Recipe Browsing</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name or ingredients"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonRow}>
        <Button title="Search" onPress={handleSearch} />
        <View style={styles.buttonSpacer} />
        <Button title="Discover Random Recipe" onPress={handleRandomRecipe} />
      </View>

      <Text style={styles.subheading}>Results:</Text>
      <FlatList
        data={recipes} // Replace with fetched recipes
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipe}
      />

      <Text style={styles.subheading}>Additional Features:</Text>
      <View style={styles.buttonRow}>
      <Button title="Browse Categories" onPress={handleFetchCategories} />
      <Button title="Browse Areas" onPress={handleFetchAreas} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#17181D",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#2C2C34",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
    lineHeight: 24,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E69145",
    marginTop: 10,
  },
  recipeItem: {
    backgroundColor: "#2C2C34",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
  recipeText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  buttonSpacer: {
    width: 10, // Adjust spacing between buttons
  },
});

export default Search;

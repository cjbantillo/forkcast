import { router } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../_layout";

/*
Need:
Meal Planning
Add to Plan: 
schedule recipes for breakfast, lunch, or dinner in a weekly grid (Mon–Sun).
Local Storage: 
persist planned meals locally (using AsyncStorage, SQLite, or file‑based JSON). */

// Mock data from Favorites (replace this with Firebase integration later)
const favoriteRecipes = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    ingredients: ["Tomatoes", "Ground Beef", "Onions", "Garlic", "Pasta"],
  },
  {
    id: "2",
    name: "Chicken Curry",
    ingredients: [
      "Chicken Breast",
      "Curry Powder",
      "Coconut Milk",
      "Onions",
      "Garlic",
    ],
  },
];

const ShoppingList = () => {
  const [groupedShoppingList, setGroupedShoppingList] = useState([]);

  const user = useContext(AuthContext)?.user;

  // Group ingredients by recipe
  useEffect(() => {
    if (!user) {
      router.replace('/');
      return;
    }

    const groupedList = favoriteRecipes.map((recipe) => ({
      recipeName: recipe.name,
      ingredients: recipe.ingredients.map((ingredient, index) => ({
        id: `${recipe.id}-${index}`,
        name: ingredient,
        purchased: false,
      })),
    }));
    setGroupedShoppingList(groupedList);
  }, []);

  // Toggle the purchased state of an item
  const togglePurchased = (recipeName, id) => {
    setGroupedShoppingList((prevList) =>
      prevList.map((group) =>
        group.recipeName === recipeName
          ? {
              ...group,
              ingredients: group.ingredients.map((item) =>
                item.id === id ? { ...item, purchased: !item.purchased } : item
              ),
            }
          : group
      )
    );
  };

  const renderRecipeGroup = ({ item: group }) => (
    <View style={styles.recipeGroup}>
      <Text style={styles.recipeName}>{group.recipeName}</Text>
      {group.ingredients.map((ingredient) => (
        <TouchableOpacity
          key={ingredient.id}
          style={[
            styles.item,
            ingredient.purchased && styles.purchasedItem, // Apply different style if purchased
          ]}
          onPress={() => togglePurchased(group.recipeName, ingredient.id)}
        >
          <Text
            style={[
              styles.itemText,
              ingredient.purchased && styles.purchasedText, // Strike-through text if purchased
            ]}
          >
            {ingredient.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <FlatList
        data={groupedShoppingList}
        keyExtractor={(item) => item.recipeName}
        renderItem={renderRecipeGroup}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181D",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  recipeGroup: {
    marginBottom: 24,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  item: {
    backgroundColor: "#1E1F26",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  purchasedItem: {
    backgroundColor: "#2E2F36",
  },
  itemText: {
    fontSize: 18,
    color: "#ffffff",
  },
  purchasedText: {
    textDecorationLine: "line-through",
    color: "#A9A9A9",
  },
});

export default ShoppingList;

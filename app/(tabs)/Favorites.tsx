import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../_layout";

/*
Need: Bookmark favorite recipes for quick access.
Organize with optional tags or categories.
Notes & Ratings: add personal comments or star ratings per meal.
*/
const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Spaghetti Bolognese",
      tags: ["Italian", "Pasta"],
      notes: "Family favorite!",
      rating: 5,
    },
    {
      id: "2",
      name: "Chicken Curry",
      tags: ["Indian", "Spicy"],
      notes: "Great with naan bread.",
      rating: 4,
    },
  ]);

  const user = useContext(AuthContext)?.user;
  
    useEffect(() => {
      if (!user) {
        router.replace('/');
        return;
      }
    });

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
      <Text style={styles.notes}>Notes: {item.notes}</Text>
      <Text style={styles.rating}>Rating: {"⭐".repeat(item.rating)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
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
  favoriteItem: {
    backgroundColor: "#1E1F26",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tags: {
    fontSize: 14,
    color: "#A9A9A9",
    marginTop: 4,
  },
  notes: {
    fontSize: 14,
    color: "#A9A9A9",
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginTop: 4,
  },
});

export default Favorites;

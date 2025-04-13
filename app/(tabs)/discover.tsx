import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, TextInput } from "react-native";
import { Text } from "react-native-paper";
import { useThemeColor } from "../../hooks/useThemeColor";

const DiscoverScreen = () => {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState<{ strMeal: string; strMealThumb: string; idMeal: string }[]>([]);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  // Fetch data from MealDB API
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian")
      .then((response) => response.json())
      .then((data) => setFoods(data.meals || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const renderFoodItem = ({ item }: { item: any }) => (
    <View style={styles.foodItem}>
      <Image source={{ uri: item.strMealThumb }} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={[styles.foodName, { color: textColor }]}>
          {item.strMeal}
        </Text>
        <Text style={[styles.foodCalories, { color: "#72D4FC" }]}>
          {Math.floor(Math.random() * 500) + 50} Calories
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search Foods..."
        placeholderTextColor="#aaa"
        style={styles.searchInput}
      />
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodCalories: {
    fontSize: 14,
  },
});

export default DiscoverScreen;
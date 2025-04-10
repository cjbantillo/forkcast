import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function GreetScreen() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userName = "John Doe"; // Replace with dynamic user name if available

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await response.json();
        setMeals(data.meals || []);
        setFilteredMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMeals();
    fetchCategories();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text === "") {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  };

  const handleMealSelect = (meal) => {
    alert(`You selected: ${meal.strMeal}`);
    // You can navigate to another screen or perform additional actions here
  };

  const handleRandomMeal = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setFilteredMeals([data.meals[0]]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setFilteredMeals(data.meals || []);
    } catch (error) {
      console.error("Error filtering by category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{userName} - Meal Planner</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a meal..."
        value={search}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.randomButton} onPress={handleRandomMeal}>
        <Text style={styles.randomButtonText}>Get Random Meal</Text>
      </TouchableOpacity>
      <ScrollView horizontal style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.idCategory}
            style={styles.categoryItem}
            onPress={() => handleFilterByCategory(category.strCategory)}
          >
            <Text style={styles.categoryText}>{category.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="#17181D" />
      ) : (
        <FlatList
          data={filteredMeals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mealItem}
              onPress={() => handleMealSelect(item)}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.mealImage}
              />
              <Text style={styles.mealName}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e09145",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  randomButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  randomButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#17181D",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#17181D",
  },
  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#17181D",
  },
});

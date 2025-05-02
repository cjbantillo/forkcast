import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../_layout";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const API_KEY = "1cae230634f645e694f74c6da042ef80"; 

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [trivia, setTrivia] = useState<string>("");
  const user = useContext(AuthContext)?.user;

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    const fetchFavorites = async () => {
      const favRef = doc(db, "favorites", user.uid);
      const favSnap = await getDoc(favRef);

      if (favSnap.exists()) {
        const mealIds = favSnap.data().mealIds || [];

        const planRef = doc(db, "weekly_plan", user.uid);
        const planSnap = await getDoc(planRef);

        if (planSnap.exists()) {
          const mealPlan = planSnap.data().mealPlan;
          const meals: any[] = [];

          for (let day in mealPlan) {
            const dailyMeals = mealPlan[day]?.meals || [];
            dailyMeals.forEach((meal: any) => {
              if (mealIds.includes(meal.id)) {
                meals.push(meal);
              }
            });
          }

          setFavorites(meals);
        }
      }
    };

    const fetchTrivia = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/food/trivia/random?apiKey=${API_KEY}`
        );
        const data = await res.json();
        setTrivia(data.text);
      } catch (err) {
        console.error("Failed to fetch trivia:", err);
      }
    };

    fetchFavorites();
    fetchTrivia();
  }, [user]);

  const renderFavorite = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(modals)/${item.id}`)}
    >
      <Image
        source={{ uri: `https://spoonacular.com/recipeImages/${item.image}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorite Meals</Text>
      <Text style={styles.trivia}>{trivia}</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavorite}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites found.</Text>
      )}
    </View>
  );
};

export default Favorites;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  trivia: {
    fontSize: 14,
    color: "#E69145",
    fontStyle: "italic",
    marginVertical: 40,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },
});

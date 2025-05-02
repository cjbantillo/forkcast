import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../_layout";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "@/firebaseConfig";

const Dashboard = () => {
  const [selectedMeal, setSelectedMeal] = useState<
    "breakfast" | "lunch" | "dinner" | null
  >(null);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const user = useContext(AuthContext)?.user;
  const [currentDay, setCurrentDay] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setSelectedMeal("breakfast");
    } else if (hour >= 11 && hour < 17) {
      setSelectedMeal("lunch");
    } else {
      setSelectedMeal("dinner");
    }

    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date().getDay();
    setCurrentDay(daysOfWeek[today]);

    const fetchMealPlan = async () => {
      try {
        if (user?.uid) {
          const docRef = doc(db, "weekly_plan", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setMealPlan(data.mealPlan);
          }
        }
      } catch (error) {
        console.error("Failed to fetch meal plan:", error);
      }
    };

    const fetchFavorites = async () => {
      if (user?.uid) {
        const favRef = doc(db, "favorites", user.uid);
        const favSnap = await getDoc(favRef);
        if (favSnap.exists()) {
          setFavorites(favSnap.data().mealIds || []);
        }
      }
    };

    fetchMealPlan();
    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (mealId: string) => {
    if (!user?.uid) return;

    const favRef = doc(db, "favorites", user.uid);
    let updatedFavorites: string[] = [];

    try {
      const favSnap = await getDoc(favRef);
      if (favSnap.exists()) {
        const currentFavs = favSnap.data().mealIds || [];
        if (currentFavs.includes(mealId)) {
          updatedFavorites = currentFavs.filter((id) => id !== mealId);
        } else {
          updatedFavorites = [...currentFavs, mealId];
        }
      } else {
        updatedFavorites = [mealId];
      }

      await setDoc(favRef, { mealIds: updatedFavorites });
      setFavorites(updatedFavorites);
    } catch (err) {
      console.error("Failed to update favorites:", err);
    }
  };

  const renderNutrients = () => {
    if (mealPlan?.[currentDay]?.nutrients) {
      const nutrients = mealPlan[currentDay].nutrients;
      return (
        <View style={styles.overview}>
          <View style={styles.nutrientRow}>
            <View style={styles.nutrientCard}>
              <FontAwesome6 name="fire" size={24} color="#E69145" />
              <Text style={styles.nutrientLabel}>Calories</Text>
              <Text style={styles.nutrientValue}>
                {nutrients.calories.toFixed(0)}
              </Text>
            </View>
            <View style={styles.nutrientCard}>
              <FontAwesome6 name="bread-slice" size={24} color="#E69145" />
              <Text style={styles.nutrientLabel}>Carbs</Text>
              <Text style={styles.nutrientValue}>
                {nutrients.carbohydrates.toFixed(2)}g
              </Text>
            </View>
            <View style={styles.nutrientCard}>
              <FontAwesome6 name="drumstick-bite" size={24} color="#E69145" />
              <Text style={styles.nutrientLabel}>Protein</Text>
              <Text style={styles.nutrientValue}>
                {nutrients.protein.toFixed(2)}g
              </Text>
            </View>
            <View style={styles.nutrientCard}>
              <FontAwesome6 name="cheese" size={24} color="#E69145" />
              <Text style={styles.nutrientLabel}>Fat</Text>
              <Text style={styles.nutrientValue}>
                {nutrients.fat.toFixed(2)}g
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderMeal = () => {
    if (selectedMeal && mealPlan?.[currentDay]?.meals) {
      const mealIndex =
        selectedMeal === "breakfast"
          ? 0
          : selectedMeal === "lunch"
          ? 1
          : 2;
      const meal = mealPlan[currentDay].meals[mealIndex];

      return (
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <View style={styles.mealCard}>
            <Image
              source={{
                uri: `https://spoonacular.com/recipeImages/${meal.image}`,
              }}
              style={styles.mealImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                "rgba(0,0,0,0.4)",
                "transparent",
                "transparent",
                "rgba(0,0,0,0.6)",
              ]}
              style={StyleSheet.absoluteFill}
            />

            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleFavorite(meal.id)}
            >
              <FontAwesome6
                name="heart"
                solid={favorites.includes(meal.id)}
                size={22}
                color={favorites.includes(meal.id) ? "#E69145" : "#FFF"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push(`/(modals)/${meal.id}`)}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} key={user?.uid}>
        <Text style={styles.subtitle}>Hello</Text>
        <Text style={styles.dot}>•</Text> {user?.displayName}
      </Text>

      <Text style={styles.topText}>Complete your daily nutrition</Text>

      {!mealPlan?.[currentDay]?.meals && (
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={styles.noData}>
            Generate your weekly plan by clicking{" "}
            <FontAwesome6 name="calendar-days" size={16} color="#E69145" /> icon
          </Text>
        </View>
      )}

      {renderNutrients()}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => setSelectedMeal("breakfast")}>
          <Text
            style={{
              color: selectedMeal === "breakfast" ? "#E69145" : "#333333",
            }}
          >
            Breakfast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMeal("lunch")}>
          <Text
            style={{
              color: selectedMeal === "lunch" ? "#E69145" : "#333333",
            }}
          >
            Lunch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMeal("dinner")}>
          <Text
            style={{
              color: selectedMeal === "dinner" ? "#E69145" : "#333333",
            }}
          >
            Dinner
          </Text>
        </TouchableOpacity>
      </View>

      {renderMeal()}
    </ScrollView>
  );
};

export default Dashboard;

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
    paddingBottom: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    color: "#333333",
  },
  subtitle: {
    fontWeight: "300",
  },
  dot: {
    color: "#E69145",
  },
  topText: {
    color: "#333333",
    fontSize: 28,
    marginBottom: 12,
  },
  overview: {
    backgroundColor: "#FEFEFE",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  nutrientCard: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  nutrientLabel: {
    color: "#333333",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  nutrientValue: {
    color: "#E69145",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  mealCard: {
    width: 320,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#DDD",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  mealImage: {
    width: 320,
    height: 220,
    borderRadius: 20,
  },
  mealTitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heartIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  noData: { 
    fontSize: 16, 
    color: "#999", 
    textAlign: "center",
    marginVertical: 200,
  },
});

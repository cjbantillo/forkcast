import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { AuthContext } from "../_layout";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const MealPlanner = () => {
  const originalDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const reorderDaysFromToday = (days) => {
    const todayIndex = new Date().getDay(); // Sunday = 0
    const correctedIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Make Monday = 0
    return [...days.slice(correctedIndex), ...days.slice(0, correctedIndex)];
  };

  const days = reorderDaysFromToday(originalDays);

  const [mealPlan, setMealPlan] = useState(null);
  const [calories, setCalories] = useState(null);
  const [exclude, setExclude] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const user = useContext(AuthContext)?.user;

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      fetchMealPlanFromFirestore();
    }
  }, [user]);

  const fetchMealPlanFromFirestore = async () => {
    try {
      if (user?.uid) {
        const docRef = doc(db, "weekly_plan", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMealPlan(data.mealPlan);
          setCalories(data.calories || "2000");
          setExclude(data.exclude || "");
        }
      }
    } catch (error) {
      console.error("Failed to fetch meal plan from Firestore:", error);
    }
  };

  const generateMealPlan = async () => {
    try {
      const apiKey = "1cae230634f645e694f74c6da042ef80";
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&exclude=${exclude}&apiKey=${apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.week) {
        setMealPlan(data.week);

        // Save to Firebase
        if (user?.uid) {
          await setDoc(doc(db, "weekly_plan", user.uid), {
            mealPlan: data.week,
            createdAt: new Date().toISOString(),
            calories,
            exclude,
          });
        }
      } else {
        Alert.alert("Error", "Could not fetch meal plan.");
      }

      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Meal Plan</Text>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Customize Meal Plan</Text>

            <TextInput
              style={styles.input}
              placeholder="Calories per day"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />
            <TextInput
              style={styles.input}
              placeholder="Exclude ingredients (comma-separated)"
              placeholderTextColor="#aaa"
              value={exclude}
              onChangeText={setExclude}
            />
            <TouchableOpacity style={styles.generateButton} onPress={generateMealPlan}>
              <Text style={styles.generateButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView>
      {mealPlan &&
        days
          .filter((day) => mealPlan[day.toLowerCase()])
          .map((day, index) => {
            const lowerDay = day.toLowerCase();
            const meals = mealPlan[lowerDay]?.meals || [];

            return (
              <View
                key={day}
                style={[
                  styles.dayContainer,
                  index === 0 && { backgroundColor: "#E69145" },
                ]}
              >
                <Text style={styles.dayText}>
                  {day} {index === 0 ? "(Today)" : ""}
                </Text>

                <View style={styles.mealsContainer}>
                  {meals.length > 0 ? (
                    meals.map((meal) => (
                      <View key={meal.id} style={styles.mealCard}>
                        <Image
                          source={{
                            uri: `https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`,
                          }}
                          style={styles.mealImage}
                        />
                        <Text style={styles.mealTitle}>{meal.title}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={{ color: "#ccc" }}>No meals planned.</Text>
                  )}
                </View>
              </View>
            );
          })}

      </ScrollView>

      <TouchableOpacity style={styles.generateButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.generateButtonText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#17181D",
    textAlign: "center",
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: "#E69145",
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 90,
    marginVertical: 20,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#2A2B2F",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#3A3B3F",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  dayContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#DDD",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  mealsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  mealCard: {
    backgroundColor: "#3A3B3F",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  mealImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  mealTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },  
});

export default MealPlanner;

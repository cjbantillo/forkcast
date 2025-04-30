import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { AuthContext } from "../_layout";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const Dashboard = () => {
  const [mealPlanEmpty, setMealPlanEmpty] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [targetCalories, setTargetCalories] = useState("");
  const [diet, setDiet] = useState("");
  const [exclude, setExclude] = useState("");

  const user = useContext(AuthContext)?.user;

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    const fetchMealPlan = async () => {
      try {
        const db = getFirestore();
        const mealDoc = await getDoc(doc(db, "users", user.uid, ));

        if (mealDoc.exists()) {
          const data = mealDoc.data();
          const plan = data.meal_plan;

          if (!plan || Object.keys(plan).length === 0) {
            setMealPlanEmpty(true);
            setMealPlan(null);
          } else {
            setMealPlanEmpty(false);
            setMealPlan(plan);
          }
        } else {
          setMealPlanEmpty(true);
          setMealPlan(null);
        }
      } catch (error) {
        console.error("Failed to fetch meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [user]);

  const generateMealPlan = async () => {
    if (!targetCalories) {
      Alert.alert("Validation", "Please enter a target calorie amount.");
      return;
    }

    try {
      const apiKey = "1cae230634f645e694f74c6da042ef80"; // Replace with your key
      const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data || !data.meals) {
        Alert.alert("Error", "Failed to generate meal plan.");
        return;
      }

      const db = getFirestore();
      await setDoc(
        doc(db, "users", user.uid),
        { meal_plan: data },
        { merge: true }
      );

      setMealPlanEmpty(false);
      setMealPlan(data);
      setShowModal(false);
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("API Error", "Unable to generate meal plan.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What Are We Eating?</Text>

      <View style={styles.overview}>
        {mealPlan ? (
          <>
            <Text style={styles.overviewTitle}>Today's Meals</Text>
            <Text style={styles.overviewText}>Plan your meals for the day!</Text>
            {mealPlan.meals.map((meal: any) => (
              <Text key={meal.id} style={styles.overviewText}>• {meal.title}</Text>
            ))}
          </>
        ) : (
          <Text style={styles.overviewText}>No meals available today.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.cardTitle}>Generate Meal Plan</Text>

            <TextInput
              placeholder="Target Calories"
              value={targetCalories}
              onChangeText={setTargetCalories}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Diet (e.g., vegetarian)"
              value={diet}
              onChangeText={setDiet}
              style={styles.input}
            />
            <TextInput
              placeholder="Exclude (e.g., nuts, dairy)"
              value={exclude}
              onChangeText={setExclude}
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={generateMealPlan}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ color: "#ccc", marginTop: 10, textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  overviewTitle: {
    fontSize: 32,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: "#292C35",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Dashboard;

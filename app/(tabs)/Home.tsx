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
  Image,
  Pressable,
} from "react-native";
import { AuthContext } from "../_layout";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const Dashboard = () => {
  const [mealPlanEmpty, setMealPlanEmpty] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
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
  
    // Set default meal based on time
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setSelectedMeal("breakfast");
    } else if (hour >= 11 && hour < 17) {
      setSelectedMeal("lunch");
    } else {
      setSelectedMeal("dinner");
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
      const apiKey = "1cae230634f645e694f74c6da042ef80"; 
      const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&exclude=${exclude}&apiKey=${apiKey}`;

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
      <Text style={styles.title} key={user.uid}>
        <Text style={styles.subtitle}>Hello</Text> 
        <Text style={styles.dot}>•</Text> {user?.displayName}
      </Text>

      <Text style={styles.topText}>
        Complete your daily nutrition
      </Text>

      <View style={styles.overview}>
      {mealPlan?.nutrients && (
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientCard}>
            <FontAwesome6 name="fire" size={24} color="#E69145" />
            <Text style={styles.nutrientLabel}>Calories</Text>
            <Text style={styles.nutrientValue}>{mealPlan.nutrients.calories.toFixed(0)}</Text>
          </View>

          <View style={styles.nutrientCard}>
            <FontAwesome6 name="bread-slice" size={24} color="#E69145" />
            <Text style={styles.nutrientLabel}>Carbs</Text>
            <Text style={styles.nutrientValue}>{mealPlan.nutrients.carbohydrates.toFixed(2)}g</Text>
          </View>

          <View style={styles.nutrientCard}>
            <FontAwesome6 name="drumstick-bite" size={24} color="#E69145" />
            <Text style={styles.nutrientLabel}>Protein</Text>
            <Text style={styles.nutrientValue}>{mealPlan.nutrients.protein.toFixed(2)}g</Text>
          </View>

          <View style={styles.nutrientCard}>
            <FontAwesome6 name="cheese" size={24} color="#E69145" />
            <Text style={styles.nutrientLabel}>Fat</Text>
            <Text style={styles.nutrientValue}>{mealPlan.nutrients.fat.toFixed(2)}g</Text>
          </View>
        </View>
      )}
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 }}>
      <TouchableOpacity onPress={() => setSelectedMeal("breakfast")}>
        <Text style={{ color: selectedMeal === "breakfast" ? "#E69145" : "#333333" }}>Breakfast</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedMeal("lunch")}>
        <Text style={{ color: selectedMeal === "lunch" ? "#E69145" : "#333333" }}>Lunch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedMeal("dinner")}>
        <Text style={{ color: selectedMeal === "dinner" ? "#E69145" : "#333333" }}>Dinner</Text>
      </TouchableOpacity>
    </View>

    {selectedMeal && mealPlan?.meals && (() => {
      const mealIndex =
        selectedMeal === "breakfast" ? 0 : selectedMeal === "lunch" ? 1 : 2;
      const meal = mealPlan.meals[mealIndex];

      return (
        <TouchableOpacity onPress={() => router.push(`/(modals)/${meal.id}`)}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <View style={styles.mealCard}>
            <Image
              source={{ uri: `https://spoonacular.com/recipeImages/${meal.image}` }}
              style={styles.mealImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.6)']}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.mealTitle}>{meal.title}</Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    })()}


      <TouchableOpacity style={styles.generateButton} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.cardTitle}>What do we eat today?</Text>

            <TextInput
              placeholder="Target Calories"
              value={targetCalories}
              onChangeText={setTargetCalories}
              style={styles.input}
              keyboardType="numeric"
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
              <Text style={styles.cancelButton}>
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
    backgroundColor: "#F9F9F9",
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 10,
    color: "#E69145",
  },
  button: {
    backgroundColor: "#E69145",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  cancelButton: { 
    color: "#E69145", 
    marginTop: 10, 
    textAlign: "center",
  },
  generateButton: {
    backgroundColor: "#E69145",
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 90,

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
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 20,
    width: "85%",
  },
  input: {
    backgroundColor: "#F0F0F0",
    color: "#333333",
    padding: 10,
    borderRadius: 100,
    marginBottom: 10,
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
    shadowColor: '#000',
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
  mealImage: {
    width: 320,
    height: 220,
    borderRadius: 20,
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
});


export default Dashboard;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Text } from "react-native-paper";
import { useThemeColor } from "../hooks/useThemeColor";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ModernButton from "@/components/ModernButton";

const mockData = [
    {
      id: "1",
      date: "April 23, 2025",
      calories: 2100,
      meals: {
        breakfast: { name: "Oatmeal with banana", calories: 350 },
        snack1: { name: "Greek yogurt", calories: 150 },
        lunch: { name: "Grilled chicken salad", calories: 600 },
        snack2: { name: "Mixed nuts", calories: 250 },
        dinner: { name: "Salmon and brown rice", calories: 750 },
      },
    },
    {
      id: "2",
      date: "April 22, 2025",
      calories: 1850,
      meals: {
        breakfast: { name: "Smoothie bowl", calories: 300 },
        snack1: { name: "Boiled egg", calories: 80 },
        lunch: { name: "Turkey sandwich", calories: 500 },
        snack2: { name: "Fruit cup", calories: 120 },
        dinner: { name: "Vegetable stir fry", calories: 850 },
      },
    },
  ];
  

const CopyPreviousScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const handleViewDetails = (item: any) => {
    setSelectedPlan(item);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { color: textColor }]}>{item.date}</Text>
      <Text style={[styles.cell, { color: textColor }]}>{item.calories} kcal</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: accentColor }]}
        onPress={() => handleViewDetails(item)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Back Button with Icon */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={accentColor} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={[styles.header, { color: "#E69145" }]}>Meal Plan History</Text>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { color: textColor }]}>Date</Text>
        <Text style={[styles.tableHeaderText, { color: textColor }]}>Calories</Text>
        <Text style={[styles.tableHeaderText, { color: textColor }]}>Action</Text>
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Details Modal */}
      <Modal visible={!!selectedPlan} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color={textColor} />
            </TouchableOpacity>
            {selectedPlan && (
  <>
    <Text style={[styles.modalHeader, { color: accentColor }]}>
      {selectedPlan.date}
    </Text>
    <Text style={[styles.mealText, { color: textColor }]}>
      🍳 Breakfast: {selectedPlan.meals.breakfast.name} 
    </Text>
    <Text style={[styles.calories]}>
        ({selectedPlan.meals.breakfast.calories} kcal)
    </Text>
    <Text style={[styles.mealText, { color: textColor }]}>
      🍎 Snack: {selectedPlan.meals.snack1.name} 
    </Text>
    <Text style={[styles.calories]}>
        ({selectedPlan.meals.snack1.calories} kcal)
    </Text>
    <Text style={[styles.mealText, { color: textColor }]}>
      🥗 Lunch: {selectedPlan.meals.lunch.name} 
    </Text>
    <Text style={[styles.calories]}>
        ({selectedPlan.meals.lunch.calories} kcal)
    </Text>
    <Text style={[styles.mealText, { color: textColor }]}>
      🍪 Snack: {selectedPlan.meals.snack2.name} 
    </Text>
    <Text style={[styles.calories]}>
        ({selectedPlan.meals.snack2.calories} kcal)
    </Text>
    <Text style={[styles.mealText, { color: textColor }]}>
      🍽️ Dinner: {selectedPlan.meals.dinner.name} 
    </Text>
    <Text style={[styles.calories]}>
        ({selectedPlan.meals.dinner.calories} kcal)
    </Text>

    {/* Total Calories */}
    <Text style={[styles.totalCalories, { color: accentColor }]}>
      🔥 Total: {selectedPlan.calories} kcal
    </Text>
    <View style={styles.divider} />
    <ModernButton
        onPress={() => closeModal()}
        title="Select"
      >
      </ModernButton>
  </>
)}

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  mealText: {
    fontSize: 16,
    marginVertical: 5,
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  calories: {
    fontSize: 10,
    color: "#eeeeee",
    marginStart: 30,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc", // or use useThemeColor({}, "border") if you have a themed color
    width: "100%",
    marginVertical: 10,
  },
  
});

export default CopyPreviousScreen;

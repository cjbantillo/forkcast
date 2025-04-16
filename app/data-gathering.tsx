import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../components/ModernButton";
import ModernTextInput from "../components/ModernTextInput";
import { useThemeColor } from "../hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { auth, logout } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const DataGathering = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [user, setUser] = useState(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  // Track user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/"); // Redirect to login if not authenticated
      }
    });
    return unsubscribe;
  }, []);

  const handleContinue = () => {
    if (age && gender && height && weight) {
      console.log({ age, gender, height, weight }); // Replace with navigation or API call
      router.push("/(tabs)/Planner"); // Navigate to the planner screen
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/"); // Redirect to login screen
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: textColor }]}>
        Tell us about yourself
      </Text>
      {/* age  */}
      <ModernTextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        style={styles.input}
      />
      {/* gender */}
      <View style={[styles.dropdownContainer, { backgroundColor: "#292C35" }]}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={[styles.dropdown, { color: "#292C35" }]} // Text color for dropdown items
          dropdownIconColor="#292C35" // Dropdown arrow color
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      {/* height */}
      <ModernTextInput
        value={height}
        onChangeText={setHeight}
        placeholder="Enter your height (cm)"
        style={styles.input}
      />
      {/* weight */}
      <ModernTextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter your weight (kg)"
        style={styles.input}
      />
      <ModernButton
        title="Continue"
        onPress={handleContinue}
        disabled={!age || !gender || !height || !weight}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: accentColor },
        ])}
      />
      {/* Logout Button */}
      <ModernButton
        title="Logout"
        onPress={handleLogout}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: "#FF3B30", marginTop: 20 },
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
  },
  dropdownContainer: {
    width: "80%",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#292C35",
    overflow: "hidden",
  },
  dropdown: {
    width: "100%",
    height: 50,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});

export default DataGathering;

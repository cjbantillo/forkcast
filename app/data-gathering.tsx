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
import { TextInput } from 'react-native';

const DataGathering = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [user, setUser] = useState(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [ageError, setAgeError] = useState('');

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
    <View style={[styles.screen, { backgroundColor }]}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: textColor }]}>
          Tell us about yourself
        </Text>

        {/* Age */}
      <View style={{ flexDirection: 'column', alignItems: 'stretch', width: "100%" }}>
        <TextInput
          value={age}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setAge(text);
              setAgeError(''); // Clear error message if valid
            } else {
              setAgeError('Please enter a valid age'); // Set error message if invalid
            }
          }}
          placeholder="Enter your age"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric" // Set keyboard type to numeric
          style={styles.input}
        />
        {ageError ? (
          <Text style={styles.errorText}>{ageError}</Text>
        ) : null}
      </View>

        {/* Gender */}
        <View style={[styles.dropdownContainer]}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[styles.dropdown]}
            dropdownIconColor="#FFFFFF"
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

       {/* Height */}
      <View style={{ flexDirection: 'column', alignItems: 'stretch', width: "100%" }}>
        <TextInput
          value={height}
          onChangeText={(text) => {
            if (/^\d*\.?\d*$/.test(text)) {
              setHeight(text);
              setHeightError('');
            } else {
              setHeightError('Please enter a valid height in centimeters.');
            }
          }}
          placeholder="Enter your height (cm)"
          placeholderTextColor="#A9A9A9"
          keyboardType="decimal-pad"
          style={styles.input}
        />
        {heightError ? (
          <Text style={styles.errorText}>{heightError}</Text>
        ) : null}
      </View>

        {/* Weight */}
      <View style={{ flexDirection: 'column', alignItems: 'stretch', width: "100%" }}>
        <TextInput
          value={weight}
          onChangeText={(text) => {
            if (/^\d*\.?\d*$/.test(text)) {
              setWeight(text);
              setWeightError('');
            } else {
              setWeightError('Please enter a valid weight in kilograms.');
            }
          }}
          placeholder="Enter your weight (kg)"
          placeholderTextColor="#A9A9A9"
          keyboardType="decimal-pad"
          style={styles.input}
        />
        {weightError ? (
          <Text style={styles.errorText}>{weightError}</Text>
        ) : null}
      </View>

        {/* Continue Button */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  // screen wrapper to center everything globally.
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginLeft: 5,
    paddingBottom: 5,
  },
  container: {
    width: "90%",   // full on mobile 
    maxWidth: 400,    // limit on web
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#292C35",
    overflow: "hidden",
  },
  dropdown: {
    width: "100%",
    height: 50,
    color: "#000000",
  },
  button: {
    width: "100%",
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

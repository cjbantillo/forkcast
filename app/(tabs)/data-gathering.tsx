import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../../components/ModernButton";
import ModernTextInput from "../../components/ModernTextInput";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";

const DataGathering = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const handleContinue = () => {
    if (age && gender && height && weight) {
      console.log({ age, gender, height, weight }); // Replace with navigation or API call
    }
  };

  return (
    <View style={[styles.container]}>
        <Image
              source={require("../../assets/images/favicon.png")}
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
        style={StyleSheet.flatten([styles.button, { backgroundColor: accentColor }])}
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
    backgroundColor: "#17181D", // Changed to match the dark mode background
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
  },logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  }
});

export default DataGathering;

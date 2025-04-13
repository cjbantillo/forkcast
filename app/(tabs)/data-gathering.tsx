import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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
      <Text style={[styles.title, { color: textColor }]}>
        Tell us about yourself
      </Text>
      <ModernTextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        style={styles.input}
      />
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={[styles.dropdown, { color: textColor }]}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <ModernTextInput
        value={height}
        onChangeText={setHeight}
        placeholder="Enter your height (cm)"
        style={styles.input}
      />
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
        style={[styles.button, { backgroundColor: accentColor }]}
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
  },
});

export default DataGathering;

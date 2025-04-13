import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import ModernButton from "../../components/ModernButton";
import ModernTextInput from "../../components/ModernTextInput";
import { useThemeColor } from "../../hooks/useThemeColor";

export default function Index() {
  const [name, setName] = useState("");

  // Dynamically retrieve theme-based colors
  const backgroundColor = useThemeColor({}, "background"); // #17181D in dark mode
  const textColor = useThemeColor({}, "text"); // #FFFFFF in dark mode
  const accentColor = useThemeColor({}, "accent"); // #FCD988 in both modes

  const handleContinue = () => {
    if (name) {
      router.push("/(tabs)/data-gathering"); // Navigate to the next screen
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require("../../assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: textColor }]}>
        Welcome to ForkCast*
      </Text>
      <Text style={[styles.subtext, { color: accentColor }]}>
        Let's personalize your meal plan!
      </Text>
      <ModernTextInput
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: "#292C35", color: textColor }]} // Dark input background
      />
      <ModernButton
        title="Continue"
        onPress={handleContinue}
        disabled={!name}
        style={[styles.button, { backgroundColor: accentColor }]} // Accent color for button
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    marginBottom: 40,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});

import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import ModernButton from "../components/ModernButton";
import ModernTextInput from "../components/ModernTextInput";
import { useThemeColor } from "../hooks/useThemeColor";

export default function Index() {
  const [name, setName] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const handleContinue = () => {
    if (name) {
      router.push("/data-gathering");
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
        Welcome to ForkCast
      </Text>
      <Text style={[styles.subtext, { color: accentColor }]}>
        Let's personalize your meal plan!
      </Text>
      <ModernTextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <ModernButton
        title="Continue"
        onPress={handleContinue}
        disabled={!name}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: accentColor },
        ])}
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
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});

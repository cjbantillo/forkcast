import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import ModernButton from "@/components/ModernButton";
import ModernTextInput from "@/components/ModernTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
  const [name, setName] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const handleContinue = () => {
    if (name) {
      router.push("/(tabs)/data-gathering");
    }
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: textColor }]}>
        Welcome to ForkCast
      </Text>
      <ModernButton
        title="Sign in with Google"
        onPress={() => router.push("/data-gathering")}
        style={StyleSheet.flatten([styles.button, styles.accentButton])}
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
    backgroundColor: "#17181D", // Changed to match the dark mode background
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
    backgroundColor: "#292C35", // Moved from inline style
    color: "#FFFFFF", // Moved from inline style
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  accentButton: {
    backgroundColor: "#E69145", // Moved from inline style
  },
});

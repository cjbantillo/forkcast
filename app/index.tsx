import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function AuthPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      router.push("/data-gathering");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820
    }
  };

  return (
<<<<<<< HEAD
    <View style={[styles.container]}>
=======
    <View style={styles.container}>
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
<<<<<<< HEAD
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
=======
      <Text style={styles.title}>Welcome to ForkCast</Text>
      <Text style={styles.subtext}>Let's personalize your meal plan!</Text>

      {/* Sign in with Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
<<<<<<< HEAD
    padding: 20,
    backgroundColor: "#17181D", // Changed to match the dark mode background
=======
    backgroundColor: "#17181D",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#E69145",
  },
  googleButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  googleButtonText: {
    color: "#17181D",
    fontSize: 16,
    fontWeight: "bold",
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
<<<<<<< HEAD
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
=======
});
>>>>>>> bc6f397ed7111e95732b6923c83c1fd16a873820

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";

const textColor = useThemeColor({}, "text");
const accentColor = useThemeColor({}, "accent");

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Import the router hook

  const handleSignIn = () => {
    // Handle email/password sign-in logic
    console.log("Email:", email, "Password:", password);

    // Navigate to nickname.tsx
    router.push("/nickname");
  };
  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic
    console.log("Sign in with Google");
  };

  return (
    <View style={styles.container}>
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

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17181D",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#ffffff",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#E69145",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
});

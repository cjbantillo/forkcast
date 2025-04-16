import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { AuthContext } from "./_layout";

export default function AuthPage() {
  const { user, setUser } = useContext(AuthContext)!;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const navigationState = useRootNavigationState();

  // ✅ Wait until router is ready
  useEffect(() => {
    if (!navigationState?.key) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.replace("/data-gathering");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigationState?.key]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      setUser(result.user);
      router.replace("/data-gathering");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E69145" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to ForkCast</Text>
      <Text style={styles.subtext}>Let's personalize your meal plan!</Text>

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17181D",
  },
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});

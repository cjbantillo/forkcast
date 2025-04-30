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
import { auth, db } from "../firebaseConfig"; 
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { AuthContext } from "./_layout";

export default function AuthPage() {
  const { user, setUser } = useContext(AuthContext)!;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const checkProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.hasCompletedProfile) {
            router.replace("/(tabs)/Home");
          } else {
            router.replace("/data-gathering");
          }
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // ✅ Optional: ensure user doc exists
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            user_id: currentUser.uid,
            created_at: new Date(),
          });
        }

        router.push("/data-gathering");
      } else {
        setLoading(false);
      }
    });

    checkProfile();

    return () => unsubscribe();
  }, [navigationState?.key, user]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;

      console.log("User signed in:", signedInUser.uid);

      // ✅ Create user document in Firestore
      const userRef = doc(db, "users", signedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: signedInUser.displayName,
          user_id: signedInUser.uid,
          created_at: new Date(),
        });
      }

      setUser(signedInUser);
      router.push("/data-gathering");
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
    <View style={[styles.container]}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to ForkCast</Text>
      <Text style={styles.subtext}>Let's personalize your meal plan!</Text>

      <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text>Sign in with Google</Text>
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


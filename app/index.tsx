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
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { AuthContext } from "./_layout";
import { FontAwesome6 } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

// Keep the auth session alive
WebBrowser.maybeCompleteAuthSession();

export default function AuthPage() {
  const { user, setUser } = useContext(AuthContext)!;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const navigationState = useRootNavigationState();

  // Google Auth Request setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    //expoClientId: "<YOUR_EXPO_CLIENT_ID>",
    //: "<YOUR_IOS_CLIENT_ID>",       // Optional, for real devices
    androidClientId:
      "583906509994-3m6uk01jrtc6gnukq4gb5eakurd6lkcd.apps.googleusercontent.com", // Optional, for real devices
    webClientId:
      "583906509994-n3hl8bilg3sj1hcu48a2vjjdu30cv82m.apps.googleusercontent.com", // Optional, if using Firebase web fallback
  });

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
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            user_id: currentUser.uid,
            created_at: new Date(),
          });
        }

        setUser(currentUser);
        router.push("/data-gathering");
      } else {
        setLoading(false);
      }
    });

    checkProfile();
    return () => unsubscribe();
  }, [navigationState?.key, user]);

  // ✅ Handle successful Google response
  useEffect(() => {
    const handleSignIn = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const result = await signInWithCredential(auth, credential);
        const signedInUser = result.user;

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
      }
    };

    handleSignIn();
  }, [response]);

  const handleGoogleSignIn = async () => {
    await promptAsync();
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
        onPress={handleGoogleSignIn}
        style={[styles.googleSign, styles.button]}
      >
        <FontAwesome6
          name="google"
          size={20}
          color="#DB4437"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    backgroundColor: "#17181D",
    borderRadius: 50,
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
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  googleSign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E69145",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E69145",
  },
});

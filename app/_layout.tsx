// filepath: c:\Users\Christian James\Desktop\mobile-meal-planner\app\_layout.tsx

import React, { useEffect, useState, createContext } from "react";
import { Stack, useRouter } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Export context so it can be used in any screen
export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let didMount = false;

    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setIsLoading(false);

          // Only navigate after the layout has mounted
          if (didMount) {
            if (currentUser) {
              router.push("/data-gathering");
            } else {
              router.push("/");
            }
          }
        },
        (error) => {
          console.error("Error in onAuthStateChanged:", error);
          setIsLoading(false);
        }
      );

      return unsubscribe;
    };

    const unsubscribePromise = prepare();

    didMount = true;

    // Optional: Clean up the listener on unmount
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Define the tabs layout for routes with bottom navigation */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Define other routes without bottom navigation */}
          <Stack.Screen
            name="data-gathering"
            options={{ title: "Data Gathering" }}
          />
          <Stack.Screen
            name="backupindex"
            options={{ title: "Backup Index" }}
          />
          <Stack.Screen name="nickname" options={{ title: "Nickname" }} />
        </Stack>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

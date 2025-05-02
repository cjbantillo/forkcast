// filepath: app/_layout.tsx

import React, { useEffect, useState, createContext } from "react";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

// AuthContext to be used throughout the app
export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error in onAuthStateChanged:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // or a splash/loading screen
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Bottom tab navigation */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ headerShown: false }} />

          {/* Additional screens */}
          <Stack.Screen name="data-gathering" options={{ title: "Data Gathering" }} />
        </Stack>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

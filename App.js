import React, { useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useRouter } from "expo-router";

export const AuthContext = createContext(null);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();

      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setIsLoading(false);

          if (currentUser) {
            router.push("/data-gathering"); // Redirect authenticated users
          } else {
            router.push("/"); // Redirect unauthenticated users
          }
        },
        (error) => {
          console.error("Error in onAuthStateChanged:", error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }

    prepare();
  }, []);

  if (isLoading) {
    return null; // Optionally, show a loading screen
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>{/* Your app's navigation and screens */}</PaperProvider>
    </AuthContext.Provider>
  );
}
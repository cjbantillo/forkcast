import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import Preloader from "@/components/Preloader";
import HomeScreen from "@/screens/HomeScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); 
      setTimeout(async () => {
        await SplashScreen.hideAsync(); 
        setIsLoading(false);
      }, 2000);
    }
    prepare();
  }, []);

  return (
    <PaperProvider>
      {isLoading ? <Preloader /> : <HomeScreen />}
    </PaperProvider>
  );
}

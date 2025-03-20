import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { View, Text } from "react-native";

export default function App() {
  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome to Mobile Meal Planner!</Text>
      </View>
    </PaperProvider>
  );
}

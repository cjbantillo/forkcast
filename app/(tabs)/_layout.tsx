import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Hide the back button for the index screen -- once finish testing turn it to false */}
      <Stack.Screen name="index" options={{ headerBackVisible: false }} />
      <Stack.Screen
      name="(tabs)/data-gathering"
      options={{ title: "Data Gathering" }}
      />
    </Stack>
  );
}

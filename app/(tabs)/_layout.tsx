import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* Hide the back button for the index screen -- once finish testing turn it to false */}
      <Stack.Screen name="index" options={{ headerBackVisible: false }} />
    </Stack>
  );
}

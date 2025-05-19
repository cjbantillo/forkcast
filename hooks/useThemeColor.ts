//import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

type Theme = "dark" | "light";

/**
 * A custom hook to retrieve theme-specific colors.
 * @param props - Optional overrides for light and dark themes.
 * @param colorName - The name of the color to retrieve.
 * @returns The color value based on the current theme.
 */
export function useThemeColor(
  props: { dark?: string; light?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme: Theme = "dark"; // Force dark theme

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}

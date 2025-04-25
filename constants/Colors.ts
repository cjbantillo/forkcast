const Colors = {
  dark: {
    background: "#17181D",
    text: "#ffffff",
    accent: "#E69145",
    primary: "#E69145", // Changed from "button"
    buttonText: "#ffffff",
    surface: "#292C35", // Corrected from "#292929" to match original spec
    inputText: "#ffffff",
    placeholder: "#FFFFFF80", // Added for input placeholders
  },

  light: {
    background: "#ffffff", // Opposite of dark background
    text: "#17181D", // Opposite of dark text
    accent: "#E69145", // Keep accent consistent
    primary: "#E69145", // Keep primary consistent
    buttonText: "#17181D", // Opposite of dark buttonText
    surface: "#f0f0f0", // Light surface for contrast
    inputText: "#000000", // Black for input text
    placeholder: "#00000080", // Semi-transparent black for placeholders
  },
};

export default Colors;

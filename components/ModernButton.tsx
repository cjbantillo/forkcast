import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ModernButtonProps {
  title: string;
  onPress: () => void;
}

const ModernButton: React.FC<ModernButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E69A45", // Gold color from palette
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30, // Fully rounded button
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#17181D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#17181D", // Dark text
    fontWeight: "bold",
  },
});

export default ModernButton;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
} from "react-native";
import ModernButton from "../../components/ModernButton";
import { useThemeColor } from "../../hooks/useThemeColor";
import { auth, logout } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

const PlannerScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");
  const router = useRouter();

  // Track the authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User"); // Use displayName or fallback to "User"
      } else {
        router.push("/"); // Redirect to login if not authenticated
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/"); // Redirect to login screen
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: accentColor }]}
        >
          <Text style={[styles.editButtonText, { color: "#FFFFFF" }]}>
            Edit Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={[styles.menuIcon, { color: textColor }]}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.menuContainer, { backgroundColor }]}>
            <Text style={[styles.menuItem, { color: textColor }]}>
              Hello, {userName}
            </Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.menuItem, { color: "#FF3B30" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Title */}
      <Text style={[styles.title, { color: textColor }]}>Today</Text>

      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/favicon1.png")} // Replace with your image later
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: textColor }]}>
        What are we eating today?
      </Text>

      {/* Buttons */}
      <ModernButton
        title="Generate"
        onPress={() => console.log("Generate meal plan")}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: accentColor, borderColor: accentColor },
        ])}
      />
      <ModernButton
        title="Copy Previous"
        onPress={() => console.log("Copy previous meal plan")}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: accentColor, borderColor: accentColor },
        ])}
      />
      <ModernButton
        title="Plan Manually"
        onPress={() => console.log("Plan meals manually")}
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: accentColor, borderColor: accentColor },
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  menuIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292C35", // Placeholder background
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1, // Add border for uniformity
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
});

export default PlannerScreen;

import React, { useState } from "react";
import { View, Image, Text, Modal, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { db } from "@/app/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import ModernButton from "@/components/ModernButton";
import ModernTextInput from "@/components/ModernTextInput";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!nickname.trim()) return; // Prevent empty names

    const userId = uuidv4(); // Generate unique user ID
    try {
      await setDoc(doc(db, "users", userId), {
        nickname: nickname,
        userId: userId,
      });

      setModalVisible(false);
      router.push(`/data-gathering?userId=${userId}`); // Pass userId to GreetScreen
    } catch (error) {
      console.error("Error storing name:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/ForkCast.png")} style={styles.logo} />

      <ModernButton title="Itadakimasu" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nickname</Text>

            <ModernTextInput
              label="How do we call you?"
              value={nickname}
              onChangeText={setName}
            />

            <ModernButton title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBF5DF",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#17181D",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
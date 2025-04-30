import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../components/ModernButton";
import ModernTextInput from "../components/ModernTextInput";
import { useThemeColor } from "../hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { AuthContext } from "./_layout";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const DataGathering = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyfat, setBodyfat] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useContext(AuthContext)?.user;

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.replace("/");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.hasCompletedProfile) {
            router.replace("/(tabs)/Home");
          } else {
            if (data.age) setAge(data.age);
            if (data.gender) setGender(data.gender);
            if (data.heightFeet) setHeightFeet(data.heightFeet);
            if (data.heightInches) setHeightInches(data.heightInches);
            if (data.weight) setWeight(data.weight);
            if (data.bodyfat) setBodyfat(data.bodyfat);
            if (data.activityLevel) setActivityLevel(data.activityLevel);
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleContinue = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          age,
          gender,
          heightFeet,
          heightInches,
          weight,
          bodyfat,
          activityLevel,
          hasCompletedProfile: true,
        },
        { merge: true }
      );

      console.log("User profile saved");
      router.replace("/(tabs)/Home");
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E69145" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: textColor }]}>
        Tell us about yourself
      </Text>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={styles.dropdown}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Select Sex" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <View style={styles.rowContainer}>
        <ModernTextInput
          value={heightFeet}
          onChangeText={setHeightFeet}
          placeholder="ft"
          style={styles.halfInput}
        />
        <ModernTextInput
          value={heightInches}
          onChangeText={setHeightInches}
          placeholder="in"
          style={styles.halfInput}
        />
      </View>

      <ModernTextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter your weight (kg)"
        style={styles.input}
      />

      <ModernTextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        style={styles.input}
      />

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={bodyfat}
          onValueChange={(value) => setBodyfat(value)}
          style={styles.dropdown}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Select Bodyfat" value="" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Moderate" value="moderate" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={activityLevel}
          onValueChange={(value) => setActivityLevel(value)}
          style={styles.dropdown}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Select Activity Level" value="" />
          <Picker.Item label="Lightly active, workout 3-4 times/week" value="light" />
          <Picker.Item label="Moderately active, workout 5-6 times/week" value="moderate" />
          <Picker.Item label="Very active, daily training" value="high" />
        </Picker>
      </View>

      {/* Continue Button */}
      <ModernButton
        title="Continue"
        onPress={handleContinue}
        disabled={
          !age ||
          !gender ||
          !heightFeet ||
          !heightInches ||
          !weight ||
          !bodyfat ||
          !activityLevel
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17181D",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#17181D",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  halfInput: {
    width: "48%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
  },
  dropdownContainer: {
    width: "80%",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#292C35",
    overflow: "hidden",
  },
  dropdown: {
    width: "100%",
    height: 50,
    color: "#FFFFFF",
    backgroundColor: "#292C35",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});

export default DataGathering;

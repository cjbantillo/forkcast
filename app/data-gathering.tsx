import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../components/ModernButton";
import ModernTextInput from "../components/ModernTextInput";
import { useThemeColor } from "../hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { auth, logout } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { TextInput } from 'react-native';

// List of allergies for selection
const ALLERGIES = [
   'Milk', 'Egg', 'Fish', 'Shellfish', 
   'Nuts', 'Peanuts', 'Wheat', 'Sesame', 'Soybeans'
 ];

const DataGathering = () => {
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [user, setUser] = useState(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [ageError, setAgeError] = useState('');

  /* Uncomment to enable Auth*/
  //  Track user session
  //  useEffect(() => {
  //    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //      if (currentUser) {
  //        setUser(currentUser);
  //      } else {
  //        router.push("/"); // Redirect to login if not authenticated
  //      }
  //    });
  //    return unsubscribe;
  //  }, []);

  const handleContinue = () => {
    if (birthday && gender && height && weight) {
      console.log({ birthday, gender, height, weight }); // Replace with navigation or API call
      router.push("/(tabs)/Home"); // Navigate to the planner screen /roberto - edited the push to the correct screen (tabs)/Home
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/"); // Redirect to login screen
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const toggleAllergy = (item: string): void => {
    if (allergies.includes(item)) {
      setAllergies(allergies.filter((a) => a !== item));
    } else {
      setAllergies([...allergies, item]);
    }
  };

  // function toggleAllergy(item: string): void {
  //   throw new Error("Function not implemented.");
  // }

  // Removed redundant toggleAllergy function definition

  return (
    <View style={[styles.screen, { backgroundColor }]}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: '#E2C275' }]}>
          Tell us about yourself
        </Text>

        <View style={styles.row}>
  {/* Birthday Input */}
  <TextInput
    value={birthday}
    onChangeText={(text) => setBirthday(text)}
    placeholder="Birthday (YYYY-MM-DD)"
    placeholderTextColor="#A9A9A9"
    style={styles.inputHalf}
  />

  {/* Gender Dropdown */}
  <View style={[styles.dropdownContainer, { width: '48%' }]}>
    <Picker
      selectedValue={gender}
      onValueChange={(itemValue) => setGender(itemValue)}
      style={styles.dropdown}
      dropdownIconColor="#292C35"
      mode="dropdown"
    >
      <Picker.Item label="Gender" value="" />
      <Picker.Item label="Male" value="male" />
      <Picker.Item label="Female" value="female" />
      <Picker.Item label="Other" value="other" />
    </Picker>
  </View>
</View>

<View style={styles.row}>
  {/* Height Input */}
  <TextInput
    value={height}
    onChangeText={(text) => setHeight(text)}
    placeholder="Height (cm)"
    placeholderTextColor="#A9A9A9"
    keyboardType="numeric"
    style={styles.inputHalf}
  />

  {/* Weight Input */}
  <TextInput
    value={weight}
    onChangeText={(text) => setWeight(text)}
    placeholder="Weight (kg)"
    placeholderTextColor="#A9A9A9"
    keyboardType="numeric"
    style={styles.inputHalf}
  />
</View>

<Text style={{ color: '#E2C275', marginVertical: 10 }}>
  Any allergies to this food? Choose any that apply:
</Text>

<View style={styles.allergyContainer}>
  {ALLERGIES.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.allergyButton,
        allergies.includes(item) && styles.allergyButtonSelected
      ]}
      onPress={() => toggleAllergy(item)}
    >
      <Text style={styles.allergyButtonText}>{item}</Text>
    </TouchableOpacity>
  ))}
</View>

        {/* Continue Button */}
        <ModernButton
          title="Continue"
          onPress={handleContinue}
          disabled={!birthday || !gender || !height || !weight}
          style={StyleSheet.flatten([
            styles.button,
            { backgroundColor: accentColor },
          ])}
          disabledTextColor="gray" // This makes the text gray when disabled
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  // screen wrapper to center everything globally.
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginLeft: 5,
    paddingBottom: 5,
  },
  container: {
    width: "90%",   // full on mobile 
    maxWidth: 400,    // limit on web
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#292C35",
    color: "#FFFFFF",
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#292C35", 
    overflow: "hidden",
    borderWidth: 0, // to remove dropdown border
    paddingHorizontal: 5,
  },
  dropdown: {
    width: "100%",
    height: 50,
    color: "#A9A9A9",
    backgroundColor:'#292C35',
    borderWidth: 0, // to remove dropdown border
    paddingVertical: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  inputHalf: {
    height: 50,
    width: '48%',
    backgroundColor: '#292C35',
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  allergyButton: {
    backgroundColor: '#292C35',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  allergyButtonSelected: {
    backgroundColor: '#E2C275',
  },
  allergyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  
});

export default DataGathering;

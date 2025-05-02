import React, { useContext, useState, useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Text } from "react-native-paper";
import ModernButton from "../components/ModernButton";
import ModernTextInput from "../components/ModernTextInput";
import { useThemeColor } from "../hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { AuthContext } from "./_layout";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const DataGathering = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyfat, setBodyfat] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showBodyfatPicker, setShowBodyfatPicker] = useState(false);
  const [showActivityPicker, setShowActivityPicker] = useState(false);

  const user = useContext(AuthContext)?.user;
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const totalSteps = 3;

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
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDisplayValue = (type, value) => {
    if (!value) return "";

    switch (type) {
      case "gender":
        return value.charAt(0).toUpperCase() + value.slice(1);
      case "bodyfat":
        const bodyfatMap = {
          low: "Low (10-15%)",
          moderate: "Moderate (16-24%)",
          high: "High (25%+)",
        };
        return bodyfatMap[value] || value;
      case "activity":
        const activityMap = {
          light: "Lightly active (3-4×/week)",
          moderate: "Moderately active (5-6×/week)",
          high: "Very active (daily)",
        };
        return activityMap[value] || value;
      default:
        return value;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E69145" />
      </View>
    );
  }

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !gender || !age;
    } else if (currentStep === 2) {
      return !heightFeet || !heightInches || !weight;
    } else if (currentStep === 3) {
      return !bodyfat || !activityLevel;
    }
    return false;
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <View
            key={i}
            style={[
              styles.stepDot,
              i + 1 === currentStep ? styles.activeStepDot : null,
              i + 1 < currentStep ? styles.completedStepDot : null,
            ]}
          >
            {i + 1 < currentStep && (
              <Ionicons name="checkmark" size={14} color="#FEFEFE" />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Basic Information</Text>
            <Text style={styles.stepDescription}>Let's start with the basics</Text>
            
            <TouchableOpacity
              style={styles.selectField}
              onPress={() => setShowGenderPicker(!showGenderPicker)}
            >
              <Text style={styles.selectLabel}>Sex</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, !gender && styles.placeholderText]}>
                  {getDisplayValue("gender", gender) || "Select your sex"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#AAA" />
              </View>
            </TouchableOpacity>

            {showGenderPicker && (
              <View style={styles.pickerContainer}>
                <TouchableOpacity 
                  style={[styles.pickerItem, gender === "male" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setGender("male");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, gender === "male" && styles.pickerItemTextSelected]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, gender === "female" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setGender("female");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, gender === "female" && styles.pickerItemTextSelected]}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, gender === "other" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setGender("other");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, gender === "other" && styles.pickerItemTextSelected]}>Other</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <ModernTextInput
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                style={styles.input}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Body Measurements</Text>
            <Text style={styles.stepDescription}>Help us calculate your fitness profile</Text>
            
            <Text style={styles.sectionLabel}>Height</Text>
            <View style={styles.heightContainer}>
              <View style={styles.heightInput}>
                <Text style={styles.inputLabel}>Feet</Text>
                <ModernTextInput
                  value={heightFeet}
                  onChangeText={setHeightFeet}
                  placeholder="ft"
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                />
              </View>
              <View style={styles.heightInput}>
                <Text style={styles.inputLabel}>Inches</Text>
                <ModernTextInput
                  value={heightInches}
                  onChangeText={setHeightInches}
                  placeholder="in"
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Weight (lbs)</Text>
              <ModernTextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter your weight"
                style={styles.input}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Fitness Profile</Text>
            <Text style={styles.stepDescription}>Tell us about your fitness level</Text>
            
            <TouchableOpacity
              style={styles.selectField}
              onPress={() => setShowBodyfatPicker(!showBodyfatPicker)}
            >
              <Text style={styles.selectLabel}>Body Fat</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, !bodyfat && styles.placeholderText]}>
                  {getDisplayValue("bodyfat", bodyfat) || "Select your body fat level"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#AAA" />
              </View>
            </TouchableOpacity>

            {showBodyfatPicker && (
              <View style={styles.pickerContainer}>
                <TouchableOpacity 
                  style={[styles.pickerItem, bodyfat === "low" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setBodyfat("low");
                    setShowBodyfatPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, bodyfat === "low" && styles.pickerItemTextSelected]}>
                    Low (10-15%)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, bodyfat === "moderate" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setBodyfat("moderate");
                    setShowBodyfatPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, bodyfat === "moderate" && styles.pickerItemTextSelected]}>
                    Moderate (16-24%)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, bodyfat === "high" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setBodyfat("high");
                    setShowBodyfatPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, bodyfat === "high" && styles.pickerItemTextSelected]}>
                    High (25%+)
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.selectField}
              onPress={() => setShowActivityPicker(!showActivityPicker)}
            >
              <Text style={styles.selectLabel}>Activity Level</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, !activityLevel && styles.placeholderText]}>
                  {getDisplayValue("activity", activityLevel) || "Select your activity level"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#AAA" />
              </View>
            </TouchableOpacity>

            {showActivityPicker && (
              <View style={styles.pickerContainer}>
                <TouchableOpacity 
                  style={[styles.pickerItem, activityLevel === "light" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setActivityLevel("light");
                    setShowActivityPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, activityLevel === "light" && styles.pickerItemTextSelected]}>
                    Lightly active (3-4×/week)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, activityLevel === "moderate" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setActivityLevel("moderate");
                    setShowActivityPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, activityLevel === "moderate" && styles.pickerItemTextSelected]}>
                    Moderately active (5-6×/week)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerItem, activityLevel === "high" && styles.pickerItemSelected]} 
                  onPress={() => {
                    setActivityLevel("high");
                    setShowActivityPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, activityLevel === "high" && styles.pickerItemTextSelected]}>
                    Very active (daily)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/favicon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleText}>Complete Your Profile</Text>
        </View>

        {renderStepIndicator()}
        
        <View style={styles.formContainer}>
          {renderFormStep()}
        </View>
        
        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={20} color="#555" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.continueButton,
              isNextDisabled() && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={isNextDisabled()}
          >
            <Text style={styles.continueButtonText}>
              {currentStep === totalSteps ? "Finish" : "Continue"}
            </Text>
            {currentStep < totalSteps ? (
              <Ionicons name="arrow-forward" size={20} color="#FEFEFE" />
            ) : (
              <Ionicons name="checkmark" size={20} color="#FEFEFE" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
  },
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DDDDDD",
  },
  activeStepDot: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E69145",
  },
  completedStepDot: {
    backgroundColor: "#E69145",
    borderColor: "#E69145",
  },
  formContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
    paddingLeft: 2,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    color: "#333",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heightInput: {
    width: "48%",
  },
  selectField: {
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
    paddingLeft: 2,
  },
  selectValue: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectValueText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#AAA",
  },
  pickerContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginTop: -15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
  },
  pickerItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  pickerItemSelected: {
    backgroundColor: "#FEF4EA",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#555",
  },
  pickerItemTextSelected: {
    color: "#E69145",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginLeft: 6,
  },
  continueButton: {
    backgroundColor: "#E69145",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FEFEFE",
    marginRight: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
});

export default DataGathering;
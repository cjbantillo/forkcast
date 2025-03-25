import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

interface ModernTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
}

const ModernTextInput: React.FC<ModernTextInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full my-2">
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        mode="outlined"
        outlineColor={isFocused ? "#E69A45" : "#292C35"} // Gold focus, dark outline
        activeOutlineColor="#E69A45"
        textColor={value ? "#17181D" : "#999"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          backgroundColor: "#FCD9B8", // Light beige background
          borderRadius: 30, // Fully rounded input
          paddingHorizontal: 10,
        }}
        theme={{
          roundness: 30,
          colors: {
            primary: "#E69A45",
          },
        }}
      />
    </View>
  );
};

export default ModernTextInput;

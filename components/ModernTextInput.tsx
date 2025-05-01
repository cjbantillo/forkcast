// import React from "react";
// import { TextInput, StyleSheet, TextStyle } from "react-native";
// import { useThemeColor } from "../hooks/useThemeColor";

// interface ModernTextInputProps {
//   label?: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   placeholder?: string;
//   style?: TextStyle;
// }

// export default function ModernTextInput({
//   value,
//   onChangeText,
//   placeholder = "Enter text",
//   style,
// }: ModernTextInputProps) {
//   const backgroundColor = useThemeColor({}, "surface");
//   const textColor = useThemeColor({}, "inputText");
//   const placeholderColor = useThemeColor({}, "placeholder");

//   return (
//     <TextInput
//       value={value}
//       onChangeText={onChangeText}
//       placeholder={placeholder}
//       placeholderTextColor={placeholderColor}
//       style={[styles.input, { backgroundColor, color: textColor }, style]}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 8,
//     fontSize: 16,
//   },
// });

import React from "react";
import { TextInput, StyleSheet, TextStyle } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface ModernTextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle;
  onFocus?: () => void;
  editable?: boolean;
}

export default function ModernTextInput({
  value,
  onChangeText,
  placeholder = "Enter text",
  style,
  onFocus,
  editable = true,
}: ModernTextInputProps) {
  const backgroundColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "inputText");
  const placeholderColor = useThemeColor({}, "placeholder");

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      style={[styles.input, { backgroundColor, color: textColor }, style]}
      onFocus={onFocus}
      editable={editable}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});


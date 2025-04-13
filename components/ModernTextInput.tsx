import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';

interface ModernTextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: TextStyle;
}

export default function ModernTextInput({ value, onChangeText, style }: ModernTextInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Enter text"
      placeholderTextColor="#aaa"
      style={[styles.input, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#292C35',
    color: '#fff',
    fontSize: 16,
  },
});
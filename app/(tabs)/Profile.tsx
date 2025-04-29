import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';

/*
Need: 
Profile Management
View and update user details (BMI, personal info).
Edit username: default to the prefix of the user’s email (before "@"), but allow manual edits in settings.
Dark mode toggle for UI theme.
Calorie tracking: manually input calories per meal.
Export & Share: save or share the weekly plan as a PDF or image.
*/
const Profile = () => {
    const [username, setUsername] = useState('user123'); // Default username
    const [email, setEmail] = useState('user123@example.com'); // Mock email
    const [bmi, setBmi] = useState(''); // BMI input
    const [calories, setCalories] = useState(''); // Calorie tracking input
    const [darkMode, setDarkMode] = useState(false); // Dark mode toggle

    // Handle dark mode toggle
    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    // Handle export and share (mock functionality)
    const handleExport = () => {
        Alert.alert('Export', 'Weekly plan exported as PDF or image (mock functionality).');
        // TODO: Implement actual export functionality
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <Text style={[styles.title, darkMode && styles.darkText]}>Profile</Text>

            {/* Username Section */}
            <View style={styles.section}>
                <Text style={[styles.label, darkMode && styles.darkText]}>Username</Text>
                <TextInput
                    style={[styles.input, darkMode && styles.darkInput]}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    placeholderTextColor={darkMode ? '#A9A9A9' : '#666'}
                />
            </View>

            {/* BMI Section */}
            <View style={styles.section}>
                <Text style={[styles.label, darkMode && styles.darkText]}>BMI</Text>
                <TextInput
                    style={[styles.input, darkMode && styles.darkInput]}
                    value={bmi}
                    onChangeText={setBmi}
                    placeholder="BMI = weight (kg) / height² (m²)"
                    placeholderTextColor={darkMode ? '#A9A9A9' : '#666'}
                    keyboardType="numeric"
                />
            </View>

            {/* Calorie Tracking Section */}
            <View style={styles.section}>
                <Text style={[styles.label, darkMode && styles.darkText]}>Calories</Text>
                <TextInput
                    style={[styles.input, darkMode && styles.darkInput]}
                    value={calories}
                    onChangeText={setCalories}
                    placeholder="Enter calories per meal"
                    placeholderTextColor={darkMode ? '#A9A9A9' : '#666'}
                    keyboardType="numeric"
                />
            </View>

            {/* Dark Mode Toggle */}
            <View style={styles.section}>
                <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={toggleDarkMode} />
            </View>

            {/* Export & Share Button */}
            <TouchableOpacity style={styles.button} onPress={handleExport}>
                <Text style={styles.buttonText}>Export & Share Weekly Plan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    darkContainer: {
        backgroundColor: '#17181D',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 16,
    },
    darkText: {
        color: '#ffffff',
    },
    section: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#000000',
    },
    darkInput: {
        borderColor: '#444',
        color: '#ffffff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default Profile;
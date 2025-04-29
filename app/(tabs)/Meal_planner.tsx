import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Meal_Planner = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Meal Planner </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17181D',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default Meal_Planner;
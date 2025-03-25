import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '@/app/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { Provider as PaperProvider, Button } from "react-native-paper";
import ModernTextInput from "@/components/ModernTextInput";
import ModernButton from "@/components/ModernButton";

export default function DataGatheringScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams(); // Get userId from navigation
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    age: '',
    gender: '',
    weight: '',
    height: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (key: string, value: string) => {
    setForm(prevForm => ({ ...prevForm, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!userId) return;
    try {
      await setDoc(doc(db, 'users', userId), form, { merge: true });
      alert('Data saved successfully!');
      router.push('/greet-screen'); // Navigate to greeting screen
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#17181D" />
        ) : (
          <>
            <Text style={styles.title}>Quick Stats: Let’s Get the Basics Down</Text>
            
            <ModernTextInput
              label="Age"
              value={form.age}
              onChangeText={(text) => handleChange('age', text)}
              keyboardType="numeric"
            />

            <ModernTextInput
              label="Gender"
              value={form.gender}
              onChangeText={(text) => handleChange('gender', text)}
            />

            <ModernTextInput
              label="Weight (kg)"
              value={form.weight}
              onChangeText={(text) => handleChange('weight', text)}
              keyboardType="numeric"
            />

            <ModernTextInput
              label="Height (cm)"
              value={form.height}
              onChangeText={(text) => handleChange('height', text)}
              keyboardType="numeric"
            />

            <ModernButton 
              onPress={handleSubmit}
              title='Submit'
            >
            </ModernButton>
          </>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e09145',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

});


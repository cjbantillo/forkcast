import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { AuthContext } from '../_layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Profile = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext)!;
  const user = useContext(AuthContext)?.user;

  const [profileData, setProfileData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (!user) {
      router.replace('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfileData(userSnap.data());
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleExport = () => {
    Alert.alert('Export', 'Weekly plan exported as PDF or image (mock functionality).');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace('/');
    } catch (error) {
      Alert.alert('Logout Failed', (error as Error).message);
    }
  };

  const renderInfoRow = (label: string, value: string | number | undefined) => (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, darkMode && styles.darkText]}>{label}</Text>
      <Text style={[styles.infoValue, darkMode && styles.darkText]}>
        {value ?? 'N/A'}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[styles.title, darkMode && styles.darkText]}>My Profile</Text>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        {renderInfoRow('Username', profileData?.username || 'user123')}
        {renderInfoRow('Age', profileData?.age)}
        {renderInfoRow('Gender', profileData?.gender)}
        {renderInfoRow('Height (cm)', profileData?.height)}
        {renderInfoRow('Weight (kg)', profileData?.weight)}
        {renderInfoRow('BMI', profileData?.bmi)}
        {renderInfoRow('Calories', profileData?.calories)}
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleExport}>
        <Text style={styles.buttonText}>Export & Share Weekly Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4C4C' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#17181D',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#292C35',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Profile;

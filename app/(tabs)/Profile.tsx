import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { AuthContext } from '../_layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext)!;
  const user = useContext(AuthContext)?.user;

  const [profileData, setProfileData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const [loading, setLoading] = useState(true);
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/');
      return;
    }

    // Check if user signed in with Google
    setIsGoogleAccount(
      user.providerData.some(provider => provider.providerId === GoogleAuthProvider.PROVIDER_ID)
    );

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfileData(userSnap.data());
        } else if (isGoogleAccount) {
          // For Google users without additional profile data
          // You could create a default profile here if needed
          console.log('Google user without additional profile data');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, isGoogleAccount]);

  const handleExport = () => {
    Alert.alert('Export', 'Weekly plan exported as PDF or image (mock functionality).');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              setUser(null);
              router.replace('/');
            } catch (error) {
              Alert.alert('Logout Failed', (error as Error).message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderInfoRow = (label: string, value: string | number | undefined, icon: string) => (
    <View style={[styles.infoRow, darkMode && styles.darkInfoRow]}>
      <View style={styles.labelContainer}>
        <Ionicons name={icon} size={20} color={darkMode ? '#E69145' : '#E69145'} style={styles.icon} />
        <Text style={[styles.infoLabel, darkMode && styles.darkText]}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, darkMode && styles.darkText]}>
        {value ?? 'N/A'}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E69145" />
          <Text style={[styles.loadingText, darkMode && styles.darkText]}>Loading profile...</Text>
        </View>
      ) : (
      <><View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: user?.photoURL || 'https://i.pravatar.cc/150' }}
                style={styles.profileImage} />
              {/* No edit button for OAuth profile pictures */}
            </View>
            <Text style={[styles.username, darkMode && styles.darkText]}>
              {user?.displayName || profileData?.username || 'User'}
            </Text>
            <Text style={styles.userEmail}>{user?.email || 'No email available'}</Text>
            {user?.emailVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#FEFEFE" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View><View style={styles.statsContainer}>
              <View style={[styles.statBox, darkMode && styles.darkStatBox]}>
                <Text style={styles.statValue}>{profileData?.weight || '68'}</Text>
                <Text style={styles.statLabel}>Weight</Text>
              </View>
              <View style={[styles.statBox, darkMode && styles.darkStatBox]}>
                <Text style={styles.statValue}>{profileData?.height || '175'}</Text>
                <Text style={styles.statLabel}>Height</Text>
              </View>
              <View style={[styles.statBox, darkMode && styles.darkStatBox]}>
                <Text style={styles.statValue}>{profileData?.bmi || '22.4'}</Text>
                <Text style={styles.statLabel}>BMI</Text>
              </View>
            </View><Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Personal Information</Text><View style={[styles.card, darkMode && styles.darkCard]}>
              {renderInfoRow('Age', profileData?.age || '28', 'calendar-outline')}
              {renderInfoRow('Gender', profileData?.gender || 'Male', 'person-outline')}
              {renderInfoRow('Calories', profileData?.calories || '2100', 'nutrition-outline')}
            </View><Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Settings</Text><View style={[styles.card, darkMode && styles.darkCard]}>
              <View style={styles.settingRow}>
                <View style={styles.labelContainer}>
                  <Ionicons name="moon-outline" size={20} color={darkMode ? '#E69145' : '#E69145'} style={styles.icon} />
                  <Text style={[styles.settingLabel, darkMode && styles.darkText]}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#D1D1D6', true: '#E69145' }}
                  thumbColor={'#FEFEFE'} />
              </View>

              <TouchableOpacity style={styles.settingRow} onPress={handleExport}>
                <View style={styles.labelContainer}>
                  <Ionicons name="share-outline" size={20} color={darkMode ? '#E69145' : '#E69145'} style={styles.icon} />
                  <Text style={[styles.settingLabel, darkMode && styles.darkText]}>Export & Share Weekly Plan</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={darkMode ? '#AAAAAA' : '#777777'} />
              </TouchableOpacity>
            </View><View style={styles.accountInfoContainer}>
              <Text style={[styles.accountTypeText, darkMode && styles.darkText]}>
                {isGoogleAccount ? 'Signed in with Google' : 'Email Account'}
              </Text>
            </View><TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#FEFEFE" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>{isGoogleAccount ? 'Sign out' : 'Logout'}</Text>
            </TouchableOpacity></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingHorizontal: 24,
  },
  verifiedBadge: {
    flexDirection: 'row',
    backgroundColor: '#E69145',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  verifiedText: {
    color: '#FEFEFE',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#E69145',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E69145',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#888888',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  darkStatBox: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E69145',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },
  darkText: {
    color: '#F2F2F2',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  darkInfoRow: {
    borderBottomColor: '#333333',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333333',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#E69145',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FEFEFE',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333333',
  },
  accountInfoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  accountTypeText: {
    fontSize: 14,
    color: '#777777',
    fontStyle: 'italic',
  },
});

export default Profile;
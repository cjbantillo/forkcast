import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataGathering = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Gathering Page</Text>
      <Text style={styles.description}>This is a simple page for gathering data.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default DataGathering;
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function WelcomeScreen() {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIVA</Text>
      <Text style={styles.subtitle}>Puerto Rico</Text>
      <Text style={styles.tagline}>Find your social.</Text>

      <Text style={styles.sectionTitle}>Create an account</Text>
      <Text style={styles.sectionText}>Enter your email to sign up for this app</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />

      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Continue
      </Button>

      <Button
        mode="outlined"
        icon="google"
        style={styles.button}
        onPress={() => {}}
      >
        Continue with Google
      </Button>

      <Button
        mode="outlined"
        icon="apple"
        style={styles.button}
        onPress={() => {}}
      >
        Continue with Apple
      </Button>

      <Button mode="outlined" style={styles.providerBtn} onPress={() => {}}>
        Provider Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginVertical: 5,
  },
  providerBtn: {
    marginTop: 40,
    borderColor: '#aaa',
    width: 180,
  },
});

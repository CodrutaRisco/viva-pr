import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";
import {
  REACT_NATIVE_GOOGLE_CLIENT_ID_ANDROID,
  REACT_NATIVE_GOOGLE_CLIENT_ID_IOS,
  REACT_NATIVE_GOOGLE_CLIENT_ID_WEB,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      ios: REACT_NATIVE_GOOGLE_CLIENT_ID_IOS,
      android: REACT_NATIVE_GOOGLE_CLIENT_ID_ANDROID,
      default: REACT_NATIVE_GOOGLE_CLIENT_ID_WEB,
    }),
    scopes: ["profile", "email"],
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: false,
      native: "com.vivapr.client:/oauthredirect",
    }),
  });

  useEffect(() => {
    console.log("Google login response:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      } else {
        console.warn("Nu s-a primit accessToken de la Google.");
      }
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      setIsAuthenticating(true);
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      setUserInfo(user);
      setEmail(user.email);
      console.log("User info:", user);
    } catch (error) {
      console.error("Eroare la user info:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIVA</Text>
      <Text style={styles.subtitle}>Puerto Rico</Text>
      <Text style={styles.tagline}>Find your social.</Text>

      {userInfo && (
        <>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text style={styles.userText}>Welcome, {userInfo.name}!</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Create an account</Text>
      <Text style={styles.sectionText}>
        Enter your email to sign up for this app
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />

      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Continue
      </Button>

      <Button
        mode="contained"
        onPress={() => {
          if (!request || isAuthenticating) return;
          promptAsync();
        }}
        disabled={!request || isAuthenticating}
        style={styles.button}
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    marginVertical: 5,
  },
  providerBtn: {
    marginTop: 40,
    borderColor: "#aaa",
    width: 180,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
});

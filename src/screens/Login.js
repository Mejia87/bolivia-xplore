import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const googleClientId = '1026158333493-u6fn0j9he1vkeof4luji87igag5ljvg7.apps.googleusercontent.com';

export default function Login({ onLogin }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleClientId,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), 
      scopes: ['profile', 'email'],
      responseType: 'token', 
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('userInfo');
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error cargando la sesión', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Verifica si hay una respuesta de la autenticación
  useEffect(() => {
    if (response?.type === 'success') {
      const accessToken = response.params.access_token;

      (async () => {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = await userInfoResponse.json();
        setUserInfo(user);
        await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
      })();
    }
  }, [response]);

  async function logout() {
    await SecureStore.deleteItemAsync('userInfo');
    setUserInfo(null);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>BoliviaXplore</Text>
      {userInfo ? (
        <>
          <Text>Bienvenido, {userInfo.name}</Text>
          <TouchableOpacity onPress={logout} style={styles.googleButton}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity 
          onPress={() => promptAsync()} 
          style={styles.googleButton} 
          disabled={!request}
        >
          <Image source={require('../../assets/image.png')} style={styles.googleIcon} />
          <Text>Continuar con Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 150,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

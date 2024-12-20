import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBroser.maybeCompleteAuthSession()

export default function Login({ onLogin }) {
    const [userInfo, setUserInfo] = useState(null)
    const[request,response,promptAsync] = Google.useAuthRequest({
      clientId: "461729350332-nn6el1joa99lvack79621emk7vcb48t0.apps.googleusercontent.com",
      androidClientId: "461729350332-17tirlf0q7o8p240at3b8v88np340gud.apps.googleusercontent.com",

    })

    useEffect (() => {
        handleSignInWithGoogle()
    }, [response])


    async function handleSignInWithGoogle() {
        const user = await getLocalUser();
        if(!user) {
            if (response?.type === 'success') {
                getUserInfo(response.authentication.accessToken)
            }
            
        } else {
            setUserInfo(user)
            console.log('usuario', userInfo)
        }
    }
    
    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user")

        if(!data) {
            return null
        }
        return JSON.parse(data)
    }

    const getUserInfo = async (token) => {
        if(!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
            console.log('usuario', userInfo)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>BoliviaXplore</Text>
            <TouchableOpacity style={styles.googleButton} onPress={() => {
                promptAsync()
            }}>
              <Image
                source={require('../../assets/google.png',)}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>
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
    fontFamily: 'system',
    fontStyle: 'italic',
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 120,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
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
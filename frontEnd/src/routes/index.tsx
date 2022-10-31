import React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from "../hooks/AuthContext";
import api from "../services/api";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Routes() {
  const [auth, setAuth] = useState(false)
  const { user, setUserAuth } = useAuth()

  useEffect(() => {
    async function getToken() {
      let tokenInfos = await AsyncStorage.getItem('@boatTravel:user')


      if (tokenInfos) {

        const parseTokenInfos = JSON.parse(tokenInfos)

        const { data } = await api.get('/sessions', { headers: { Authorization: `Bearer ${parseTokenInfos.token}` } })

        if (data['message']) {
          setAuth(true)
          setUserAuth({ ...parseTokenInfos, }, true)
        }
      } else {
        setAuth(false)
      }
    }
    getToken()
  }, [!user])

  return (
    <NavigationContainer>
      {auth ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
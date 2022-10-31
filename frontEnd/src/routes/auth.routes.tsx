import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../screens/Login";
import { Home } from "../screens/Home"
import { SignUp } from "../screens/SignUp";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Settings: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen
        name="Login"
        component={Login}
      />
      <Screen
        name="SignUp"
        component={SignUp}
      />
    </Navigator>
  );
}
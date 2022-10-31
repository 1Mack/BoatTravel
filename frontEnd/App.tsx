import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import {
  RobotoCondensed_300Light,
  RobotoCondensed_400Regular,
  RobotoCondensed_700Bold
} from '@expo-google-fonts/roboto-condensed'

import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'

import { Background } from './src/components/Background';

import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes/index'

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AuthProvider } from './src/hooks/AuthContext';

SplashScreen.preventAutoHideAsync()

export function App() {

  const [fontsloaded] = useFonts({
    RobotoCondensed_300Light,
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold
  })

  if (!fontsloaded) {
    return null;
  }
  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 2000);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <StatusBar
          style="light"
          translucent={true} />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Background>
    </ThemeProvider>
  );
}

{/* Funcionamento do Touch para o android */ }
export default gestureHandlerRootHOC(App);

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { Home } from '../screens/Home';
import { Orders } from "../screens/Orders";
import { Settings } from "../screens/Settings";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.blue,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarActiveBackgroundColor: theme.colors.white,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold'
        }
      }}
    >
      <Screen
        name='Início'
        component={Home}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: (({ size, color }) =>
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='Atividades'
        component={Orders}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: (({ size, color }) =>
            <AntDesign
              name="profile"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='Perfil'
        component={Settings}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: (({ size, color }) =>
            <Octicons
              name="person"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}

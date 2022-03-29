import { SafeAreaView } from 'react-native';
import { NativeBaseProvider, Text } from 'native-base';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { normalStyle } from './styles';
import DevicePage from './pages/devicePage';
import AuthPage from './pages/authPage';

const Stack = createNativeStackNavigator()

export default function App() {
  return <NativeBaseProvider>
    <SafeAreaView style={normalStyle}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Root/Auth'>
          <Stack.Screen
            name='Root/Auth'
            component={AuthPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Root/MainApp'
            component={MainApp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <AuthPage /> */}

    </SafeAreaView>
  </NativeBaseProvider>
}

function MainApp() {
  return <SafeAreaView style={normalStyle}>
    <DevicePage />
  </SafeAreaView>
}


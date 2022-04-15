import { createContext } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeviceInfo from "./pages/DeviceInfo";
import Carousel from "./components/SliderList/Carousel";
import ViewEngine from './pages/ViewDevice';
import { GardenContextProvider } from './contexts/GardenContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <GardenContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root/MainApp/ViewEngine">
          {/* <Stack.Screen name="Root/Auth/Login" component={Login} /> */}
          {/* <Stack.Screen name="Root/Auth/Signup" component={Signup} /> */}
          <Stack.Screen
            name="Root/MainApp/Carousel"
            component={Carousel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root/MainApp/ViewEngine"
            component={ViewEngine}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root/MainApp/DeviceInfo"
            component={DeviceInfo}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Root/MainApp/Policy" component={Policy} /> */}
          {/* <Stack.Screen name="Root/MainApp/Scheduler" component={Scheduler} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </GardenContextProvider>
  );
}
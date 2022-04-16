import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeviceInfo from "./pages/DeviceInfo";
import ViewDevice from './pages/ViewDevice';
import EditPolicy from "./pages/editPolicy";
import Homepage from "./pages/homepage";
import AddGarden from "./pages/addGarden";
import { GardenContextProvider } from './contexts/GardenContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <GardenContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root/MainApp/Homepage">
          <Stack.Screen 
            name="Root/MainApp/Homepage" 
            component={Homepage} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Root/MainApp/AddGarden" 
            component={AddGarden} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root/MainApp/EditPolicy"
            component={EditPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root/MainApp/ViewEngine"
            component={ViewDevice}
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

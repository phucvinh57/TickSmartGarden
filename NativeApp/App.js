import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login, Signup } from "./components/Auth";
import DeviceInfo from "./pages/DeviceInfo";
import ViewDevice from './pages/ViewDevice';
import EditPolicy from "./pages/editPolicy";
import Homepage from "./pages/homepage";
import AddGarden from "./pages/addGarden";
import { GardenContextProvider } from './contexts/GardenContext';
import ViewActuator from "./pages/ViewActuator";

const Stack = createNativeStackNavigator();

// initialRouteName="Root/MainApp/DeviceInfo"

export default function App() {
  return (
    <GardenContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Root/Auth/Login"
          // initialRouteName="Root/MainApp/ViewEngine"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen 
            name="Root/Auth/Login" 
            component={Login} 
          />
          <Stack.Screen 
            name="Root/Auth/Signup" 
            component={Signup} 
          />
          <Stack.Screen 
            name="Root/MainApp/Homepage" 
            component={Homepage} 
          />
          <Stack.Screen 
            name="Root/MainApp/AddGarden" 
            component={AddGarden} 
          />
          <Stack.Screen
            name="Root/MainApp/EditPolicy"
            component={EditPolicy}
          />
          <Stack.Screen
            name="Root/MainApp/ViewEngine"
            component={ViewActuator}
          />
          <Stack.Screen
            name="Root/MainApp/DeviceInfo"
            component={DeviceInfo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </GardenContextProvider>
  );
}

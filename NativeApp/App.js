import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContextProvider } from './contexts/AuthContext';
import BottomTab from './navigation/BottomTab'
import store from "./redux/store"
import { Provider } from "react-redux";


export default function App() {
  return (
    <Provider store={store}>
    <AuthContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Stack.Navigator 
          initialRouteName="Root/Auth/Login"
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
            component={ViewDevice}
          />
          <Stack.Screen
            name="Root/MainApp/DeviceInfo"
            component={DeviceInfo}
          />
        </Stack.Navigator> */}
        <BottomTab />
      </NavigationContainer>
    </NativeBaseProvider>
    </AuthContextProvider>
    </Provider>
  );
}

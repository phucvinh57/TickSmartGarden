import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/login/login";
import Signup from "./components/login/signup";
import DeviceInfo from "./components/device/deviceInfo";
import Policy from "./components/device/policy";
import Scheduler from "./components/device/scheduler";
import Carousel from "./components/device/Carousel";
import TestTable from "./components/device/TestTable";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Root/Auth/Login" component={Login} /> */}
          {/* <Stack.Screen name="Root/Auth/Signup" component={Signup} /> */}
          {/* <Stack.Screen
            name="Root/MainApp/Carousel"
            component={Carousel}
            options={{ headerShown: false }}
          /> */}
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
  );
}

const styles = StyleSheet.create({
  normalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

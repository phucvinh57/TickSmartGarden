import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GardenContextProvider } from './contexts/GardenContext';
import BottomTab from './navigation/BottomTab'
import store from "./redux/store"
import { Provider } from "react-redux";


export default function App() {
  return (
    <Provider store={store}>
    <GardenContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </NativeBaseProvider>
    </GardenContextProvider>
    </Provider>
  );
}

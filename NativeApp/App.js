import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContextProvider } from './contexts/AuthContext';
import BottomTab from './navigation/BottomTab'
import store from "./redux/store"
import { Provider } from "react-redux";
import AuthTest from "./navigation/Auth";


export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <AuthContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthTest />
      </NavigationContainer>
    </NativeBaseProvider>
    </AuthContextProvider>
    </Provider>
  );
}

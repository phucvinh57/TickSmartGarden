import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import Carousel from "./components/SliderList/Carousel";
import DeviceInfo from "./pages/DeviceInfo";
import ViewEngine from './pages/ViewDevice';
import EditPolicy from "./pages/editPolicy";
import Homepage from "./pages/homepage";
import AddGarden from "./pages/addGarden";
import { GardenContextProvider } from './contexts/GardenContext';
import BottomTab from './navigation/BottomTab'
import { Provider } from "react-redux";
import store from './redux/store';


export default function App() {
  return (
    <Provider store={store}>
    <GardenContextProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Root/MainApp/Homepage">
          <Stack.Screen name="Root/MainApp/Homepage" component={Homepage} options={{ headerShown: false }}/>
          <Stack.Screen name="Root/MainApp/AddGarden" component={AddGarden} options={{ headerShown: false }}/>
          <Stack.Screen
            name="Root/MainApp/Carousel"
            component={Carousel}
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="Root/MainApp/EditPolicy"
            component={EditPolicy}
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
          <Stack.Screen name="Root/MainApp/Policy" component={Policy} />
          <Stack.Screen name="Root/MainApp/Scheduler" component={Scheduler} />
        </Stack.Navigator> */}
        <BottomTab />
      </NavigationContainer>
    </NativeBaseProvider>
    </GardenContextProvider>
    </Provider>
  );
}

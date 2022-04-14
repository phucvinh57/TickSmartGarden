import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import TabsHome from "./TabsHome";
import TabsMain from "./TabsMain"
import {Provider} from "react-redux";
import store from './redux/store';
import EditPolicy from "./pages/editPolicy";
import Homepage from "./pages/homepage";

export default function App() {
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <TabsMain />
    //   </NavigationContainer>
    // </Provider>
    <EditPolicy />
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

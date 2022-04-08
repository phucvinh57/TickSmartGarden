import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import Homepage from "./pages/Homepage";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
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

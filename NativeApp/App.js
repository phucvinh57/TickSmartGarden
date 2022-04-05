// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Homepage from './pages/homepage';
import OnOff from './pages/OnOff'

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>WTF ???????????</Text> */}
    //   {/* <StatusBar style="auto" /> */}
    //   <Text></Text>
    // </View>
    <Homepage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

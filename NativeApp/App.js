// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Homepage from './pages/homepage';
import AddGarden from './pages/addGarden';

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>WTF ???????????</Text> */}
    //   {/* <StatusBar style="auto" /> */}
    //   <Text></Text>
    // </View>
    <AddGarden />
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

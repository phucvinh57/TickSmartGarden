import { NativeBaseProvider } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import Onoff from './components/view-device/OnOff';
import EngineCard from './components/view-device/EngineCard';
import Engine from './pages/Engine';


export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Engine/>
        {/* <EngineCard/> */}
        {/* <Onoff/> */}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});

import { NativeBaseProvider } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import ViewEngine from './pages/ViewDevice';


export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ViewEngine />
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

import { StyleSheet, SafeAreaView } from 'react-native';
import AuthPage from './pages/authPage';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
      <AuthPage />
    </SafeAreaView>
  </NativeBaseProvider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

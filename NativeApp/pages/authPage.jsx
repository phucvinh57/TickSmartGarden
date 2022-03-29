import Login from "../components/login/login";
import Signup from "../components/login/signup";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { normalStyle } from '../styles'

const Stack = createNativeStackNavigator()

export default function AuthPage() {
    return <SafeAreaView style={normalStyle}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
}

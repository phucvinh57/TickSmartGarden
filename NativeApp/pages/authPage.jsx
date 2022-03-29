import Login from "../components/login/login";
import Signup from "../components/login/signup";
import { SafeAreaView } from "react-native";
import { normalStyle } from '../styles'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function AuthPage() {
    return <SafeAreaView style={normalStyle}>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Root/Auth/Login" component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Root/Auth/Signup" component={Signup}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </SafeAreaView>
}

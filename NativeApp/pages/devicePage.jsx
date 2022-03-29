import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeviceInfo from "../components/device/deviceInfo";
import Policy from "../components/device/policy";
import Scheduler from "../components/device/scheduler";
import { normalStyle } from "../styles";

const Stack = createNativeStackNavigator()

export default function DevicePage() {
    return <SafeAreaView style={normalStyle}>
        <Stack.Navigator initialRouteName="Root/MainApp/DeviceInfo">
            <Stack.Screen
                name="Root/MainApp/DeviceInfo"
                component={DeviceInfo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Root/MainApp/Policy"
                component={Policy}
            />
            <Stack.Screen
                name="Root/MainApp/Scheduler"
                component={Scheduler}
            />
        </Stack.Navigator>
    </SafeAreaView>
}
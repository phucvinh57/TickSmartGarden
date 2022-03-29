import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Button, Text, Box, FormControl, Stack, Input, Link } from 'native-base'
import { normalStyle } from "../../styles";

import DeviceInfo from "../components/device/deviceInfo";
import Policy from "../components/device/policy";
import Scheduler from "../components/device/scheduler";

const Stack = createNativeStackNavigator()

export default function DevicePage() {
    return <SafeAreaView style={normalStyle}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="DeviceInfo" component={DeviceInfo} />
                <Stack.Screen name="Policy" component={Policy} />
                <Stack.Screen name="Scheduler" component={Scheduler} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
}
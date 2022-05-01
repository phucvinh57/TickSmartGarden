import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DeviceInfo from "../pages/DeviceInfo";
import ViewEngine from '../pages/ViewDevice';
import EditPolicy from "../pages/editPolicy";
import EditSchedule from "../pages/editSchedule"
import Homepage from "../pages/homepage";
import AddGarden from "../pages/addGarden";

const Stack = createNativeStackNavigator()

const HomepageScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/Homepage'>
            <Stack.Screen 
                name="Root/MainApp/Homepage"
                component={Homepage}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name = "Root/MainApp/ViewEngine"
                component={ViewEngine}
                options = {{headerShown: false}}
            />
            <Stack.Screen 
                name = "Root/MainApp/DeviceInfo"
                component={DeviceInfo}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {HomepageScreenNavigator}

const ViewEngineScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/ViewEngine'>
            <Stack.Screen 
                name = "Root/MainApp/ViewEngine"
                component={ViewEngine}
                options = {{headerShown: false}}
            />
            
        </Stack.Navigator>
    )
}
export {ViewEngineScreenNavigator}

const AddGardenScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/AddGarden'>
            <Stack.Screen 
                name = "Root/MainApp/AddGarden"
                component={AddGarden}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {AddGardenScreenNavigator}

const EditPolicyScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/EditPolicy'>
            <Stack.Screen 
                name = "Root/MainApp/EditPolicy"
                component={EditPolicy}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {EditPolicyScreenNavigator}

const EditScheduleScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/EditSchedule'>
            <Stack.Screen 
                name = "Root/MainApp/EditSchedule"
                component={EditSchedule}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {EditScheduleScreenNavigator}
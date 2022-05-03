import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DeviceInfo from "../pages/DeviceInfo";
import EditPolicy from "../pages/editPolicy";
import EditSchedule from "../pages/editSchedule"
import Homepage from "../pages/homepage";
import AddGarden from "../pages/addGarden";
import ViewActuator from "../pages/ViewActuator";
import AddPolicy from '../pages/addPolicy';
import AddSchedule from '../pages/addSchedule';

const Stack = createNativeStackNavigator()

const HomepageScreenNavigator = () => {
    return(
        <Stack.Navigator 
            initialRouteName='Root/MainApp/Homepage'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen 
                name="Root/MainApp/Homepage"
                component={Homepage}
            />
            <Stack.Screen 
                name = "Root/MainApp/ViewEngine"
                component={ViewActuator}
            />
            <Stack.Screen 
                name = "Root/MainApp/DeviceInfo"
                component={DeviceInfo}
                />
            <Stack.Screen
                name="Root/MainApp/EditPolicy"
                component={EditPolicy}
            />
            <Stack.Screen
                name="Root/MainApp/EditSchedule"
                component={EditSchedule}
            />
            {/* <Stack.Screen 
            name="Root/Auth/Login" 
            component={Login} 
          />
          <Stack.Screen 
            name="Root/Auth/Signup" 
            component={Signup} 
          />
          <Stack.Screen 
            name="Root/MainApp/Homepage" 
            component={Homepage} 
          />
          <Stack.Screen 
            name="Root/MainApp/AddGarden" 
            component={AddGarden} 
          />
          <Stack.Screen
            name="Root/MainApp/EditPolicy"
            component={EditPolicy}
          />
          <Stack.Screen
            name="Root/MainApp/ViewEngine"
            component={ViewDevice}
          />
          <Stack.Screen
            name="Root/MainApp/DeviceInfo"
            component={DeviceInfo}
          /> */}
        </Stack.Navigator>
    )
}
export {HomepageScreenNavigator}

const ViewEngineScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/ViewEngine'>
            <Stack.Screen 
                name = "Root/MainApp/ViewEngine"
                component={ViewActuator}
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
        <Stack.Navigator initialRouteName='Root/MainApp/AddPolicy'>
            <Stack.Screen 
                name = "Root/MainApp/AddPolicy"
                component={AddPolicy}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {EditPolicyScreenNavigator}

const EditScheduleScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/AddSchedule'>
            <Stack.Screen 
                name = "Root/MainApp/AddSchedule"
                component={AddSchedule}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {EditScheduleScreenNavigator}
import React, { useContext } from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DeviceInfo from "../pages/DeviceInfo";
import EditPolicy from "../pages/editPolicy";
import EditSchedule from "../pages/editSchedule"
import Homepage from "../pages/homepage";
import AddGarden from "../pages/addGarden";
import ViewActuator from "../pages/ViewActuator";
import { Login, Signup } from "../components/Auth";
import { AuthContext } from '../contexts/AuthContext';
// import useLogging from '../contexts/useLogging';
import AddPolicy from '../pages/addPolicy';
import AddSchedule from '../pages/addSchedule';
import Chart from '../pages/chart';
import Profile from '../pages/profile'

const Stack = createNativeStackNavigator()

const AuthScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root/Auth/Login" component={Login} />
            <Stack.Screen name="Root/Auth/Signup" component={Signup} />
        </Stack.Navigator>
    )
}

export {AuthScreenNavigator}

const HomepageScreenNavigator = () => {
    return(
        <Stack.Navigator 
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
            <Stack.Screen 
                name = "Root/MainApp/AddSchedule"
                component={AddSchedule}
            />
            <Stack.Screen 
                name = "Root/MainApp/AddPolicy"
                component={AddPolicy}
            />
            <Stack.Screen 
                name = "Root/MainApp/Chart"
                component={Chart}
            />
        </Stack.Navigator>
    )
}
export {HomepageScreenNavigator}

// const ViewEngineScreenNavigator = () => {
//     return(
//         <Stack.Navigator initialRouteName='Root/MainApp/ViewEngine'>
//             <Stack.Screen 
//                 name = "Root/MainApp/ViewEngine"
//                 component={ViewActuator}
//                 options = {{headerShown: false}}
//             />
            
//         </Stack.Navigator>
//     )
// }
// export {ViewEngineScreenNavigator}

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

// const EditPolicyScreenNavigator = () => {
//     return(
//         <Stack.Navigator initialRouteName='Root/MainApp/AddPolicy'>
//             <Stack.Screen 
//                 name = "Root/MainApp/AddPolicy"
//                 component={AddPolicy}
//                 options = {{headerShown: false}}
//             />
//         </Stack.Navigator>
//     )
// }
// export {EditPolicyScreenNavigator}

const ProfileScreenNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Root/MainApp/Profile'>
            <Stack.Screen 
                name = "Root/MainApp/Profile"
                component={Profile}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export {ProfileScreenNavigator}
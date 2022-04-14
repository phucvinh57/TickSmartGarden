import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Homepage from "./pages/homepage";
import AddGarden from "./pages/addGarden";
import EditPolicy from "./pages/editPolicy";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator()


const Tabs = () => {
    return (    
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {
            position: 'absolute',
            bottom: 20
        }}}
            >
            <Tab.Screen name="Homepage" component={Homepage} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source = {require('./assets/icons/icon-home.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused? '#28554e' : '#CAF1D9'
                            }}
                        />
                        <Text style={{color: focused ? '#28554e' : '#CAF1D9', fontSize: 14}}>Home</Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Engine" component={EditPolicy} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source = {require('./assets/icons/icon-engine.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused? '#28554e' : '#CAF1D9'
                            }}
                        />
                        <Text style={{color: focused ? '#28554e' : '#CAF1D9', fontSize: 14}}>Engine</Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Sensor" component={AddGarden} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source = {require('./assets/icons/icon-sensor.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused? '#28554e' : '#CAF1D9'
                            }}
                        />
                        <Text style={{color: focused ? '#28554e' : '#CAF1D9', fontSize: 14}}>Sensor</Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Profile" component={AddGarden} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source = {require('./assets/icons/icon-profile.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused? '#28554e' : '#CAF1D9'
                            }}
                        />
                        <Text style={{color: focused ? '#28554e' : '#CAF1D9', fontSize: 14}}>Profile</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
};

export default Tabs;
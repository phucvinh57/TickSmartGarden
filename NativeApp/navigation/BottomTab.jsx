import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { HomepageScreenNavigator, 
        AddGardenScreenNavigator, 
        ViewEngineScreenNavigator,
        EditPolicyScreenNavigator,
        EditScheduleScreenNavigator } 

        from "./Navigation";

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style = {{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress = {onPress}
    >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            backgroundColor: '#de7067'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return (    
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            height: 55
        }}}
            >
            <Tab.Screen name="HomepageScreen" component={HomepageScreenNavigator} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/icons/icon-home.png')}
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

            <Tab.Screen name="EngineScreen" component={ViewEngineScreenNavigator} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center',  justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/icons/icon-engine.png')}
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

            <Tab.Screen name="AddGardenScreen" component={AddGardenScreenNavigator} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/icons/icon-plus.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: "#fff"
                            }}
                        />
                    </View>
                ),
                tabBarButton: (props) => (
                   <CustomTabBarButton {... props} />
                )
            }} />


            <Tab.Screen name="Sensor" component={EditPolicyScreenNavigator} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center',  justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/icons/icon-sensor.png')}
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

            <Tab.Screen name="Profile" component={EditScheduleScreenNavigator} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center',  justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/icons/icon-profile.png')}
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
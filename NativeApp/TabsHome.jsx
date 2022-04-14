import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Homepage from "./pages/homepage";
import AddGarden from "./pages/addGarden";
//import OnOff from "./pages/OnOff";
import { useRoute } from "@react-navigation/native";

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
            width: 70,
            height: 70,
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

            <Tab.Screen name="AddGarden" component={AddGarden} options = {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {require('./assets/icons/icon-plus.png')}
                            resizeMode = "contain"
                            style = {{
                                width: 30,
                                height: 30,
                                tintColor: "#fff"
                            }}
                        />
                    </View>
                ),
                tabBarButton: (props) => (
                   <CustomTabBarButton {... props} />
                )
            }} />


            <Tab.Screen name="test" component={AddGarden} options = {{
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
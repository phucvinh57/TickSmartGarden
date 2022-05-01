import {SafeAreaView, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity, View} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState} from "react";
import NumericInput from "react-native-numeric-input";

export default function EditSchedule({navigation}) {
    const cycleUnit = ["Giây", "Phút", "Giờ"]
    const [schedule, setSchedule] = useState({
        name: "",
        startTime: "",
        cycle: 0,
        cycleUnit: "",
        count: 0
    })
    
    console.log(schedule.cycleUnit)
    return(
        <SafeAreaView style={{backgroundColor: "#28554e", flex: 1}}>
            <SafeAreaView style={{flex: 1}}></SafeAreaView>
            <SafeAreaView style={{flex: 15, 
                backgroundColor: "#fff",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: "flex-start"
                }}>
                    <SafeAreaView style={{flex: 1, alignItems: "center", marginTop: 10}}>
                        <Text style={styles.textHeader}>Thêm/chỉnh sửa lịch bơm</Text>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên lịch bơm</Text>
                            <TextInput style={styles.textInput} value={schedule.name}
                                onChangeText={value => setSchedule({name: value})}></TextInput>
                        </SafeAreaView>

                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Bắt đầu</Text>
                            <TextInput style={styles.textInput} value={schedule.startTime}
                                onChangeText={value => setSchedule({startTime: value})}></TextInput>
                        </SafeAreaView>

                        {/* body */}
                        
                        <SafeAreaView style={{flexDirection: "row"}}>
                            <SafeAreaView style={{marginTop: 10, flexDirection: "column", justifyContent:"space-between"}}>
                                <Text style={[styles.textContent, {
                                    marginBottom: 10
                                }]}>Lặp lại mỗi</Text>

                                <SafeAreaView style={{flexDirection: "row"}}>
                                    <NumericInput 
                                        //value = {policy.number}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                    />
                                    <View style = {[{
                                        width: 120,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {schedule.cycleUnit}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue, itemIndex) => setSchedule({cycleUnit: itemValue})}
                                        >
                                            {cycleUnit.map((item, index) => {
                                                return (
                                                    <Picker.Item key={index} label={item} value={item} color="#28554e"/>
                                                )
                                            })}
                                            
                                        </Picker>
                                    </View>
                                </SafeAreaView>
                            </SafeAreaView>

                            <SafeAreaView style={{marginTop: 10, marginLeft: 20, flexDirection: "column", justifyContent:"space-between"}}>
                                <Text style={[styles.textContent, {
                                    marginBottom: 10
                                }]}>Kết thúc sau</Text>

                                <SafeAreaView style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <NumericInput 
                                        //value = {policy.number}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                    />
                                    <Text style={styles.textContent}>lần</Text>
                                </SafeAreaView>

                            </SafeAreaView>
                        </SafeAreaView>
                        

                    </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 24,
        color: "#de7067",
        fontWeight: "500",
    },
    textContent: {
        fontSize: 16,
        fontWeight: "500",
        color: "#7F4B1E"
    },
    textInput: {
        borderColor: "#28554e",
        borderRadius: 5,
        borderWidth: 2,
        width: '90%',
        height: 30,
        fontSize: 16,
        fontWeight: "bold"
    },
    dropdown: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        borderWidth: 2,
        borderRadius: 5,
        borderColor:"#28554e",
        height: 25,
    },
})
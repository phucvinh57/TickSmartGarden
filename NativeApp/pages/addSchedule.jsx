import {SafeAreaView, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity, View} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useEffect, useState} from "react";
import NumericInput from "react-native-numeric-input";
import scheduleService from "../services/schedule";
import policy from "../services/policy";
import moment from 'moment';
import { AuthContext } from "../contexts/AuthContext";

export default function AddSchedule({route, navigation}) {
    //const {hardwareId, gardenId, name} = route.params()
    const {auth: {hardwareId}} = useContext(AuthContext)
    // const hardwareId = '0lamp0'
    //const cycleUnit = ["Giây", "Phút", "Giờ"]
    const cycleUnit = ["min", "hour", "day", "week"]
    const cycleUnitVie = ["Phút", "Giờ", "Ngày", "Tuần"]
    let datetime = new Date("2022-04-07T15:33:55.000Z")
    const [schedule, setSchedule] = useState({
        name: "",
        startTime: datetime,
        cycle: 0,
        unit: cycleUnit[0],
        count: 0,
        operatingTime: 5,
    })

    const [oldSchedule, setOldSchedule] = useState({
        name: "",
        startTime: datetime,
        cycle: 0,
        unit: cycleUnit[0],
        count: 0
    })

    const [dateString, setDateString] = useState(moment(datetime).format("DD/MM/YYYY"))
    const [timeString, setTimeString] = useState(moment(datetime).format("hh:mm:ss A"))

    const handleChangeDate = (value) => {
        setDateString(value)
        let datetime = moment(value + " " + timeString, 'DD/MM/YYYY hh:mm:ss')
        let string = datetime.toISOString()
        setSchedule({...schedule, startTime: string})
    }

    const handleChangeTime = (value) => {
        setTimeString(value)
        let datetime = moment(dateString + " " + value, 'DD/MM/YYYY hh:mm:ss A')
        let string = datetime.toISOString()
        setSchedule({...schedule, startTime: string})
    }

    const handleCancel = () => {
        setSchedule(oldSchedule)
    }

    const handleAccept = () => {
        scheduleService.create({...schedule, hardwareID: hardwareId}).then(() => {
            navigation.goBack()
        }).catch(console.err)
    }

    console.log(schedule)
    
    return(
        <SafeAreaView style={{backgroundColor: "#28554e", flex: 1}}>
            <SafeAreaView style={{flex: 1}}></SafeAreaView>
            <SafeAreaView style={{flex: 15, 
                backgroundColor: "#fff",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: "flex-start"
                }}>
                    <SafeAreaView style={{flex: 1, marginTop: 10, marginLeft: 10}}>
                    <TouchableOpacity
                        style={{ width: "100%" }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.textHeader}>{`< Thêm lịch bơm`}</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên lịch bơm</Text>
                            <TextInput style={styles.textInput} value={schedule.name}
                                onChangeText={value => setSchedule({...schedule, name: value})}></TextInput>
                        </SafeAreaView>

                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Bắt đầu</Text>
                            <SafeAreaView style={{flexDirection: "row", justifyContent: "center"}}>
                                {/* Date */}
                                <TextInput style={styles.textInputDateTime} value={dateString}
                                    onChangeText={value => {handleChangeDate(value)}}
                                >
                                </TextInput>
                                {/* Time */}
                                <TextInput style={styles.textInputDateTime} value={timeString}
                                    onChangeText={value => {handleChangeTime(value)}}
                                >
                                </TextInput>
                            </SafeAreaView>
                            
                        </SafeAreaView>

                        {/* body */}
                        
                        <SafeAreaView style={{flexDirection: "row"}}>
                            <SafeAreaView style={{marginTop: 10, flexDirection: "column", justifyContent:"space-between"}}>
                                <Text style={[styles.textContent, {
                                    marginBottom: 10
                                }]}>Lặp lại mỗi</Text>

                                <SafeAreaView style={{flexDirection: "row"}}>
                                    <NumericInput
                                        initValue={schedule.cycle}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                        onChange={itemValue => {
                                            setSchedule({...schedule, cycle: itemValue})
                                        }}
                                    />
                                    <View style = {[{
                                        width: 120,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {schedule.unit}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue, itemIndex) => setSchedule({...schedule, unit: itemValue})}
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
                                        initValue = {schedule.count}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                        onChange = {itemValue => {
                                            setSchedule({...schedule, count: itemValue})
                                        }}
                                    />
                                    <Text style={styles.textContent}>lần</Text>
                                </SafeAreaView>

                            </SafeAreaView>
                            
                        </SafeAreaView>

                        <SafeAreaView style={{marginTop: 10, marginRight: 10, flexDirection: "row", justifyContent: "flex-end"}}>
                                <TouchableOpacity style={{width: 100, height: 25, backgroundColor: "#e3dede", alignItems:"center", justifyContent: "center", borderRadius: 5, marginRight: 10}} 
                                    onPress={handleCancel}
                                >
                                    <Text style={{color: "#28554e"}}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: 100, height: 25, backgroundColor: "#28554e", alignItems:"center", justifyContent: "center", borderRadius: 5}} 
                                   onPress={handleAccept}
                                >
                                    <Text style={{color: "#fff"}}>Thêm</Text>
                                </TouchableOpacity>
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
    textInputDateTime : {
        borderColor: "#28554e",
        borderRadius: 5,
        borderWidth: 2,
        width: '35%',
        height: 30,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 10
    }
})
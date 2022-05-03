import {SafeAreaView, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity, View, Button} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback} from "react";
import NumericInput from "react-native-numeric-input";
import { useIsFocused } from "@react-navigation/native"
import policyService from "../services/policy";
import hardwareService from "../services/hardware"
import axios from "axios";
import hardware from "../services/hardware";

export default function AddPolicy({navigation}) {
    // const { hardwareId, gardenId } = route.params;
    const action = ["ON", "OFF"]
    const [sensor, setSensor] = useState([])
    const [hardware, setHardware] = useState([])
    const operator = [">", "<", ">=", "<=", "="]
    const logic = ["AND", "OR"]
    const [oldName, setOldName] = useState("")

    const gardenId = "0garden0"
    const hardwareId = "0lamp0"
    
    const [policy, setPolicy] = useState({
        name: "",
        logic: logic[0],
        action: action[0],
        limit: "",
        operatingTime: 0,
        expressions: []
    })

    const [oldPolicy, setOldPolicy] = useState({
        name: "",
        logic: logic[0],
        action: action[0],
        limit: "",
        operatingTime: 0,
        expressions: []
    })

    useEffect(() => {
        hardwareService.getAll(gardenId)
            .then(res => {
                const sensorData = res.data.filter(value => {
                    return value.type.match("Sensor")
                })
                setSensor(sensorData)
            })
            .catch(err =>
                console.log(err)    
            )
    }, [])

    const handleAddExpression = () => {
        // setCallAdd(previousState => !previousState
        setPolicy({...policy, expressions: [...policy.expressions, {
            sensorID: sensor[0].ID,
            operator: operator[ 0],
            rhsValue: 0
        }]})
    }

    const handleAccept = () => {
        console.log(policy)
        policyService.create({...policy, actuatorID: hardwareId})
    }

    const handleCancel = () => {
        setPolicy(oldPolicy)
    }

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
                        <Text style={styles.textHeader}>{`< Thêm chính sách mới`}</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên chính sách</Text>
                            <TextInput style={styles.textInput} value={policy.name}
                                onChangeText = {value => {
                                    setPolicy({...policy, name: value})
                                }}>
                            </TextInput>
                        </SafeAreaView>

                        <SafeAreaView style={{marginTop: 10, flexDirection: "row"}}>
                            <Text style={[styles.textContent,{marginRight: 10}]}>Điều kiện</Text>
                            <TouchableOpacity style={{width: 20, height: 20, backgroundColor: "#28554e", alignItems:"center"}} onPress={handleAddExpression} >
                                <Text style={{color: "#fff"}}>+</Text>
                            </TouchableOpacity>
                        </SafeAreaView>

                        {/* body */}
                        
                        <SafeAreaView style={{marginTop: 10, flexDirection: "row"}}>
                            <Text style={styles.textContent}>Máy bơm</Text>
                            <View style = {[{
                                width: 100,
                                marginLeft: 10,
                                marginRight: 10
                            }, styles.dropdown]}>
                                <Picker
                                    selectedValue = {policy.action}
                                    style ={{
                                        width: "100%"
                                    }}
                                    onValueChange = {itemValue => setPolicy({...policy, action: itemValue})}
                                >
                                    {action.map((item, index) => {
                                        return (
                                            <Picker.Item key={index} label={item === "ON" ? "Bật" : "Tắt"} value={item} color="#28554e"/>
                                        )
                                    })}
                                </Picker>
                            </View>
                            <Text style={styles.textContent}>trong</Text>
                            <NumericInput 
                                //value = {policy.number}
                                value = {policy.operatingTime}
                                totalWidth = {50}
                                totalHeight = {25}
                                minValue = {0}
                                onChange = {itemValue => {
                                    setPolicy({...policy, operatingTime: itemValue})
                                }}
                                borderColor = "#28554e"
                                rounded
                                inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5, marginLeft: 5}}
                                type = "up-down"
                            />

                            <Text style={styles.textContent}>khi</Text>
                        </SafeAreaView>
                        

                        <ScrollView style={{marginTop: 20}}>
                            {policy.expressions && policy.expressions.map((expressionItem, expressionIndex) => {
                                return (
                            <SafeAreaView key = {expressionIndex}>
                                {expressionIndex > 0 && 
                                <SafeAreaView style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginTop: 5}}>
                                    <View style = {[{
                                    width: 100,
                                    marginLeft: 10,
                                    marginRight: 10
                                    }, styles.dropdown]}>
                                    <Picker
                                        selectedValue = {policy.logic}
                                        style ={{
                                            width: "100%"
                                        }}
                                        onValueChange = {(itemValue) => setPolicy({...policy, logic: itemValue})}
                                    >
                                        {logic.map((item, index) =>  {
                                            return (
                                                <Picker.Item key={index} label={item === "AND" ? "Và" : "Hoặc"} value={item} color="#28554e"/>
                                            )
                                        })}
                                    </Picker>
                                </View>
                                </SafeAreaView>}
                                <SafeAreaView style={{flexDirection: "row", marginTop: 10}} >
                                    <View style = {[{
                                        width: 160,
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {expressionItem.sensorID}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue) => {
                                                let newArr = [...policy.expressions]
                                                newArr[expressionIndex].sensorID = itemValue
                                                setPolicy({...policy, expressions: newArr})
                                            }}
                                        >
                                            {sensor.map((value, index) => {
                                                return (
                                                    <Picker.Item key={index} label={value.name} value={value.ID} color="#28554e"/>
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                    
                                    <View style = {[{
                                        width: 78,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {expressionItem.operator}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue) => {
                                                let newArr = [...policy.expressions]
                                                newArr[expressionIndex].operator = itemValue
                                                setPolicy({...policy, expressions: newArr})
                                            }}
                                        >
                                            {operator.map((value, index) => {
                                                return (
                                                    <Picker.Item key={index} label={value} value={value} color="#28554e" />
                                                )
                                            })}
                                        </Picker>
                                    </View>

                                    <NumericInput 
                                        //value = {policy.number}
                                        value = {expressionItem.rhsValue}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        onChange = {itemValue => {
                                            let newArr = [...policy.expressions]
                                            newArr[expressionIndex].rhsValue = itemValue
                                            setPolicy({...policy, expressions: newArr})
                                        }}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                        
                                    />
                                    <TouchableOpacity style={{width: 25, height: 25, backgroundColor: "#28554e", alignItems:"center", borderRadius: 5}} onPress={() => {
                                        let temp = [...policy.expressions]
                                        temp.splice(expressionIndex, 1)
                                        setPolicy({...policy, expressions: temp})
                                    }} >
                                        <Text style={{color: "#fff"}}>-</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                                
                            </SafeAreaView>
                                )
                            })}
                            
                            <SafeAreaView style={{marginTop: 10, marginRight: 10, flexDirection: "row", justifyContent: "flex-end"}}>
                                <TouchableOpacity style={{width: 100, height: 25, backgroundColor: "#e3dede", alignItems:"center", justifyContent: "center", borderRadius: 5, marginRight: 10}} 
                                    onPress = {handleCancel}
                                >
                                    <Text style={{color: "#28554e"}}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: 100, height: 25, backgroundColor: "#28554e", alignItems:"center", justifyContent: "center", borderRadius: 5}} 
                                    onPress = {handleAccept}
                                >
                                    <Text style={{color: "#fff"}}>Thêm/Lưu</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </ScrollView>

                        

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
        fontWeight: "bold",
        color: "#28554e"
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
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
})
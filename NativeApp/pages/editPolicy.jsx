import {SafeAreaView, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity, View, Button} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect} from "react";
import NumericInput from "react-native-numeric-input";

import axios from "axios";
import http from "../services/http";

export default function EditPolicy({navigation}) {
    const action = ["ON", "OFF"]
    const sensor = ["Cam bien 1", "Cam bien 2", "Cam bien 3"]
    const operator = [">", "<", ">=", "<=", "="]
    const logic = ["AND", "OR"]
    
    const [policy, setPolicy] = useState({
        name: "",
        logic: "",
        action: "",
        limit: "",
        operatingTime: "",
        expression: []
    })


    const handleAddExpression = () => {
        // setCallAdd(previousState => !previousState
        setPolicy({...policy, expression: [...policy.expression, {
            sensorID: sensor[0],
            operator: operator[0],
            rhsValue: 0
        }]})
    }

    const handleClick = () => {
        console.log('a')
        axios.get('http://192.168.137.1:8080/api')
        .then((res) => {
            console.log(res.data)
            //setPolicy(res.data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Button
                onPress={handleClick}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
        </View>
    )

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
                        <Text style={styles.textHeader}>Thêm/chỉnh sửa chính sách</Text>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên chính sách</Text>
                            <TextInput style={styles.textInput} value={policy.name}
                                onChangeText={value => {
                                setPolicy({...policy, name: value})
                            }}></TextInput>
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
                            {policy.expression.length >0 && policy.expression.map((expressionItem, expressionIndex) => {
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
                                                let newArr = [...policy.expression]
                                                newArr[expressionIndex].sensorID = itemValue
                                                setPolicy({...policy, expression: newArr})
                                            }}
                                        >
                                            {sensor.map((value, index) => {
                                                return (
                                                    <Picker.Item key={index} label={value} value={value} color="#28554e"/>
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
                                                let newArr = [...policy.expression]
                                                newArr[expressionIndex].operator = itemValue
                                                setPolicy({...policy, expression: newArr})
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
                                            let newArr = [...policy.expression]
                                            newArr[expressionIndex].rhsValue = itemValue
                                            setPolicy({...policy, expression: newArr})
                                        }}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                        
                                    />
                                    <TouchableOpacity style={{width: 25, height: 25, backgroundColor: "#28554e", alignItems:"center", borderRadius: 5}} onPress={() => {
                                        let temp = [...policy.expression]
                                        temp.splice(expressionIndex, 1)
                                        setPolicy({...policy, expression: temp})
                                    }} >
                                        <Text style={{color: "#fff"}}>-</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                                
                            </SafeAreaView>
                                )
                            })}
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
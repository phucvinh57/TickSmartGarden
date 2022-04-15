import {SafeAreaView, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity, View} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState} from "react";
import NumericInput from "react-native-numeric-input";

export default function EditPolicy({navigation}) {
    const [callAdd, setCallAdd] = useState(true)
    const [input, setInput] = useState("")
    const [state, setState] = useState("Bật")
    const [sensors, setSensors] = useState(["Cam bien 1", "Cam bien 2", "Cam bien 3"])
    const [operators, setOperators] = useState([">", "<", ">=", "<=", "="])
    const [logic, setLogic] = useState("Và")
    
    const [policies, setPolicies] = useState([])

    const handleAddPolicy = () => {
        // setCallAdd(previousState => !previousState)
        setPolicies([...policies, {
            sensor: sensors[0],
            operator: operators[0],
            number: 0
        }])
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
                    <SafeAreaView style={{flex: 1, alignItems: "center", marginTop: 10}}>
                        <Text style={styles.textHeader}>Thêm/chỉnh sửa chính sách</Text>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên chính sách</Text>
                            <TextInput style={styles.textInput} value={input.policyName}
                                onChangeText={text => {
                                setInput(text)
                            }}></TextInput>
                        </SafeAreaView>

                        <SafeAreaView style={{marginTop: 10, flexDirection: "row"}}>
                            <Text style={[styles.textContent,{marginRight: 10}]}>Điều kiện</Text>
                            <TouchableOpacity style={{width: 20, height: 20, backgroundColor: "#28554e", alignItems:"center"}} onPress={handleAddPolicy} >
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
                                    selectedValue = {state}
                                    style ={{
                                        width: "100%"
                                    }}
                                    onValueChange = {(itemValue, itemIndex) => setState(itemValue)}
                                >
                                    <Picker.Item label="Bật" value="Bật" color="#28554e"/>
                                    <Picker.Item label="Tắt" value="Tắt" color="#28554e"/>
                                </Picker>
                            </View>
                            <Text style={styles.textContent}>khi</Text>
                        </SafeAreaView>
                        

                        <ScrollView style={{marginTop: 20}}>
                            {policies.map((policyItem, policyIndex) => {
                                return (
                            <SafeAreaView key = {policyIndex}>
                                {policyIndex > 0 && 
                                <SafeAreaView style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginTop: 5}}>
                                    <View style = {[{
                                    width: 105,
                                    marginLeft: 10,
                                    marginRight: 10
                                    }, styles.dropdown]}>
                                    <Picker
                                        selectedValue = {logic}
                                        style ={{
                                            width: "100%"
                                        }}
                                        onValueChange = {(itemValue) => setLogic(itemValue)}
                                    >
                                        <Picker.Item label="Và" value="Và" color="#28554e"/>
                                        <Picker.Item label="Hoặc" value="Hoặc" color="#28554e"/>
                                    </Picker>
                                </View>
                                </SafeAreaView>}
                                <SafeAreaView style={{flexDirection: "row", marginTop: 10}} >
                                    <View style = {[{
                                        width: 150,
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {policyItem.sensor}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue) => {
                                                let newArr = [...policies]
                                                newArr[policyIndex].sensor = itemValue
                                                setPolicies(newArr)
                                            }}
                                        >
                                            {sensors.map((value, index) => {
                                                return (
                                                    <Picker.Item key={index} label={value} value={value} color="#28554e"/>
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                    
                                    <View style = {[{
                                        width: 80,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }, styles.dropdown]}>
                                        <Picker
                                            selectedValue = {state}
                                            style ={{
                                                width: "100%"
                                            }}
                                            onValueChange = {(itemValue) => {
                                                let newArr = [...policies]
                                                newArr[policyIndex].operator = itemValue
                                                setPolicies(newArr)
                                            }}
                                        >
                                            {operators.map((value, index) => {
                                                return (
                                                    <Picker.Item key={index} label={value} value={value} />
                                                )
                                            })}
                                        </Picker>
                                    </View>

                                    <NumericInput 
                                        //value = {policy.number}
                                        value = {policyItem.number}
                                        totalWidth = {50}
                                        totalHeight = {25}
                                        minValue = {0}
                                        onChange = {value => {
                                            let newArr = [...policies]
                                            newArr[policyIndex].number = value
                                            setPolicies(newArr)
                                        }}
                                        borderColor = "#28554e"
                                        rounded
                                        inputStyle={{color: "#28554e", fontSize: 16, fontWeight: "bold"}}
                                        containerStyle = {{borderWidth: 2, borderColor: "#28554e", marginRight: 5}}
                                        type = "up-down"
                                        
                                    />
                                    <TouchableOpacity style={{width: 25, height: 25, backgroundColor: "#28554e", alignItems:"center", borderRadius: 5}} onPress={() => {
                                        let temp = [...policies]
                                        temp.splice(policyIndex, 1)
                                        setPolicies(temp)
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
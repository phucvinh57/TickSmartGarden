import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from 'expo-camera';
import { useState, useEffect } from "react";
import garden from "../services/garden";
import { useDispatch } from "react-redux";
import { addGarden } from "../redux/slices/garden";

export default function AddGarden() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type)
    const [input, setInput] = useState({
        name: "",
        description: "",
        imgurl: "",
        groupKey: "",
        adaUserName: "",
        adaUserKey: "",
    })
    const dispatch = useDispatch()

    function onPressButton() {
        garden.create({...input, useremail: "quanganh@gmail.com"}).then(res => {
            console.log(res.data)
            dispatch(addGarden(input))
        })
        
    }

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4,3],
    //         quality: 1
    //     })
    // }

    // useEffect(() => {
    //     (async () => {
    //       const { status } = await Camera.requestCameraPermissionsAsync();
    //       setHasPermission(status === 'granted');
    //     })();
    //   }, []);


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
                        <Text style={styles.textHeader}>Thêm khu vườn</Text>
                    </SafeAreaView>
                    <SafeAreaView style={{flex: 14, marginLeft: 20}}>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Tên khu vườn</Text>
                            <TextInput style={styles.textInput} value={input.name} onChangeText={text => {
                                setInput({...input, name: text})
                            }}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Mô tả khu vườn</Text>
                            <TextInput style={styles.textInput} defaultValue={input.description} onChangeText={text => {
                                setInput({...input, description: text})
                            }}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Hình ảnh</Text>
                            {/* <SafeAreaView style={{flexDirection: "row"}}>
                                <Button style={styles.butto} title="Chụp ảnh" onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    )
                                }}/>
                                <Button style={styles.button} title="Thêm ảnh" onPress={() => pickImage()}/>
                            </SafeAreaView> */}
                            <TextInput style={styles.textInput} defaultValue={input.imgurl} onChangeText={text => {
                                setInput({...input, imgurl: text})
                            }}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>GroupKey</Text>
                            <TextInput style={styles.textInput} defaultValue={input.key} onChangeText={text => {
                                setInput({...input, groupKey: text})
                            }}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Username</Text>
                            <TextInput style={styles.textInput} defaultValue={input.adaUserName} onChangeText={text => {
                                setInput({...input, adaUserName: text})
                            }}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Userkey</Text>
                            <TextInput style={styles.textInput} defaultValue={input.adaUserKey} onChangeText={text => {
                                setInput({...input, adaUserKey: text})
                            }}></TextInput>
                        </SafeAreaView>


                        <SafeAreaView style={{marginTop: 10}}>
                            <Button onPress={onPressButton} title="Add garden"/>
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
    }
})
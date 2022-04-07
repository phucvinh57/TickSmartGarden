import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from 'expo-camera';
import { useState, useEffect } from "react";

export default function AddGarden() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type)
    let input = {
        name: "",
        description: "",
        image: "",
        key: ""
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
    }

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);


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
                            <TextInput style={styles.textInput} defaultValue={input.name}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Mô tả khu vườn</Text>
                            <TextInput style={styles.textInput} defaultValue={input.description}></TextInput>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Hình ảnh</Text>
                            <SafeAreaView style={{flexDirection: "row"}}>
                                <Button style={styles.butto} title="Chụp ảnh" onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    )
                                }}/>
                                <Button style={styles.button} title="Thêm ảnh" onPress={() => pickImage()}/>
                            </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView style={{marginTop: 10}}>
                            <Text style={styles.textContent}>Key</Text>
                            <TextInput style={styles.textInput} defaultValue={input.key}></TextInput>
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
    },
    button: {

    }
})
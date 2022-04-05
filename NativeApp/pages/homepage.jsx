import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import Card from "../components/homepage/Card";
import BottomBar1 from "../components/BottomBar1";
import gardenData from "../components/homepage/gardenMockData.json";

export default function Homepage() {
    const [gardens, setGardens] = useState(gardenData);
    //console.log(gardens);
    return (
        <ImageBackground source ={require('../assets/homepageTree.png')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={{flex: 1}}>
                {/* HEADER */}
                <View style={{flex: 1, justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 4, marginLeft: 20, justifyContent: "space-around"}}>
                            <View>
                                <Text style={styles.textHeader2}>Xin chào Quang Anh</Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={styles.textHeader1}>Quản lý khu vườn</Text>
                                <Text style={styles.textHeader1}>của bạn</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.textHeader1}>Log Out</Text>
                        </View>
                    </View>
                </View>
                {/* CONTENT */}
                <View style={{flex: 4,
                    alignItems: "center",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: "#fff",
                    justifyContent: "center"}}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Text style={styles.textContent1}>
                            Danh sách vườn
                        </Text>
                    </View>
                    <View style={{flex: 8, alignItems:"center"}}>
                        <ScrollView style={{minWidth: 350, flex: 1}}>
                            {gardens.map((garden, index) => {
                                return (
                                    <Card key={index} garden={garden} />
                                )
                            })}

                        </ScrollView>
                    </View>
                </View>
                {/* BOTTOM BAR */}
            <BottomBar1 />
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        justifyContent: "center",
        flex: 1,
        opacity: 1
    },
    textHeader1: {
        color: "#eaf5ef",
        fontSize: 24
    },
    textHeader2: {
        color: "#eaf5ef",
        fontSize: 16
    },
    textContent1: {
        color: "#3d7e44",
        fontSize: 20,
        fontWeight: "bold"
    },
    textCard1: {
        color: "#3d7e44",
        fontSize: 16,
        fontWeight: "bold"
    },
})
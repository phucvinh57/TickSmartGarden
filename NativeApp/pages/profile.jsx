import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


export default function Profile({navigation}) {
    const {auth: {name, email, ada: {username, userkey}}} = useContext(AuthContext)

    return (
        <SafeAreaView style={{backgroundColor: '#28554e', flex: 1}}>
            <SafeAreaView style={{flex: 1}}></SafeAreaView>
            <SafeAreaView style={{
                flex: 15,
                backgroundColor: "#ffff",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: 'flex-start'
            }}>
                <SafeAreaView style={{flex: 1, marginLeft: 10}}>
                    <TouchableOpacity
                        style = {{width: "100%", marginTop: 10, marginLeft: 10}}
                        onPress = {() => navigation.goBack()}
                    >
                        <Text style={styles.textHeader}>{`< Thông tin tài khoản`}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView style={{flex: 12, marginLeft: 20}}>
                    <SafeAreaView style={{marginTop: 10}}>
                        <Text style={styles.textContent}>Tên người dùng</Text>
                        <Text style={styles.textContent2}>{name}</Text>
                    </SafeAreaView>

                    <SafeAreaView style={{marginTop: 10}}>
                        <Text style={styles.textContent}>Email người dùng</Text>
                        <Text style={styles.textContent2}>{email}</Text>
                    </SafeAreaView>

                    <SafeAreaView style={{marginTop: 10}}>
                        <Text style={styles.textContent}>Tài khoản ada</Text>
                        <Text style={styles.textContent2}>{username}</Text>
                    </SafeAreaView>

                    <SafeAreaView style={{marginTop: 10}}>
                        <Text style={styles.textContent}>Khoá ada</Text>
                        <Text style={styles.textContent2}>{userkey}</Text>
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
    textContent2: {
        fontSize: 16,
        fontWeight: "500",
        color: "#28554e",
        marginTop: 5
    }
})
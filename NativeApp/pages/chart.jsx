import { LineChart } from 'react-native-line-chart'
import {View, Text, Dimensions, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { DataTable } from 'react-native-paper'
import moment from 'moment'

export default function Chart({route, navigation}) {
    //const {username, feed_key, name} = route.params // TODO: truyen username va feed_key
    const {raw} = route.params
    console.log(item)
    const username = 'cudothanhnhan'
    const feed_key = 'tl-garden.sensor-temperature-0'
    const name = 'Độ ẩm'
    const limit = 10
    const isFocused = useIsFocused()

    const [data, setData] = useState([])
    const [log, setLog] = useState([])

    useEffect(() => {
        axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feed_key}/data?limit=${limit}`)
        .then(
            res => {
                let temp = res.data.map(item => item.value).reverse()
                setData(temp)
                setLog(res.data)
            }
        )
        .catch(err => console.log(err))
    }, [isFocused])

    if(data.length == 0 && log.length == 0) return <Text>Loading...</Text>
    return (
        <SafeAreaView style={{backgroundColor: "#28554e", flex: 1}}>
            <SafeAreaView style={{flex: 1}}></SafeAreaView>
            <SafeAreaView
                style = {{
                    flex: 15,
                    backgroundColor: "#ffff",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    justifyContent: 'flex-start'
                }}
            >
                <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity
                    style = {{width: "100%", marginTop: 10, marginLeft: 10}}
                    onPress = {() => navigation.goBack()}
                >
                    <Text style={styles.textHeader}>{`< Thống kê biểu đồ`}</Text>
                </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView style={{flex: 10, justifyContent: "flex-start", alignItems: 'center'}}>
                <LineChart
                data={{
                    labels: [1,2,3,4,5,6,7,8,9,10],
                    datasets: [{
                        data: data
                    }]
                    }}
                    width={0.9 * Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                    backgroundGradientFrom: '#3D7E44',
                    backgroundGradientTo: '#eaf5ef',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    }}
                />
                <Text style={styles.textContent}>Biểu đồ {name}</Text>
                <Text style={{color: '#898989'}}>Lịch sử hoạt động</Text>
                <ScrollView style={{minWidth: 350, flex: 1}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Thời gian</DataTable.Title>
                        <DataTable.Title>Giá trị</DataTable.Title>
                    </DataTable.Header>
                    {log.map((item, index) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{moment(new Date(item.created_at)).format('DD/MM/YYYY hh:mm:ss')}</DataTable.Cell>
                                <DataTable.Cell>{item.value}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
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
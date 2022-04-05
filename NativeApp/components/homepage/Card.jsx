import {View, Image, Text, StyleSheet} from 'react-native';

export default function Card() {
    return (
        <View style = {styles.card}>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Image source={{uri: "https://eskipaper.com/images/garden-wallpaper-2.jpg"}}
                style ={{width: "80%", height: "80%"}}
                />
            </View>
            <View style={{flex: 3, justifyContent: "space-evenly"}}>
                <Text style={styles.textCard}>Khu vuờn 1</Text>
                <Text>Khu vườn trồng cà chua</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textCard: {
        color: "#3d7e44",
        fontSize: 16,
        fontWeight: "bold"
    },
    card: {
        backgroundColor: "#eaf5ef",
        height: 80,
        width: '100%',
        flexDirection: "row",
        marginBottom: 20,
        
    }
})
import {View, Image, Text, StyleSheet} from 'react-native';

export default function Card(props) {
    const garden = props.garden
    return (
        <View style = {styles.card}>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Image source={{uri: garden.imgurl}}
                style ={{width: "80%", height: "80%"}}
                />
            </View>
            <View style={{flex: 3, justifyContent: "space-evenly"}}>
                <Text style={styles.textCard}>{garden.name}</Text>
                <Text>{garden.description}</Text>
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
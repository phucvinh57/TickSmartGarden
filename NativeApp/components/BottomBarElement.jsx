import { View, Image, StyleSheet, Text } from "react-native";

export default function BottomBarElement(props) {
    const icon = props.icon;
    const text = props.text;
    return (
        <View style={{justifyContent: "flex-end"}}>
            {/* Icon */}
            <Image source = {{uri: icon}} 
            style={{width: "100%", height: "50%"}}
                />
            {/* Text */}
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#3d7e44",
        fontSize: 14
    }
})
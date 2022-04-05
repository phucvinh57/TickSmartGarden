import { View } from "react-native";
import BottomBarElement from "./BottomBarElement";

export default function BottomBar1() {
    const icon = "https://www.apmedia.vn/wp-content/uploads/2018/02/Home-Icon.png";
    const text = "Home";
    return(
        <View style ={{
            flexDirection : "row",
            height: 80,
            justifyContent: "space-around",
            backgroundColor: "#fff"
        }}>
            <BottomBarElement icon = {icon} text = {text} />
            <BottomBarElement icon = {icon} text = {text} />
            <BottomBarElement icon = {icon} text = {text} />
            <BottomBarElement icon = {icon} text = {text} />
        </View>
    )
}
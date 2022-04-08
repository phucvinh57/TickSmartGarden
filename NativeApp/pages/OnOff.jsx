import React, { useState } from "react";
import { SafeAreaView, Switch } from "react-native";
import { connect } from "@taoqf/react-native-mqtt";
const userName = 'anhdn2511';
//const userKey = 'aio_qxxs12V7f47tbg3XBstFTRCqRSkh';
const userKey = '';
//const url = '';
const url = `mqtts://${userName}:${userKey}@io.adafruit.com`;
const client = connect(url);

export default function OnOff() {
    const topic = [userName, 'feeds','lamp-0'].join('/')
    client.on('connect', function() {
        client.subscribe(topic, function(err) {
            console.log('success')
        })
    })

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            client.publish(topic, '0');
        } else {
            client.publish(topic, '1');
        }
    };
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <SafeAreaView>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            </SafeAreaView>
        </SafeAreaView>
    )
}
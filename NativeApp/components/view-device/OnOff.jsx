import React, { useState, useEffect } from "react";
import { Switch } from "native-base";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "@taoqf/react-native-mqtt";

// --------------- AVAILABLE ---------------
const ADA_CLIENT = "phucnguyensolver";
const USER_KEY = "aio_Govv720CpibZcjwhDd6TszYAydYz";
const GROUP_KEY = "phucnguyensolver/groups/tl-garden";
const LAMP_FEED_KEY = "phucnguyensolver/feeds/tl-garden.lamp-0"; 



const getMqttConnection = (username, key) => {
  const url = `mqtts://${username}:${key}@io.adafruit.com`;
  console.log('new client')
  return connect(url)
}

const GardenGroup = require('./mqttClient');

function Onoff() {
  console.log("render Onoff");
  const [client, setClient] = useState(() => getMqttConnection(ADA_CLIENT, USER_KEY))
  const [isLoading, setIsLoading] = useState(true)
  const [isOn, setIsOn] = useState(null)

  const _initClient = () => {
    
    console.log("_initClient");
    if (client) {
      console.log("hello from client");
      client.on("connect", () => {
        console.log("connected");
        client.subscribe([LAMP_FEED_KEY], (err) => {
          if (err) {
            console.log("subscribe error");
          } else {
            console.log("subscribed");
          }
        });
      });
      client.on("error", () => console.log("connnection error"));
      client.on("message", handleMessageArrived);
    }
  };

  const handleMessageArrived = (topic, payload) => {
    const message = payload.toString();
    console.log({ topic, message });
    setIsOn(message == "1" ? true : false);
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      _initClient();
      const status = await fetchLastData(ADA_CLIENT, USER_KEY, LAMP_FEED_KEY);
      setIsOn(status == "0" ? false : true);
      setIsLoading(false);
    };
    fetchData().catch(console.log);
  }, []);

  const fetchLastData = async (_username, _adakey, _feedkey) => {
    // feedkey currently contains feedId and username
    const url = `https://io.adafruit.com/api/v2/${_feedkey}/data/last?x-aio-key=${_adakey}`;
    const response = await fetch(url);
    const status = await response.json();
    return status.value;
  };

  const handleToggle = () => {
    setIsLoading(true);
    console.log("TODO: handle toggle");
    const message = isOn ? "0" : "1";
    client.publish(LAMP_FEED_KEY, message);
    // console.log(`client.publish(${topic}, ${message})`);
    setIsOn(!isOn);
  };

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View>
          <Switch onToggle={handleToggle} isChecked={isOn}></Switch>
        </View>
      )}
    </View>
  );
}

export default Onoff;

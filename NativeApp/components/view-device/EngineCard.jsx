import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { DeviceTypeString } from "./utils";
import {
  Box,
  Container,
  VStack,
  Center,
  Heading,
  HStack,
  Switch,
  Image,
  Text,
  View,
} from "native-base";


const DEBUG_COLOR = {
  // PURPLE: "purple",
}

// const pump1 = {
//   name: "Máy bơm 1",
//   status: "Đang hoạt động",
//   type: "ActuatorLight", // in [ActuatorLight, ActuatorBump, SensorLight, SensorHumid, SensorTemperature]
//   isOn: true,
//   data: 30,
//   dataUnit: "*C",
// };

// ------------------- UTILS -------------------
const ActuatorPumpImage = require("../../assets/pump.png");
const ActuatorLightImage = require("../../assets/bulb.png");
const SensorHumidImage = require("../../assets/sensorHumid.png");
const SensorLightImage = require("../../assets/sensorLight.png");
const SensorTemperatureImage = require("../../assets/sensorTemperature.png");
const DefaultDeviceImage = require("../../assets/default.png");


const getImageInstance = (deviceType) => {
  switch (deviceType) {
    case DeviceTypeString.ActuatorPump:
      return ActuatorPumpImage;
    case DeviceTypeString.ActuatorLight:
      return ActuatorLightImage;
    case DeviceTypeString.SensorHumid: 
      return SensorHumidImage;
    case DeviceTypeString.SensorLight: 
      return SensorLightImage;
    case DeviceTypeString.SensorTemperature: 
      return SensorTemperatureImage;
    default:
      return DefaultDeviceImage;
  }
};

function EngineCard({ onToggle, device }) {
  // const [device, setDevice] = useState(pump1);
  return (
    <Box style={styles.container}>
      {/* <Text>Hello</Text> */}
      <VStack space={1}>
        <Text fontSize={"sm"} bold>
          {device.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View flex={9}>
            {/* <Text>Col1</Text> */}
            <Text fontSize="xs" noOfLines={1} lineHeight={15}>
              {device.status}
            </Text>
            <Text fontSize={"xs"} noOfLines={1}>
              {device.data &&
                device.dataUnit &&
                device.data + " " + device.dataUnit}
            </Text>
            <Container
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end", // switch here 
                backgroundColor: DEBUG_COLOR.PURPLE,
              }}
            >
              <Center>
              <Switch
                flex={1}
                size={"sm"}
                isChecked={device.isOn}
                onToggle={onToggle}
                onTrackColor="#2e9790"
              />

              </Center>
            </Container>
          </View>

          <View flex={5}>
            {/* <Text>Col2</Text> */}
            <Center>
              <Image
                style={styles.image}
                source={getImageInstance(device.type)}
                alt="device-image"
              />
            </Center>
          </View>
        </View>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf5ef",
    borderRadius: 5,
    paddingLeft: 5,
    paddingVertical: 2,
  },
  image: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});

export default EngineCard;

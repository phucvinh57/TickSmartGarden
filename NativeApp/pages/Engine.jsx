import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import EngineCard from "../components/view-device/EngineCard";
import {
  Box,
  CheckIcon,
  ChevronUpIcon,
  FlatList,
  HStack,
  Select,
  Text,
  View,
} from "native-base";

import { actuatorTypes, mockedGardenInfo, options } from "./data";
import { sleep } from "../components/view-device/utils";

const deviceTypeOptions = actuatorTypes;
const GardenGroup = require('../components/view-device/mqttClient');

function Engine() {
  console.log('render Engine')
  
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [deviceList, setDeviceList] = useState(null); // filter later
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    let mounted = true;
    const addClient = async () => {
      if (mounted) {
        GardenGroup.addClient(options, () => {
          setIsLoading(true)
          console.log('try addClient')
          sleep(200)
          setClient(GardenGroup.getFirstAdaClient())
          setDeviceList(mockedGardenInfo.hardware)
          setSelectedType(deviceTypeOptions[0].id)
          setIsLoading(false)
        })
      }
    }

    addClient().catch(console.log)
    return () => mounted = false
  }, []);

  const handleChangeDeviceType = (typeStr) => {
    console.log(`handleChangeDeviceType(${typeStr})`);
    setSelectedType(typeStr);
  };

  const DeviceTypeSelector = () => (
    <Box w="1/3">
      <Select
        selectedValue={selectedType}
        defaultValue={selectedType}
        onValueChange={handleChangeDeviceType}
        size="md"
        dropdownIcon={<ChevronUpIcon size="6" />}
        _selectedItem={{
          bg: "teal.600",
          backgroundColor: "#28554e",
          endIcon: <CheckIcon size="5" />,
        }}
      >
        {deviceTypeOptions.map(({ id, name }) => (
          <Select.Item key={id} value={id} label={name} />
        ))}
      </Select>
    </Box>
  );

  const _renderListItem = ({ item, index }) => (
    <View key={item.id} style={styles.flatListColumn}>
      <View style={index % 2 == 0 ? styles.listItemLeft : styles.listItemRight}>
        <EngineCard deviceInfo={item} client={client} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HStack space={3} style={styles.filterBar}>
        <Text fontSize="md">Lọc theo:</Text>
        <DeviceTypeSelector />
      </HStack>

      <View style={styles.flatListWrapper}>
        {isLoading && <ActivityIndicator size="large" color="red" />}
        {!isLoading && 
          <FlatList
            style={styles.flatList}
            data={deviceList}
            renderItem={_renderListItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        }
      </View>
    </View>
  );
}

export default Engine;

const DEBUG_COLOR = {
  WHITE: "white",
  // GRAY: "#555555",
  // PURPLE: "purple",
  // PINK: "pink",
  // RED: "red",
  // BLACK: "black",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DEBUG_COLOR.GRAY,
    width: "100%",
    height: "100%",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  filterBar: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flatListWrapper: {
    paddingVertical: 15,
    backgroundColor: DEBUG_COLOR.RED,
    justifyContent: "space-between",
    flex: 1,
  },
  flatListColumn: {
    width: "50%",
    height: 110,
    backgroundColor: DEBUG_COLOR.BLACK,
  },
  flatList: {
    backgroundColor: DEBUG_COLOR.PINK,
  },
  listItemLeft: {
    margin: 10,
    marginLeft: 0,
    flex: 1,
  },
  listItemRight: {
    margin: 10,
    marginRight: 0,
    flex: 1,
  },
});

// const [gardenInfo, setGardenInfo] = useState(mockedGardenInfo);
// const [devices, setDevices] = useState([])
// const _getFeedList = () => devices.map(x => x.feedKey)

// useEffect(() => {
//   const fetchGardenInfo = async() => {
//     setGardenInfo(_gardenInfo)
//     setDevices(_gardenInfo.hardware.filter(hw => (!hw.isSensorType)))
//   }

//   fetchGardenInfo().catch(console.log)
// }, []);

// const _initClient = () => {
//   console.log("_initClient");
//   if (client) {
//     console.log("hello from client");
//     client.on("connect", () => {
//       console.log("connected");
//       client.subscribe(_getFeedList(), (err) => {
//         if (err) {
//           console.log("subscribe error");
//         } else {
//           console.log("subscribed");
//         }
//       });
//     });
//     client.on("error", () => console.log("connnection error"));
//     client.on("message", handleMessageArrived);
//   }
// };

// const handleMessageArrived = (topic, payload) => {
//   console.log({ topic, payload });
//   payload = payload.toString();
//   const updatedDevices = devices.map(device => {
//     if (device.feedKey == topic) {
//       device.isOn = message == "1" ? true : false
//       device.isLoading = false
//     }
//     return device
//   })
//   setDevices(updatedDevices)
// }

// useEffect(() => {
//   const fetchData = async () => {
//     _initClient();
//     const updatedDevices = devices.map(device => {
  //       .isOn = (status == "0" ? false : true);
  //       const status = await fetchLastData(gardenInfo.adaclient, gardenInfo.userkey, device.feedKey);

//       if (device.feedKey == topic) {
//         device.isOn = message == "1" ? true : false
//         device.isLoading = false
//       }
//       return device
//     })
//     setDevices(updatedDevices)

//   };
//   fetchData().catch(console.log);
// }, []);


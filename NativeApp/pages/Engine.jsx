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
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import EngineCard from "../components/view-device/EngineCard";



const {
  sensorTypes,
  actuatorTypes,
  mockedSensorList,
  mockedEngineList,
} = require("./data");

const DEBUG_LOG = (value) => {
  // console.log(value)
  return value;
};

const DEBUG_COLOR = {
  WHITE: "white",

  // GRAY: "#555555",
  // PURPLE: "purple",
  // PINK: "pink",
  // RED: "red",
  // BLACK: "black",
};

function Engine() {
  const [deviceTypeOptions, setDeviceTypeOptions] = useState(sensorTypes);
  const [devices, setDevices] = useState(mockedSensorList);
  // const [deviceTypeOptions, setDeviceTypeOptions] = useState(actuatorTypes);
  // const [devices, setDevices] = useState(mockedEngineList);

  const [selectedType, setSelectedType] = useState(deviceTypeOptions[0].id);
  console.log({ selectedType });

  const handleToggleDevice = (deviceId) => {
    console.log(`Toggle deviceId: ${deviceId}`);
    // TODO: toggle device status
    // devices[deviceId].isOn = !devices[deviceId].isOn;
    let turnOn = !devices[deviceId].isOn;
    let name = devices[deviceId].name;
    alert(`Turn device ${turnOn ? "on" : "off"} - ${name}`);
  };

  const handleChangeDeviceType = (typeStr) => {
    alert(`Select [${typeStr}]`);
    setSelectedType(typeStr);
    // TODO: handleChangeDeviceType
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

  const renderListItem = ({ item, index }) => (
    <View
      key={item.id}
      style={{
        width: "50%",
        height: 110,
        backgroundColor: DEBUG_COLOR.BLACK,
      }}
    >
      <View style={index % 2 == 0 ? styles.listItemLeft : styles.listItemRight}>
        <EngineCard
          device={item}
          onToggle={() => handleToggleDevice(item.id)}
          selectedType={selectedType}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HStack space={3} style={styles.filterBar}>
        <Text fontSize="md">Lọc theo:</Text>
        <DeviceTypeSelector />
      </HStack>
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: DEBUG_COLOR.RED,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <FlatList
          style={styles.flatList}
          data={devices}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
}

export default Engine;

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

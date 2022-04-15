import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from "react-native";
import EngineCard from "./EngineCard"
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

import { GardenContext } from "../../contexts/GardenContext";
// import { GardenGroup } from "./mqttClient"
const GardenGroup = require ("./mqttClient")
import { actuatorTypes, sensorTypes, hardware } from "./data";

const deviceTypeOptions = actuatorTypes;

export default function ViewEngine({navigation}) {  
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [deviceList, setDeviceList] = useState(null); // filter later
  const [selectedType, setSelectedType] = useState(null);

  const garden = useContext(GardenContext);
  console.log({garden})

  useEffect(() => {
    let mounted = true;
    const addClient = async () => {
      if (mounted) {
        console.log('try add client')
        GardenGroup.addClient(garden.auth, () => {
          setIsLoading(true)
          setClient(GardenGroup.getAdaClient(garden.adaclient))
          setDeviceList(hardware)
          setSelectedType(deviceTypeOptions[0].id)
          setIsLoading(false)
        })
      }
    }

    addClient().catch(console.log)
    return () => mounted = false
  }, []);

  const handleChangeDeviceType = (typeStr) => {
    alert('select ' + typeStr)
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
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Root/MainApp/DeviceInfo')}>
        <View style={index % 2 == 0 ? styles.listItemLeft : styles.listItemRight}>
          <EngineCard deviceInfo={item} client={client} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View style={styles.container}>
      <HStack space={3} style={styles.filterBar}>
        <Text fontSize="md">Lọc theo:</Text>
        <DeviceTypeSelector />
      </HStack>

      <View style={styles.flatListWrapper}>
        {isLoading && <ActivityIndicator size="large" color="red" style={styles.loadingIcon}/>}
        {/* TODO: Text: Đang kết nối */}
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
  loadingIcon: {
    flex: 1,
  }
});
import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from "react-native";
import EngineCard from "./EngineCard"
import AppContainer from "../../components/AppContainer"
import {
  Box,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FlatList,
  HStack,
  Select,
  Text,
  View,
} from "native-base";

import { GardenContext } from "../../contexts/GardenContext";
import { actuatorTypes, sensorTypes, hardware } from "./data";
import { sleep } from "./utils";

const deviceTypeOptions = [...actuatorTypes, ...sensorTypes];

export default function ViewDevice({navigation}) {  
  const { adaClient } = useContext(GardenContext)

  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(deviceTypeOptions[0].id);
  const [deviceList, setDeviceList] = useState(null); // filter later


  useEffect(() => {
    setIsLoading(adaClient ? false : true)
  }, [adaClient]);

  useEffect(() => {
    setDeviceList(hardware.filter((hw) => {
      return hw.type == selectedType
    }))
    setIsLoading(false)
  }, [selectedType])
  
  const handleChangeDeviceType = (typeStr) => {
    setIsLoading(true)
    sleep(500).then(() => {
      setSelectedType(typeStr);
    })
  };

  const DeviceTypeSelector = () => (
    <View minW={150}>
      <Select
        selectedValue={selectedType}
        defaultValue={selectedType}
        onValueChange={handleChangeDeviceType}
        size="md"
        dropdownIcon={<ChevronDownIcon size="5" marginRight={3}/>}
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
    </View>
  );

  const _renderListItem = ({ item, index }) => (
    <View key={item.id} style={styles.flatListColumn}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Root/MainApp/DeviceInfo')}>
        <View style={index % 2 == 0 ? styles.listItemLeft : styles.listItemRight}>
          <EngineCard deviceInfo={item} client={adaClient} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <AppContainer title={
      <View style={{width: "100%"}}>
        <Text style={styles.textHeader}>
          Danh sách cảm biến
        </Text>
        <HStack space={3} style={styles.filterBar}>
          <Text fontSize="md">Lọc theo:</Text>
          <DeviceTypeSelector />
        </HStack>
      </View>
    }>
      <View>
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
    </AppContainer>
  );
}

const DEBUG_COLOR = {
  // WHITE: "white",
  // GRAY: "#555555",
  // PURPLE: "purple",
  // PINK: "pink",
  // RED: "red",
  // BLACK: "black",
};

const styles = StyleSheet.create({
  filterBar: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flatListWrapper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: DEBUG_COLOR.RED,
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
  },
  textHeader: {
    fontSize: 24,
    lineHeight: 28,
    color: "#de7067",
    fontWeight: "500",
  },
});
import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  CheckIcon,
  ChevronDownIcon,
  FlatList,
  Select,
  HStack,
} from "native-base";

import EngineCard from "./EngineCard";
import SliderList from "../../components/SliderList";
import AppContainer from "../../components/AppContainer";

import useLastData from '../../contexts/useLastData'
import { makeChunks } from "../../components/SliderList/util";
import { sleep } from "./utils";

import { hardware as hardwares } from "./data";

const deviceTypeOptions = [
  { id: "All", name: "Tất cả" },
  { id: "SensorLight", name: "Ánh sáng" },
  { id: "SensorHumid", name: "Độ ẩm" },
  { id: "SensorTemperature", name: "Nhiệt độ" },
  { id: "ActuatorLight", name: "Đèn" },
  { id: "ActuatorPump", name: "Máy bơm" },
];


export default function ViewDevice({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(deviceTypeOptions[0].id);

  // for display only
  const [chunks, setChunks] = useState([]);
  const windowWidth = useWindowDimensions().width - 40;
  useEffect(() => {
    let itemPerPage = 8;
    console.log(`hardwares.filter & done loading`)
    const arr = hardwares.filter((hw) => {
      return selectedType == "All" || hw.type == selectedType;
    });
    setChunks(makeChunks(arr, itemPerPage));
    setIsLoading(false);
  }, [selectedType]);

  const [feeds, setFeeds] = useState(() => {
    return hardwares.map(hw => hw.feedkey)
  })
  const [datum, publishMqtt] = useLastData(feeds)

  const onSwitchChange = (feed, value) => {
    // console.log(`onSwitchChange(${feed}, ${value})`)
    publishMqtt(feed, value)
  }

  return (
    <AppContainer
      title={
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Danh sách cảm biến</Text>
          <HStack space={3} style={styles.filterBar}>
            <Text fontSize="md">Loại thiết bị:</Text>
            <DropdownSelector 
              options={deviceTypeOptions}
              selectedValue={selectedType}
              onSelectedValueChange={setSelectedType}
            />
          </HStack>
        </View>
      }
    >
      <View>
        <View style={styles.flatListWrapper}>
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="red"
              style={styles.loadingIcon}
            />
          )}
          {!isLoading && (
            <SliderList
              data={chunks}
              windowWidth={windowWidth}
              renderer={(chunk) => (
                <FlatList
                  style={styles.flatList}
                  data={chunk}
                  numColumns={2}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <View
                      key={item.id}
                      style={[
                        styles.flatListColumn,
                        index % 2 == 0
                          ? styles.listItemLeft
                          : styles.listItemRight,
                      ]}
                    >
                      <EngineCard
                        deviceInfo={item} 
                        lastData={datum[item.feedkey]}
                        onPress={() => {
                          navigation.navigate("Root/MainApp/DeviceInfo");
                        }}
                        onSwitchChange={(value) => onSwitchChange(item.feedkey, value)}
                      />
                    </View>
                  )}
                />
              )}
            />
          )}
        </View>
      </View>
    </AppContainer>
  );
}

function DropdownSelector({selectedValue, onSelectedValueChange, options}) {
  return (
    <>
      <Select
        minWidth="140"
        size="md"
        selectedValue={selectedValue}
        defaultValue={selectedValue}
        onValueChange={onSelectedValueChange}
        dropdownIcon={<ChevronDownIcon size="5" marginRight={3} />}
        _selectedItem={{
          bg: "teal.600",
          backgroundColor: "#28554e",
          endIcon: <CheckIcon size="5" />,
        }}
      >
        {options.map(({ id, name }) => (
          <Select.Item key={id} value={id} label={name} />
        ))}
      </Select>
    </>
  )
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
    padding: 7,
    paddingLeft: 0,
  },
  listItemRight: {
    padding: 7,
    paddingRight: 0,
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

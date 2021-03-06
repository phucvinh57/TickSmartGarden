import { useState, useEffect } from "react";
import {
  Text,
  View,
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

import { ActuatorCard, SensorCard } from "./EngineCard";
import SliderList from "../../components/SliderList";
import AppContainer from "../../components/AppContainer";

import hardware from "../../services/hardware";
import { infers, makeChunks } from "./utils";


const deviceTypeOptions = [
  { id: "All", name: "Tất cả" },
  { id: "ActuatorLight", name: "Đèn" },
  { id: "ActuatorPump", name: "Máy bơm" },
  { id: "SensorLight", name: "Ánh sáng" },
  { id: "SensorHumid", name: "Độ ẩm" },
  { id: "SensorTemperature", name: "Nhiệt độ" },
];

export default function ViewDevice({ hardwares, datum, handlePress }) {  
  
  const [selectedType, setSelectedType] = useState(deviceTypeOptions[0].id);

  // for display only
  const [chunks, setChunks] = useState([]);
  const windowWidth = useWindowDimensions().width - 40;
  useEffect(() => {
    let itemPerPage = 8;
    const listOptionId = deviceTypeOptions.map(o => o.id)
    const arr = hardwares.filter((hw) => {
      if (selectedType == 'All') {
        return listOptionId.includes(hw.type)
      }
      return hw.type == selectedType;
    });
    setChunks(makeChunks(arr, itemPerPage));
  }, [selectedType]);

  
  const onSwitchChange = (_hardwareId, value) => {
    const turnOnNotOff = (value == "0")
    hardware.toggle(turnOnNotOff, _hardwareId).catch(console.error)
  }


  const renderFlatListItem = ({ item, index }) => {
    const {id, name, type, status, feedkey} = item;
    const isSensor = infers.inferIsSensorType(type)

    return (
    <View
      key={id}
      style={[
        styles.flatListColumn,
        index % 2 == 0
          ? styles.listItemLeft
          : styles.listItemRight,
      ]}
    >
      { isSensor ? 
        <SensorCard 
          lastData={datum[feedkey]}
          name={name}
          type={type}
          description={status}
          onPress={() => handlePress(id, true, item)}
        /> :
        <ActuatorCard 
          lastData={datum[feedkey]}
          name={name}
          type={type}
          description={status}
          onPress={() => handlePress(id, false)}
          onToggle={() => onSwitchChange(id, datum[feedkey])}
        />
      }
    </View>
  )}

  return (
    <AppContainer
      title={
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Danh sách thiết bị</Text>
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
            <SliderList
              data={chunks}
              windowWidth={windowWidth}
              renderer={(chunk) => (
                <FlatList
                  style={styles.flatList}
                  data={chunk}
                  numColumns={2}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderFlatListItem}
                />
              )}
            />
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
    // height: 110,
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

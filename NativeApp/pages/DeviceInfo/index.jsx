import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Box,
  Heading,
  FormControl,
  HStack,
  Input,
  AddIcon,
  Button,
  VStack,
} from "native-base";

import AppContainer from "../../components/AppContainer";
import SliderList from "../../components/SliderList";
import LogTable from "./LogTable";

import { mockPolicyList, mockSchedList, mockLogList } from "./data";
import { makeChunks } from "../../components/SliderList/util";
import hardware from "../../services/hardware";
import { GardenContext } from "../../contexts/GardenContext";

// function getLogList() {
//   return mockLogList.map((item) => ({
//     time: item.time,
//     activity: item.activity,
//   }));
// }

// const getSchedList = () =>
//   mockSchedList.map((item) => ({ name: item.name, description: item.cycle }));
// const getPolicyList = () =>
//   mockPolicyList.map((item) => ({ name: item.name, description: item.action }));

let defaultItem = {
  name: "$Máy bơm 1",
  operatingTime: 3,
  timeUnit: "$phút",
  scheds: [
    { name: "Bơm Chiều", timestamp: "17:35:15", cycle: 3, cycleUnit: "day" },
  ],
  logs: [],
  policies: [],
};

const adapter = {
  makeSched: ({ name, timestamp, cycle, cycleUnit }) => ({
    name: name,
    description: `${timestamp.slice(0, 5)} mỗi ${cycle} ${cycleUnit}`,
  }),
  // makePolicy: ({ name, turnOn }) => ({
  //   name: name,
  //   description: `${turnOn ? "Bật" : "Tắt"} mỗi ${cycle} ${cycleUnit}`,
  // }),
  makePolicy: (_item) => ({
    name: 'mockedName',
    description: 'mockedDescription'
  }),
  makeLog: (_item) => ({
    time: 'mockedTime',
    activity: 'mockedactivity'
  }),
};


export default function DeviceInfo({ route, navigation }) {
  console.log("hello DeviceInfo");

  const { hardwareId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [datum, setDatum] = useState(defaultItem);
  const { gardenInfo } = useContext(GardenContext);

  useEffect(() => {
    const fetchHardwareInfo = async () => {
      const gardenId = gardenInfo.ID;
      const response = await hardware.getById(hardwareId, gardenId);
      const item = await response.data
      console.log('====================================');
      // console.log(JSON.stringify(item, null, 2));
      console.log({item});
      console.log('====================================');

      const _datum = {
        name: item.name,
        operatingTime: item.operatingTime,
        timeUnit: item.timeUnit,
        scheds: item.scheds.map(adapter.makeSched),
        // logs: item.logs.map(makeLog),
        // policies: item.policies.map(makePolicy),
        // scheds: [],
        logs: [],
        policies: [],
      }
      setDatum(_datum)
      setIsLoading(false)
    };
    fetchHardwareInfo().catch(console.error);
  }, []);

  
  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width - 40;
  const scrollRef = useRef();

  const renderCardItems = (items) => {
    // <HStack justifyContent="space-between">
    return (
      <HStack justifyContent="flex-start">
        {items.map((item) => (
          <View key={item.name} style={styles.cardItem}>
            <Text style={styles.textTitle} numberOfLines={2}>
              {item.name}
            </Text>
            <Text color={styles.textContent} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        ))}
      </HStack>
    );
  };

  return (<>
    { isLoading && <ActivityIndicator></ActivityIndicator> }
    { !isLoading && <AppContainer
      title={
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => navigation.navigate("Root/MainApp/ViewEngine")}
        >
          <Text style={styles.textHeader}>{"< Thông tin máy bơm"}</Text>
        </TouchableOpacity>
      }
    >
      <View style={styles.appBody}>
        <ScrollView ref={scrollRef}>
          <VStack space={3}>
            <Box>
              <FormControl isReadOnly>
                <Heading style={styles.textHeading} size="sm">
                  Tên thiết bị
                </Heading>
                <Input
                  type="text"
                  placeholder="Máy bơm, Đèn ..."
                  value={datum.name}
                />
              </FormControl>

              <View flex={2}>
                <Heading style={styles.textHeading} size="sm">
                  Thời gian hoạt động
                </Heading>
                <HStack space={2} alignItems="center">
                  <View style={{ width: "70%", alignItems: "center" }}>
                    <Input
                      keyboardType="numeric"
                      value={String(datum.operatingTime)}
                    />
                  </View>
                  <Heading style={styles.textHeading} size="xs">
                    {datum.timeUnit}
                  </Heading>
                </HStack>
              </View>
            </Box>

            <Box>
              <HStack space={2}>
                <Heading style={styles.textHeading} size="sm">
                  Lịch bơm
                </Heading>
                <Button
                  size="xs"
                  onPress={() => {
                    // alert("Thêm Lịch bơm");
                    navigation.navigate('Root/MainApp/EditPolicy')
                  }}
                  style={{ backgroundColor: styles.active.color }}
                >
                  <AddIcon size="3" color="white" />
                </Button>
              </HStack>

              <SliderList
                data={makeChunks(datum.scheds, 3)}
                renderer={renderCardItems}
                // onItemPress={() => navigation.navigate('Root/MainApp/EditPolicy')}
                windowWidth={windowWidth}
              />
            </Box>

            <Box>
              <HStack space={2}>
                <Heading style={styles.textHeading} size="sm">
                  Chính sách
                </Heading>
                <Button
                  size="xs"
                  onPress={() => {
                    alert("Thêm Chính sách");
                    navigation.navigate("Root/MainApp/EditPolicy");
                  }}
                  style={{ backgroundColor: styles.active.color }}
                >
                  <AddIcon size="3" color="white" />
                </Button>
              </HStack>

              <SliderList
                data={makeChunks(datum.policies, 3)}
                renderer={renderCardItems}
                windowWidth={windowWidth}
              />
            </Box>

            <Box>
              <Heading style={styles.textHeading} size="sm">
                Lịch sử hoạt động
              </Heading>
              <LogTable
                data={datum.logs}
                itemsPerPage={5}
                onPageChange={() => scrollRef?.current.scrollToEnd({animated: true})}
              />
            </Box>
          </VStack>
        </ScrollView>
      </View>
    </AppContainer> }
  </>);
}

const DEBUG = {
  RED: "red",
  PINK: "pink",
  BLACK: "black",
  WHITE: "white",
};

const styles = StyleSheet.create({
  appBody: {
    width: "100%",
  },
  cardItem: {
    backgroundColor: "#eaf5ef",
    borderRadius: 7,
    width: "31%",
    marginRight: 5,
    marginVertical: 12,
    padding: 7,
  },
  textTitle: {
    color: "#28554e",
    fontSize: 15,
    fontWeight: "600",
  },
  textContent: {
    color: "#898989",
    fontSize: 15,
  },
  normalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeading: {
    color: "#7F4B1E",
    marginTop: 5,
  },
  active: {
    color: "#28554e",
  },
  textHeader: {
    fontSize: 24,
    lineHeight: 28,
    color: "#de7067",
    fontWeight: "500",
  },
});

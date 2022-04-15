import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Box,
  FormControl,
  HStack,
  Input,
  Switch,
  AddIcon,
  Button,
  Heading,
  View,
  VStack,
  Text,
  ScrollView,
} from "native-base";
import SliderList from "../SliderList";
import LogTable from "./LogTable";

import { mockPolicyList, mockSchedList, mockLogList } from "./data";
import { makeChunks } from "./util";

function getLogList() {
  return mockLogList.map((item) => ({
    time: item.time,
    activity: item.activity,
  }));
}

const getSchedList = () =>
  mockSchedList.map((item) => ({ name: item.name, description: item.cycle }));
const getPolicyList = () =>
  mockPolicyList.map((item) => ({ name: item.name, description: item.action }));

export default function DeviceInfo({ navigation }) {
  console.log("hello DeviceInfo");

  const [schedList, setSchedList] = useState(makeChunks(getSchedList(), 3));
  const [policyList, setPolicyList] = useState(makeChunks(getPolicyList(), 3));
  const [logList, setLogList] = useState(getLogList());

  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width - 40;
  
  const renderCardItems = (items) => {
    return (
      <HStack justifyContent="space-between">
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

  return (
    <View style={{marginTop: 25}}>
    <ScrollView>
      <VStack style={styles.container} space={3}>
        <Box>
          <FormControl isReadOnly>
            <Heading style={styles.textHeading} size="sm">
              Tên thiết bị
            </Heading>
            <Input type="text" placeholder="Máy bơm, Đèn ..." />
          </FormControl>

          <HStack
            style={{
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 2 }}>
              <Heading style={styles.textHeading} size="sm">
                Thời gian hoạt động
              </Heading>
              <HStack
                space={2}
                style={{ alignItems: "center", backgroundColor: DEBUG.WHITE }}
              >
                <View style={{ width: "70%", alignItems: "center" }}>
                  <Input keyboardType="numeric" placeholder="123456" />
                </View>
                <Heading style={styles.textHeading} size="xs">
                  Phút
                </Heading>
              </HStack>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Heading style={styles.textHeading} size="sm">
                Bật/Tắt
              </Heading>
              <Switch size="sm" onToggle={() => {}} isChecked={true} />
            </View>
          </HStack>
        </Box>

        <Box>
          <HStack space={2}>
            <Heading style={styles.textHeading} size="sm">
              Lịch bơm
            </Heading>
            <Button
              size="xs"
              onPress={() => {
                alert("Thêm Lịch bơm");
              }}
              style={{ backgroundColor: styles.active.color }}
            >
              <AddIcon size="3" color="white" />
            </Button>
          </HStack>

          <SliderList
            data={schedList}
            renderer={renderCardItems}
            dotColor="#28554E"
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
              }}
              style={{ backgroundColor: styles.active.color }}
            >
              <AddIcon size="3" color="white" />
            </Button>
          </HStack>

          <SliderList
            data={policyList}
            renderer={renderCardItems}
            dotColor="#28554E"
            windowWidth={windowWidth}
          />
        </Box>

        <Box>
          <Heading style={styles.textHeading} size="sm">
            Lịch sử hoạt động
          </Heading>
          <LogTable data={logList} itemsPerPage={5} />
        </Box>
      </VStack>
    </ScrollView>
    </View>
  );
}

const DEBUG = {
  // RED: "red",
  // PINK: "pink",
  // BLACK: "black",
  // WHITE: "white",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // backgroundColor: DEBUG.PINK,
    // marginHorizontal: 20,
    // marginTop: 25,
    paddingHorizontal: 20,
    // paddingTop: 25,
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
});

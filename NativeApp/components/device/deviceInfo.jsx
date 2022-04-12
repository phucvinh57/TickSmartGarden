import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { DataTable } from "react-native-paper";
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
  FlatList,
} from "native-base";
import SliderList from "./SliderList";
import TestTable from "./TestTable";

import { mockPolicyList, mockSchedList, mockLogList } from "./data";
import { makeChunks } from "./util";

function getLogList() {
  return mockLogList.map((item) => ({
    time: item.time,
    activity: item.activity,
  }));
}

const getSchedList = () => (
  mockSchedList.map(
    item => ({name: item.name, description: item.cycle})
  )
)
const getPolicyList = () => (
  mockPolicyList.map(
    item => ({name: item.name, description: item.action})
  )
)


export default function DeviceInfo({ navigation }) {
  console.log('hello DeviceInfo')

  const [schedList, setSchedList] = useState(makeChunks(getSchedList(), 3));
  const [policyList, setPolicyList] = useState(makeChunks(getPolicyList(), 3));
  const [logList, setLogList] = useState(getLogList());

  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width - 40;

  const renderCardItems = (items) => {
    console.log(`hello renderItems with ${items.length} items`)
    return <HStack justifyContent="space-between">
      {items.map((item) => (
        <View key={item.name} style={{
          backgroundColor: "#eaf5ef",
          borderRadius: 5,
          width: '31%',
          marginRight: 5,
          marginVertical: 10,
          padding: 10,
        }}>
          <Text color={"#28554e"} fontSize="xs">
            {item.name}
          </Text>
          <Text color={"#898989"} fontSize="xs">
            {item.description}
          </Text>
        </View>
      ))}
    </HStack>
  }

  const renderRowItems = (items) => <>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>
          <Heading size="xs">Thời gian</Heading>
        </DataTable.Title>
        <DataTable.Title>
          <Heading size="xs">Hoạt động</Heading>
        </DataTable.Title>
      </DataTable.Header>
      { items.map(item => (
        <DataTable.Row>
          <DataTable.Cell>{item.time}</DataTable.Cell>
          <DataTable.Cell>{item.activity}</DataTable.Cell>
        </DataTable.Row>
      )) }
    </DataTable>
  </>
  
  return (
    <SafeAreaView>
      <VStack style={styles.container}>
        <VStack space={1}>
          <FormControl isReadOnly>
            <Heading size="sm">Tên thiết bị</Heading>
            <Input type="text" placeholder="Máy bơm, Đèn ..." />
          </FormControl>
          
          <HStack style={{
            justifyContent: 'space-between'
          }}>
            <View style={{flex: 2}}>
              <Heading size="sm">Thời gian hoạt động</Heading>
              <HStack space={2} style={{alignItems: 'center', backgroundColor: DEBUG.WHITE}}>
                <View style={{width:'70%', alignItems: 'center'}}>
                  <Input keyboardType="numeric" placeholder="123456" />
                </View>
                <Heading size="sm">Phút</Heading>
              </HStack>
            </View>
            <View style={{flex:1, alignItems: 'center'}}>
              <Heading size="sm">Bật/Tắt</Heading>
              <Switch size="sm" onToggle={() => {}} isChecked={true}/>
            </View>
          </HStack>
        </VStack>

        <Box>
          <HStack space={2}>
            <Heading size="sm">Lịch bơm</Heading>
            <Button size="xs" padding={1} onPress={() => {}}>
              <AddIcon size="3" color="white" />
            </Button>
          </HStack>

          <SliderList
            data={schedList}
            renderer={renderCardItems}
            dotColor='green'
            windowWidth={windowWidth}
          />
        </Box>

        <Box>
          <HStack space={2}>
            <Heading size="sm">Chính sách</Heading>
            <Button size="xs" padding={1} onPress={() => {}}>
              <AddIcon size="3" color="white" />
            </Button>
          </HStack>

          <SliderList
            data={policyList}
            renderer={renderCardItems}
            dotColor='green'
            windowWidth={windowWidth}
          />
        </Box>

        <Box>
          <Heading size="sm">Lịch sử hoạt động</Heading>
          <TestTable data={logList} itemsPerPage={3}/>
        </Box>
      </VStack>
    </SafeAreaView>
  );
}

const DEBUG = {
  // RED: 'red',
  // PINK: 'pink',
  // BLACK: 'black',
  // WHITE: 'white',
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: "space-evenly",
    backgroundColor: DEBUG.PINK,
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    paddingTop: 30, 
  },
  normalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // cardItem: 
});

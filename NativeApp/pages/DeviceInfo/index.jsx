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
import { makeChunks } from "../../components/SliderList/util";

import hardware from "../../services/hardware";
import schedule from "../../services/schedule";
import policy from "../../services/policy";
import logger from "../../services/logger";
import { AuthContext } from "../../contexts/AuthContext";
import { useIsFocused } from "@react-navigation/native";


export default function DeviceInfo({ route, navigation }) {
  const {auth} = useContext(AuthContext)

  const { hardwareId, gardenId } = auth;

  function en2vn(str) {
    const ens = ['min', 'hour', 'day', 'week', 'month', 'ON', 'OFF']
    const vns = ['phút', 'giờ', 'ngày', 'tuần', 'tháng', 'Bật', 'Tắt']
    return vns[ens.indexOf(str)]
  }

  const navigateToSchedule = (schedule) => {
    navigation.navigate("Root/MainApp/EditSchedule", {
      raw: schedule
    });
  }

  const navigateToPolicy = (policy) => {
    navigation.navigate("Root/MainApp/EditPolicy", {
      raw: policy
    });
  }
  
  const [loadedName, setLoadedName] = useState(false);
  const [loadedSched, setLoadedSched] = useState(false);
  const [loadedPolicy, setLoadedPolicy] = useState(false);
  const [loadedLog, setLoadedLog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [datum, setDatum] = useState({
    name: "Thiết bị",
    operatingTime: -1,
    timeUnit: "--",
    scheds: [],
    logs: [],
    policies: [],
  });

  const handleUpdateInfo = () => {
    console.log('====================================');
    console.log(hardwareId, datum.name, datum.operatingTime);
    console.log('====================================');
    hardware.update(hardwareId, datum.name, datum.operatingTime).catch(console.error)
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchHardwareInfo = async () => {
      const response = await hardware.getById(hardwareId, gardenId);
      const item = await response.data
      setDatum(lastdatum => ({
        ...lastdatum,
        name: item[0]?.hardwareName,
        operatingTime: item[0]?.operatingTime,
        timeUnit: 'phút',
      }))
      setIsLoading(false)
      setLoadedName(true)
    };
    fetchHardwareInfo().catch(console.error);
  }, [isFocused]);

  useEffect(() => {
    if (!loadedName) return
    const makeSched = (raw) => {
      const { name, startTime, cycle, unit } = raw
      const hour = new Date(startTime)?.getHours()?.toString()
      const min  = new Date(startTime)?.getMinutes()?.toString()
      return ({
        name: name,
        description: `${hour}:${min} mỗi ${cycle} ${en2vn(unit)}`,
        onPress: () => navigateToSchedule(raw)
      });
    }
  
    const fetchSchedList = async () => {
      const response = await schedule.get(hardwareId);
      const item = await response.data
      setDatum(lastdatum => ({
        ...lastdatum,
        scheds: [...item].map(makeSched)
      }))
      setLoadedSched(true)
    };
    fetchSchedList().catch(console.error);
  }, [loadedName, isFocused]);

  
  useEffect(() => {
    if (!loadedName) return
    const makeLog = ({ time, activity }) => {
      const dateString = new Date(time).toLocaleDateString('vn-VN') || '--'
      const timeString = new Date(time).toLocaleTimeString('vn-VN') || '--'
      return ({
        time: dateString + ' ' + timeString,
        activity: activity,
      });
    }
  
    const fetchLogList = async () => {
      const response = await logger.getById(hardwareId);
      const item = await response.data
      setDatum(lastdatum => ({
        ...lastdatum,
        logs: [...item].map(makeLog)
      }))
      setLoadedLog(true)
    };
    fetchLogList().catch(console.error);
  }, [loadedName]);


  useEffect(() => {
    if (!loadedName) return
    const makePolicy = (raw) => {
      const { name, action } = raw;
      return ({
        name: name,
        description: `${en2vn(action)} ${datum.name}`,
        onPress: () => navigateToPolicy(raw)
      });
    }
  
    const fetchPolicyList = async () => {
      const response = await policy.getById(hardwareId);
      const item = await response.data
      setDatum(lastdatum => ({
        ...lastdatum,
        policies: [...item].map(makePolicy)
      }))
      setLoadedPolicy(true)
    };
    fetchPolicyList().catch(console.error);
  }, [loadedName, isFocused]);

  
  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width - 40;
  const scrollRef = useRef();

  const renderCardItems = (items) => {
    return (
      <HStack justifyContent="flex-start">
        {items.map((item) => (
          <View key={item.name} style={styles.cardItem}>
            <TouchableOpacity onPress={item.onPress} style={styles.cardItemInner}>
            <Text style={styles.textTitle} numberOfLines={2}>
              {item.name}
            </Text>
            <Text color={styles.textContent} numberOfLines={2}>
              {item.description}
            </Text>
          </TouchableOpacity>
          </View>
        ))}
      </HStack>
    );
  };

  return (<>
    { isLoading && <CustomActivityIndicator />}
    { !isLoading && <AppContainer
      title={
        loadedName ?
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textHeader}>{"< Thông tin " + datum.name}</Text>
        </TouchableOpacity>
        : <Text> {"------"} </Text>
      }
    >
      <View style={styles.appBody}>
        <ScrollView ref={scrollRef}>
          <VStack space={3}>
            { !loadedName ? <CustomActivityIndicator /> :
            <Box>
              <FormControl>
                <Heading style={styles.textHeading} size="md">
                  Tên thiết bị
                </Heading>
                <Input
                  // type="text"
                  keyboardType="text"
                  placeholder="Máy bơm, Đèn ..."
                  defaultValue={datum.name}
                  size="lg"
                  onChangeText={(text) => setDatum({
                    ...datum,
                    name: text,
                  })}
                />
              </FormControl>

              <View flex={2}>
                <Heading style={styles.textHeading} size="md">
                  Thời gian hoạt động
                </Heading>
                <HStack alignItems="center" justifyContent="space-between">
                <HStack space={2} alignItems="center">
                  <View style={{ width: "50%", alignItems: "center" }}>
                    <Input
                      keyboardType="numeric"
                      defaultValue={String(datum.operatingTime)}
                      size="lg"
                      onChangeText={(text) => {
                        setDatum({
                          ...datum,
                          text
                        })
                      }}
                    />
                  </View>
                  <Heading style={styles.textHeading} size="xs">
                    {datum.timeUnit}
                  </Heading>
                </HStack>
                {/* <Text>FU</Text> */}
                <TouchableOpacity style={{width: 90, height: 40, backgroundColor: "#28554e", alignItems:"center", justifyContent: "center", borderRadius: 5}} 
                    onPress={handleUpdateInfo}
                >
                    <Text style={{color: "#fff"}}>Lưu</Text>
                </TouchableOpacity>

                </HStack>
              </View>
            </Box>}

            { !loadedSched ? <CustomActivityIndicator /> :
            <Box>
              <HStack space={2}>
                <Heading style={styles.textHeading} size="md">
                  Lịch bơm
                </Heading>
                <Button
                  size="xs"
                  onPress={() => navigation.navigate("Root/MainApp/AddSchedule")}
                  style={{ backgroundColor: styles.active.color }}
                >
                  <AddIcon size="3" color="white" />
                </Button>
              </HStack>

              <SliderList
                data={makeChunks(datum.scheds, 3)}
                renderer={renderCardItems}
                windowWidth={windowWidth}
              />
            </Box>}

            { !loadedPolicy ? <CustomActivityIndicator /> :
            <Box>
              <HStack space={2}>
                <Heading style={styles.textHeading} size="md">
                  Chính sách
                </Heading>
                <Button
                  size="xs"
                  onPress={() => navigation.navigate("Root/MainApp/AddPolicy")}
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
            </Box>}

            { !loadedLog ? <CustomActivityIndicator /> :
            <Box>
              <Heading style={styles.textHeading} size="md">
                Lịch sử hoạt động
              </Heading>
              <LogTable
                data={datum.logs}
                itemsPerPage={5}
                onPageChange={() => scrollRef?.current.scrollToEnd({animated: true})}
              />
            </Box>}
          </VStack>
        </ScrollView>
      </View>
    </AppContainer> }
  </>);
}

const CustomActivityIndicator = () => {
  return <ActivityIndicator />
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
    paddingVertical: 12,
  },
  cardItemInner: {
    flex:1,
    justifyContent: "space-between",
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

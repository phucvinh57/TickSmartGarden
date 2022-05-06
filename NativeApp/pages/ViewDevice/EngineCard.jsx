import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { infers, sleep } from "./utils";
import {
  Container,
  VStack,
  Center,
  Switch,
  Image,
  Text,
  View,
} from "native-base";
import { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext"
import logger from "../../services/logger";

function EngineCard({ deviceInfo, lastData, onPress, onSwitchChange }) {
  const {
    name,
    type,
    status: description,
  } = deviceInfo;
  
  const isSensor = infers.inferIsSensorType(type)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(lastData ? false : true);
  }, [lastData]);


  const {auth} = useContext(AuthContext);

  const onToggle = () => {
    if (lastData === null) return
    if (onSwitchChange instanceof Function) {
      (async () => {
        setIsLoading(true)
        onSwitchChange(lastData == "1" ? "0" : "1")
        // const msg = (lastData == "1") ? "Tắt" : "Bật"
        // console.log('====================================');
        // console.log(`${auth.hardwareId} -> ${msg}`);
        // console.log('====================================');
        // const response = await logger.create(auth.hardwareId, `${msg} bởi người dùng`)
        // console.log('====================================');
        // console.log(response.data);
        // console.log('====================================');
      })().catch(console.error)
    }
  };

  if (isSensor) {
    return (
      <SensorCard
        isLoading={isLoading}
        lastData={lastData}
        name={name}
        type={type}
        description={description}
        onPress={onPress}
      />
    );
  } else {
    return (
      <ActuatorCard
        isLoading={isLoading}
        lastData={lastData}
        name={name}
        type={type}
        description={description}
        onToggle={onToggle}
        onPress={onPress}
      />
    );
  }
}

// ------------------- SENSOR -------------------

function SensorCard({ isLoading, lastData, name, type, description, onPress }) {
  const sensorValue = parseInt(lastData) || null;

  return (
    <TouchableOpacity onPress={onPress}>
    <VStack style={styles.container}>
      <Text fontSize={"sm"} bold>
        {name}
      </Text>
      <View style={styles.cardBody} flex="1">
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="sm" flexShrink={1} mb=".3em">
            {description}
          </Text>
          <View>
              {isLoading && <ActivityIndicator size="small" color="red" />}
              {!isLoading && (
                <Text fontSize="md" style={styles.sensorValue}>
                  {`${sensorValue}${infers.inferDataUnit(type)}`}
                </Text>
              )}
          </View>
        </View>

        <View flex={5}>
          {/* <Text>Col2</Text> */}
          <Center>
            <Image
              style={styles.image}
              source={infers.inferDeviceImage(type)}
              alt="device-image"
            />
          </Center>
        </View>
      </View>
    </VStack>
    </TouchableOpacity>
  );
}

// ------------------- ACTUATOR -------------------

function ActuatorCard({
  isLoading,
  lastData,
  name,
  type,
  description,
  onToggle,
  onPress,
}) {
  const isOn = lastData == "1" ? true : false;

  return (
    <TouchableOpacity onPress={onPress}>
    
    <VStack style={styles.container}>
      <Text fontSize={"sm"} bold>
        {name}
      </Text>
      <View style={styles.cardBody} flex="1">
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="sm" flexShrink={1} mb=".3em">
            {description}
          </Text>
          {/* <View>
              {isLoading && <ActivityIndicator size="small" color="red" />}
              {!isLoading && (
                <Text fontSize="md" style={styles.sensorValue}>
                  {`${sensorValue}${infers.inferDataUnit(type)}`}
                </Text>
              )}
          </View> */}
          <View alignItems="flex-start" 
          style={{
            // backgroundColor: "green",
            justifyContent: "center",
            height: 20,
          }}
          >
              {isLoading && <ActivityIndicator size="small" color="red" />}
              {!isLoading && (
                <Switch
                  onToggle={onToggle}
                  isChecked={isOn}
                  onTrackColor="#2e9790"
                  flex={1}
                  size="sm"
                />
              )}
            </View>
        </View>

        <View flex={5}>
          {/* <Text>Col2</Text> */}
          <Center>
            <Image
              style={styles.image}
              source={infers.inferDeviceImage(type)}
              alt="device-image"
            />
          </Center>
        </View>
      </View>
    </VStack>
    </TouchableOpacity>
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
    flex: 1,
    backgroundColor: "#eaf5ef",
    borderRadius: 8,
    padding: 10,
  },
  cardBody: {
    flexDirection: "row",
    backgroundColor: DEBUG.PINK,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    backgroundColor: DEBUG.WHITE,
    width: 50,
    height: 50,
  },
  sensorValue: {
    color: "#28554e",
    // fontSize: 14,
    fontWeight: "bold",
  },
});

export default EngineCard;

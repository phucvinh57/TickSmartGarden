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
import { useState, useEffect } from "react";

function EngineCard({ deviceInfo, lastData, onPress, onSwitchChange }) {
  const {
    name,
    type,
    status: description,
    isSensorType: isSensor,
  } = deviceInfo;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(lastData ? false : true);
  }, [lastData]);

  const onToggle = () => {
    if (lastData === null) return
    if (onSwitchChange instanceof Function) {
      (async () => {
        setIsLoading(true)
        onSwitchChange(lastData == "1" ? "0" : "1")
      })().catch(console.error)
    }
  };

  // const onPress = () => {
  //   if (onPress instanceof Function) {
  //     onPress()
  //   }
  // }

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
    <VStack style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text fontSize={"sm"} bold>
          {name}
        </Text>
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="xs" flexShrink={1}>
          {/* <Text fontSize="xs" numberOfLines={2} flex={1}> */}
            {description}
          </Text>
          <Container
            flex={1}
            style={{
              justifyContent: "space-around",
            }}
          >
            <View>
              {isLoading && <ActivityIndicator size="small" color="red" />}
              {!isLoading && (
                <Text fontSize="xs" flex={1} style={styles.sensorValue}>
                  {`${sensorValue}${infers.inferDataUnit(type)}`}
                </Text>
              )}
            </View>
          </Container>
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
    <VStack style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text fontSize={"sm"} bold>
          {name}
        </Text>
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="xs" flexShrink={1}>
          {/* <Text fontSize="xs" numberOfLines={2} flex={1}> */}
            {description}
          </Text>
          <Container
            flex={1}
            style={{
              justifyContent: "space-around",
            }}
          >
            <View>
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
          </Container>
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
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default EngineCard;

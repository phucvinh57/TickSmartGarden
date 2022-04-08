import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
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


function EngineCard({ deviceInfo, client }) {
  const { name, type, status: description, isSensorType: isSensor, feedkey: feedKey } = deviceInfo;
  
  return <SensorCard client={client} feedKey={feedKey} name={name} type={type} description={description} />;
  // if (isSensor) {
  //   return <SensorCard client={client} feedKey={feedKey} name={name} type={type} description={description} />;
  // }
  //  else {
  //   return <EngineCard client={client} feedKey={feedKey} name={name} type={type} description={description} />;
  // }
}

// ------------------- SENSOR -------------------

function SensorCard({ client, feedKey, name, type, description}) {
  const [isLoading, setIsLoading] = useState(true);
  const [sensorValue, setSensorValue] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchInitValue = async () => {
      if (mounted) {
        setIsLoading(true);
        if (client) {
          client.sub(feedKey, handleMessageArrived)
          const data = await client.fetchLastData(feedKey)
          setSensorValue(data)
          setIsLoading(false);
        } else {
          console.log('client is null')
        }
      }
    };
    
    fetchInitValue().catch(console.log);
    return () => mounted = false
  }, [client]);
  

  const handleMessageArrived = (topic, payload) => {
    let value;
    try {
      value = parseInt(payload.toString())
    } catch {
      value = null
    }
    setSensorValue(value)
    setIsLoading(false);
  }
  
  return (
    <VStack style={styles.container}>
      <Text fontSize={"sm"} bold>
        {name}
      </Text>
      <View style={styles.cardBody}>
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="xs" noOfLines={1} flex={1}>
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
                <Text fontSize="xs" noOfLines={1} flex={1} style={styles.sensorValue}>
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
  )
}


// ------------------- ACTUATOR -------------------

function ActuatorCard({ name, type, description, isSensor, feedKey, username }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setIsOn] = useState(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      setIsLoading(true);
      await sleep(1000);
      console.log("TODO: fetchDeviceInfo");
      const status = await getLastData();
      setIsOn(status == "0" ? false : true);
      setIsLoading(false);
    };

    fetchDeviceInfo().catch(console.log);
  }, []);

  const handleToggle = () => {
    (async () => {
      setIsLoading(true);
      console.log("TODO: handleToggle");
      await sleep(1000);
      setIsLoading(false);
      setIsOn(!isOn);
    })().catch(console.log);
  };

  return (
    <VStack style={styles.container}>
      <Text fontSize={"sm"} bold>
        {name}
      </Text>
      <View style={styles.cardBody}>
        <View flex={9}>
          {/* <Text>Col1</Text> */}
          <Text fontSize="xs" noOfLines={1} flex={1}>
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
                  onToggle={handleToggle}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf5ef",
    borderRadius: 5,
    paddingLeft: 5,
    paddingVertical: 7,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  sensorValue: {
    color: "#28554e",
    fontSize: 14,
    fontWeight: "bold",
  }
});

export default EngineCard;

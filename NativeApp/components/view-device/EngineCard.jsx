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
  const [isLoading, setIsLoading] = useState(true);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchInitValue = async () => {
      if (mounted) {
        setIsLoading(true);
        if (client) {
          client.sub(feedKey, handleMessageArrived)
          const data = await client.fetchLastData(feedKey)
          setLastData(data)
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
    setLastData(payload.toString())
    setIsLoading(false);
  }

  const onToggle = () => {
    (async () => {
      setIsLoading(true);
      const nextData = (lastData == '1') ? '0' : '1';
      client.pub(feedKey, nextData)
      await sleep(200);
    })().catch(console.log);
  };
  
  // return <SensorCard isLoading={isLoading} lastData={lastData} name={name} type={type} description={description} />;
  if (isSensor) {
    return <SensorCard isLoading={isLoading} lastData={lastData} name={name} type={type} description={description} />;
  }
   else {
    return <ActuatorCard isLoading={isLoading} lastData={lastData} name={name} type={type} description={description} 
      onToggle={onToggle}
    />;
  }
}

// ------------------- SENSOR -------------------

function SensorCard({ isLoading, lastData, name, type, description}) {
  let sensorValue;
  try {
    sensorValue = parseInt(lastData)
  } catch {
    sensorValue = null
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

function ActuatorCard({ isLoading, lastData, name, type, description, onToggle }) {
  const isOn = lastData == '1' ? true : false;

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

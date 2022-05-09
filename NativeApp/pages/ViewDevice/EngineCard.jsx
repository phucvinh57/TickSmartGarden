import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { infers } from "./utils";
import { VStack, Center, Switch, Image, Text, View } from "native-base";
import { useState, useEffect } from "react";

function UtilCard({ name, type, description, onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack style={styles.container}>
        <Text fontSize={"sm"} bold>
          {name}
        </Text>
        <View style={styles.cardBody}>
          <View flex={9}>
            {/* <Text>Col1</Text> */}
            <Text fontSize="sm" flexShrink={1} mb=".3em">
              {description}
            </Text>
            <View>{children}</View>
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

function SensorCard({ lastData, name, type, description, onPress }) {
  const isLoading = lastData ? false : true;
  const sensorValue = parseInt(lastData) || "--";

  return (
    <UtilCard
      name={name}
      type={type}
      description={description}
      onPress={onPress}
    >
      {isLoading && <ActivityIndicator size="small" color="red" />}
      {!isLoading && (
        <Text fontSize="md" style={[styles.sensorValue, { maxHeight: 25 }]}>
          {`${sensorValue}${infers.inferDataUnit(type)}`}
        </Text>
      )}
    </UtilCard>
  );
}
// ------------------- ACTUATOR -------------------

function ActuatorCard({
  lastData,
  onToggle,
  name,
  type,
  description,
  onPress,
}) {
  const [isLoading, setIsLoading] = useState(lastData ? false : true);
  useEffect(() => {
    setIsLoading(lastData ? false : true);
  }, lastData);

  const isOn = lastData == "1" ? true : false;
  const handleToggle = () => {
    setIsLoading(true);
    onToggle();
  };

  return (
    <UtilCard
      name={name}
      type={type}
      description={description}
      onPress={onPress}
    >
      {isLoading && (
        <ActivityIndicator size="small" color="red" style={{ height: 25 }} />
      )}
      {!isLoading && (
        <Switch
          style={{ height: 25 }}
          onToggle={handleToggle}
          isChecked={isOn}
          onTrackColor="#2e9790"
          flex={1}
          alignSelf="center"
          size="sm"
        />
      )}
    </UtilCard>
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

export { SensorCard, ActuatorCard };

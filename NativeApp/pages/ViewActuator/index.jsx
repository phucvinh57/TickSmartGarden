import { useState, useEffect, useContext } from "react";
import { Text } from "react-native";
import ViewDevice from "../ViewDevice";

import hardware from "../../services/hardware";
import { GardenContext } from "../../contexts/GardenContext";

const sensorTypes = [
  { id: "All", name: "Tất cả" },
  { id: "SensorLight", name: "Ánh sáng" },
  { id: "SensorHumid", name: "Độ ẩm" },
];

const actuatorTypes = [
  { id: "All", name: "Tất cả" },
  { id: "SensorTemperature", name: "Nhiệt độ" },
  { id: "ActuatorLight", name: "Đèn" },
  { id: "ActuatorPump", name: "Máy bơm" },
];

const page = "sensor";

export default function ViewActuator({ route, navigation }) {
  let gardenId = ""
  if (route.params) {
    const { garden } = route.params;
    gardenId = garden.ID
  }
  else {
    gardenId = "0garden0"
  }
  // const { gardenInfo } = useContext(GardenContext);
  const [hardwares, setHardwares] = useState(null);
  useEffect(() => {
    const fetchHardwareList = async () => {      
      const response = await hardware.getAll(gardenId);
      let _datum = await response.data

      _datum = _datum.map((item) => ({
        id: item.ID,
        status: "Đang hoạt động",
        feedkey: item.feedKey,
        ...item,
      }));
      setHardwares(_datum)
      console.log(JSON.stringify(_datum, null, 2));
    };
    fetchHardwareList().catch(console.error);
  }, []);

  if (hardwares == null) return <Text>Loading ... </Text>;
  if (page == "actuator")
    return (
      <ViewDevice
        navigation={navigation}
        hardwares={hardwares}
        deviceTypeOptions={sensorTypes}
      />
    );
  if (page == "sensor")
    return (
      <ViewDevice
        navigation={navigation}
        hardwares={hardwares}
        deviceTypeOptions={actuatorTypes}
      />
    );
}

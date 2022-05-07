import { useState, useEffect } from "react";
import ViewDevice from "../ViewDevice";
import CustomLoading from "../../components/CustomLoading";
import hardware from "../../services/hardware";
import GardenGroup from "../../contexts/mqttClient";

import { useIsFocused } from "@react-navigation/native";

const allTypes = [
  { id: "All", name: "Tất cả" },
  { id: "ActuatorLight", name: "Đèn" },
  { id: "ActuatorPump", name: "Máy bơm" },
  { id: "SensorLight", name: "Ánh sáng" },
  { id: "SensorHumid", name: "Độ ẩm" },
  { id: "SensorTemperature", name: "Nhiệt độ" },
];

export default function ViewActuator({ route, navigation }) {
  const { gardenId, ada } = route.params;

  const [adaClient, setAdaClient] = useState();
  useEffect(() => {
    if (!ada) return;
    const { username, userkey } = ada;
    const client = GardenGroup.getAdaClient(username);
    if (!client) {
      GardenGroup.addClient(
        {
          username: username,
          password: userkey,
        },
        () => {
          setAdaClient(GardenGroup.getAdaClient(username));
        }
      );
    } else {
      setAdaClient(client);
    }
  }, [ada]);

  const isFocused = useIsFocused();

  const [hardwares, setHardwares] = useState(null);
  useEffect(() => {
    const fetchHardwareList = async () => {
      const response = await hardware.getAll(gardenId);
      let _datum = await response.data;

      _datum = _datum.map((item) => ({
        id: item.ID,
        status: "Đang hoạt động",
        feedkey: item.feedKey,
        ...item,
      }));
      setHardwares(_datum);
    };
    fetchHardwareList().catch(console.error);
  }, [adaClient, isFocused]);

  return hardwares != null && adaClient ? (
    <ViewDevice
      navigation={navigation}
      hardwares={hardwares}
      deviceTypeOptions={allTypes}
      adaClient={adaClient}
      gardenId={gardenId}
    />
  ) : (
    <CustomLoading title={'Danh sách thiết bị'}/>
  );
}
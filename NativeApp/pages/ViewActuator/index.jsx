import { useState, useEffect, useContext } from "react";
import ViewDevice from "../ViewDevice";
import CustomLoading from "../../components/CustomLoading";
import hardware from "../../services/hardware";
import GardenGroup from "../../contexts/mqttClient";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

export default function ViewActuator({ route, navigation }) {
  const { gardenId, ada } = route.params;
  const isFocused = useIsFocused();
  
  const [adaClient, setAdaClient] = useState(null);
  useEffect(() => {
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
  }, []);


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
  }, [isFocused]);


  const [datum, setDatum] = useState({});
  useEffect(() => {
    let mounted = true
    const subscribeMqtt = async () => {
      if (adaClient == null || hardwares == null) return
      const feeds = hardwares.map(hw => hw.feedkey)
      adaClient.subArray(feeds, (incomingTopic, message) => {
        let topic = feeds.filter(f => String(incomingTopic).includes(f))[0]
        if (!topic || !mounted) return
        setDatum(prevData => ({
          ...prevData,
          [topic]: String(message)
        }))
      })
    }
    subscribeMqtt().catch(console.error)

    return () => { mounted = false }
  }, [adaClient, hardwares]);


  useEffect(() => {
    let mounted = true
    const fetchInitValue = async () => {
      if (adaClient == null || hardwares == null) return
      const feeds = hardwares.map(hw => hw.feedkey)
      for (let i in feeds) {
        const incomingTopic = feeds[i]
        const message = await adaClient.fetchLastData(incomingTopic)
        let topic = feeds.filter(f => String(incomingTopic).includes(f))[0]
        if (!topic || !mounted) return
        setDatum(prevData => ({
          ...prevData,
          [topic]: String(message)
        }))
      }
    }
    fetchInitValue().catch(console.error)

    return () => { mounted = false }
  }, [adaClient, hardwares])


  const { setAuth } = useContext(AuthContext)
  const handlePress = (hardwareId, isSensor, item) => { 
    setAuth(lastAuth => ({
      ...lastAuth,
      hardwareId: hardwareId,
      gardenId: gardenId,
    }))
    navigation.navigate(isSensor ? 'Root/MainApp/Chart' : 'Root/MainApp/DeviceInfo', {raw: item})
  }

  return hardwares != null && adaClient ? (
    <ViewDevice
      hardwares={hardwares}
      datum={datum}
      handlePress={handlePress}
    />
  ) : (
    <CustomLoading title={'Danh sách thiết bị'}/>
  );
}
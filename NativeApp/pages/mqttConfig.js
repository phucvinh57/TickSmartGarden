import { connect } from "mqtt";
import { mockedEngineList } from "./data";

const ADA_CLIENT = "phucnguyensolver"
const USER_KEY = "aio_Govv720CpibZcjwhDd6TszYAydYz"
const GROUP_KEY = "phucnguyensolver/groups/tl-garden"

const mockedData = {
  gardenname: "Vườn trồng rau",
  adaclient: ADA_CLIENT,
  userkey: USER_KEY,
  groupkey: GROUP_KEY,
  hardware: [
    // {
    //   name: "Nhiệt độ",
    //   feedkey: TEMPERATURE_SENSOR_FEED_KEY,
    //   type: "sensor",
    // },
    ...mockedEngineList
  ],
};

const gardenData = mockedData
const [devices, setDevices] = useState(gardenData.hardware)

// CONNECTION
const getConnectionUrl = (username, key) => `mqtts://${username}:${key}@io.adafruit.com`
const client = (connect(getConnectionUrl(gardenData.adaclient, gardenData.userkey)))

// useEffect(() => {
  if (client) {
    client.on('connection', () => {
      console.log('connected')
      gardenData.hardware.forEach(hardware => {
        client.subscribe(hardware.feedkey, (err) => console.log(err))
      })
    })
    client.on('error', (err) => console.log('connection error: ', err))
    client.on('message', handleMessage)
  }
// }, [client]);

const handleMessage = (topic, message) => {
  console.log(`Topic: [${topic}]`);
  console.log(`Msg: [${message.toString()}]`);
  client.end();

  // TODO: update device data & status
};

const handleToggleDevice = (deviceId) => {
  console.log(`Toggle deviceId: ${deviceId}`);
  // TODO: toggle device status
  // devices[deviceId].isOn = !devices[deviceId].isOn;
  
  const feedkey = devices[deviceId].feedkey;
  const message = devices[deviceId].isOn ? '0' : '1';
  const name = devices[deviceId].name
  client.publish(feedkey, message)
  alert(`Turn device ${turnOn ? "on" : "off"} - ${name}`);
};
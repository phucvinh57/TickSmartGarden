// --------------- UTIL ---------------
const LAMP_FEED_KEY = "tl-garden.lamp-0";
const PUMP_FEED_KEY = "tl-garden.pump-0";
const TEMPERATURE_SENSOR_FEED_KEY = "tl-garden.sensor-temperature-0";
const HUMIDITY_SENSOR_FEED_KEY = "tl-garden.sensor-humidity-0";
const LIGHT_SENSOR_FEED_KEY = "tl-garden.sensor-light-0";

// --------------- AVAILABLE ---------------

const actuatorTypes = [
  { id: "ActuatorPump", name: "Máy bơm" },
  { id: "ActuatorLight", name: "Đèn" },
];
const sensorTypes = [
  { id: "SensorHumid", name: "Độ ẩm" },
  { id: "SensorLight", name: "Ánh sáng" },
  { id: "SensorTemperature", name: "Nhiệt độ" },
];

const pump1 = {
  id: 1,
  name: "Máy bơm 1",
  feedkey: PUMP_FEED_KEY,
  type: "ActuatorPump", // in [ActuatorLight, ActuatorBump, SensorLight, SensorHumid, SensorTemperature]
  status: "Đang hoạt động",
  isSensorType: false,
};
const light1 = {
  id: 2,
  name: "Đèn 1",
  feedkey: LAMP_FEED_KEY,
  type: "ActuatorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "Hoạt động kém",
  isSensorType: false,
};
const sensorHumid1 = {
  id: 3,
  name: "Độ ẩm 1",
  feedkey: HUMIDITY_SENSOR_FEED_KEY,
  type: "SensorHumid", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "Hoạt động kém",
  isSensorType: true,
};
const sensorTemperature1 = {
  id: 4,
  name: "Nhiệt độ 1",
  feedkey: TEMPERATURE_SENSOR_FEED_KEY,
  type: "SensorTemperature", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "I'm good babe",
  isSensorType: true,
};
const sensorLight1 = {
  id: 5,
  name: "Ánh sáng 1",
  feedkey: LIGHT_SENSOR_FEED_KEY,
  type: "SensorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "I'm good babe",
  isSensorType: true,
};


const hardware = [
  pump1,
  light1,
  sensorHumid1,
  sensorTemperature1,
  sensorLight1,
  
  {...pump1, id: 11},
  {...light1, id: 12},
  {...sensorHumid1, id: 13},
  {...sensorTemperature1, id: 14},
  {...sensorLight1, id: 15},
  {...sensorHumid1, id: 23},
  {...sensorTemperature1, id: 24},
  {...sensorLight1, id: 25},
];

module.exports.hardware = hardware;
module.exports.actuatorTypes = actuatorTypes;
module.exports.sensorTypes = sensorTypes;

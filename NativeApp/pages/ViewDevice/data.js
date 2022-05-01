// --------------- UTIL ---------------
const LAMP_FEED_KEY = "tl-garden.lamp-0";
const PUMP_FEED_KEY = "tl-garden.pump-0";
const TEMPERATURE_SENSOR_FEED_KEY = "tl-garden.sensor-temperature-0";
const HUMIDITY_SENSOR_FEED_KEY = "tl-garden.sensor-humidity-0";
const LIGHT_SENSOR_FEED_KEY = "tl-garden.sensor-light-0";

// --------------- AVAILABLE ---------------

const pump1 = {
  id: 1,
  name: "Máy bơm 1",
  feedkey: PUMP_FEED_KEY,
  type: "ActuatorPump", // in [ActuatorLight, ActuatorBump, SensorLight, SensorHumid, SensorTemperature]
  status: "Đang hoạt động",
};
const light1 = {
  id: 2,
  name: "Đèn 1",
  feedkey: LAMP_FEED_KEY,
  type: "ActuatorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "Hoạt động kém",
};
const sensorHumid1 = {
  id: 3,
  name: "Độ ẩm 1",
  feedkey: HUMIDITY_SENSOR_FEED_KEY,
  type: "SensorHumid", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "Hoạt động kém",
};
const sensorTemperature1 = {
  id: 4,
  name: "Nhiệt độ 1",
  feedkey: TEMPERATURE_SENSOR_FEED_KEY,
  type: "SensorTemperature", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "I'm good babe",
};
const sensorLight1 = {
  id: 5,
  name: "Ánh sáng 1",
  feedkey: LIGHT_SENSOR_FEED_KEY,
  type: "SensorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
  status: "I'm good babe",
};


const hardware = [
  pump1,
  light1,
  sensorHumid1,
  sensorTemperature1,
  sensorLight1,
  
  {...pump1, id: 11, name: "Máy bơm 2"},
  {...light1, id: 12, name: "Đèn 2"},
  {...sensorHumid1, id: 13, name: "Độ ẩm 2"},
  {...sensorTemperature1, id: 14, name: "Nhiệt độ 2"},
  {...sensorLight1, id: 15, name: "Ánh sáng 2"},
  {...sensorHumid1, id: 23, name: "Độ ẩm 3"},
  {...sensorTemperature1, id: 24, name: "Nhiệt độ 3"},
  {...sensorLight1, id: 25, name: "Ánh sáng 3"},
];

module.exports.hardware = hardware;

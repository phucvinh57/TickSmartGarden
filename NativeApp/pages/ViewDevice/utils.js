const DeviceTypeString = {
  ActuatorPump: "ActuatorPump",
  ActuatorLight: "ActuatorLight",
  SensorLight: "SensorLight",
  SensorHumid: "SensorHumid",
  SensorTemperature: "SensorTemperature",
};


// ------------------- INFER -------------------
const ActuatorPumpImage = require("../../assets/pump.png");
const ActuatorLightImage = require("../../assets/bulb.png");
const SensorHumidImage = require("../../assets/sensorHumid.png");
const SensorLightImage = require("../../assets/sensorLight.png");
const SensorTemperatureImage = require("../../assets/sensorTemperature.png");
const DefaultDeviceImage = require("../../assets/default.png");

const inferDeviceImage = (deviceType) => {
  switch (deviceType) {
    case DeviceTypeString.ActuatorPump:
      return ActuatorPumpImage;
    case DeviceTypeString.ActuatorLight:
      return ActuatorLightImage;
    case DeviceTypeString.SensorHumid:
      return SensorHumidImage;
    case DeviceTypeString.SensorLight:
      return SensorLightImage;
    case DeviceTypeString.SensorTemperature:
      return SensorTemperatureImage;
    default:
      return DefaultDeviceImage;
  }
};

const inferStatus = (device) => "Đang hoạt động";
const inferDataUnit = (deviceType) => {
  switch (deviceType) {
    case DeviceTypeString.SensorHumid:
      return '%';
    case DeviceTypeString.SensorLight:
      return ' Lux';
    case DeviceTypeString.SensorTemperature:
      return '℃';
    default:
      return '__';
  }
}

const inferIsSensorType = (deviceName) => {
  if (deviceName[0] == "S") // in "Sensor"
    return true;
  return false;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeChunks = (arr, chunkSize) => {
  if (!chunkSize || chunkSize == 0) return [[]];
  const array = [...arr];
  if (array.length == 0) return [[]]
  let res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    res = [...res, chunk];
  }
  return res;
}

module.exports.DeviceTypeString = DeviceTypeString
module.exports.sleep = sleep
module.exports.makeChunks = makeChunks
module.exports.infers = {
  inferDataUnit: inferDataUnit, 
  inferIsSensorType: inferIsSensorType, 
  inferStatus: inferStatus,
  inferDeviceImage: inferDeviceImage,
}
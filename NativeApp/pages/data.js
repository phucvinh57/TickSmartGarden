
const pump1 = {
    name: "Máy bơm 1",
    status: "Đang hoạt động",
    type: "ActuatorPump", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
    isOn: true,
  };
  
  const light1 = {
    name: "Đèn 1",
    status: "Không hoạt động",
    type: "ActuatorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
    isOn: false,
  };
  
  const sensorHumid1 = {
    name: "Độ ẩm 1",
    status: "Hoạt động kém",
    type: "SensorHumid", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
    isOn: true,
  };
  
  const sensorTemperature1 = {
    name: "Nhiệt độ 1",
    status: "Ổn định",
    type: "SensorTemperature", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
    isOn: true,
    data: 30,
    dataUnit: "*C",
  };
  
  const sensorLight1 = {
    name: "Ánh sáng 1",
    status: "Ổn định",
    type: "SensorLight", // in [ActuatorLight, ActuatorPump, SensorLight, SensorHumid, SensorTemperature]
    isOn: true,
    data: 100,
    dataUnit: " ** ",
  };
  
  const mockedEngineList = [
    pump1,
    light1,
    light1,
    pump1,
    pump1,
    light1,
    pump1,
    pump1,
    
    // light1,
    // pump1,
    // pump1,
    // light1,
    // pump1,
    // pump1,
  ].map((device, index) => {
    return { id: index, ...device };
  });
  
  const mockedSensorList = [
    // sensorLight1,
    sensorLight1,
    sensorHumid1,
    sensorTemperature1,
    sensorLight1,
    sensorHumid1,
    sensorTemperature1,
    sensorTemperature1,

    // sensorHumid1,
    // sensorTemperature1,
    // sensorTemperature1,
    // sensorHumid1,
    // sensorTemperature1,
    // sensorTemperature1,
  ].map((device, index) => {
    return { id: index, ...device };
  });
  
  const sensorTypes = [
    { id: "SensorHumid", name: "Độ ẩm" },
    { id: "SensorLight", name: "Ánh sáng" },
    { id: "SensorTemperature", name: "Nhiệt độ" },
  ];
  
  const actuatorTypes = [
    { id: "ActuatorPump", name: "Máy bơm" },
    { id: "ActuatorLight", name: "Đèn" },
  ];
  
module.exports.sensorTypes = sensorTypes;
module.exports.actuatorTypes = actuatorTypes;
module.exports.mockedSensorList = mockedSensorList;
module.exports.mockedEngineList = mockedEngineList;
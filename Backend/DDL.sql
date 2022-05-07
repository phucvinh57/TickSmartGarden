drop schema smartgarden;
create schema if not exists smartgarden;
use smartgarden;
create table if not exists `Account` (
	email VARCHAR(30) primary key,
    name VARCHAR(30) not null,
    password VARCHAR(20) not null
);

create table if not exists AdaClient(
	username varchar(30) not null primary key,
    userkey varchar(50) not null
);

create table if not exists Garden (
	ID varchar(8) primary key,
	`name` varchar(30) not null,
    adaclient varchar(30) not null,
    accountemail varchar (30) not null,
	group_key varchar(30) not null,
    `description` varchar(255),
    imgurl varchar(255),
    foreign key (accountemail) references Account(email),
    foreign key (adaclient) references AdaClient(username)
);

create table if not exists Hardware(
	ID varchar(8) primary key,
	`name` varchar(30),
    gardenID varchar(30) not null,
	feedkey varchar(50) not null,
    `type` enum('ActuatorLight', 'ActuatorPump', 'SensorLight', 'SensorHumid', 'SensorTemperature') not null,
    foreign key (gardenID) references Garden(ID)
);

create table if not exists Sensor(
	hardwareID varchar(8) primary key,
	foreign key (hardwareID) references Hardware(ID)
);

create table if not exists Actuator (
	hardwareID varchar(8) primary key,
    operatingTime int not null,
    foreign key (hardwareID) references Hardware(ID)
);

create table if not exists `Schedule`(
	actuator_ID varchar(8),
    `name` varchar(100),
    startTime datetime not null,
    cycle int not null default 1,
    unit enum('min', 'hour', 'day', 'week') not null,
    count int not null default 0,
    operatingTime int not null,
    primary key (actuator_ID, `name`),
    foreign key (actuator_ID) references Actuator(hardwareID)
);

create table if not exists Policy(
	`name` varchar(100),
    actuatorID varchar(8),
    `action` enum('OFF', 'ON') not null,
    logic enum('AND', 'OR') not null,
    operatingTime int not null,
    intervalThreshold int not null,
    primary key (`name`, actuatorID),
    foreign key (actuatorID) references Actuator(hardwareID)
);

create table if not exists Applies (
	sensorID varchar(8),
    policyName varchar(100),
    actuatorID varchar(8),
    primary key (sensorID, policyName, actuatorID),
    foreign key (sensorID) references Sensor(hardwareID),
    foreign key (policyName, actuatorID) references Policy(`name`, actuatorID)
);

create table if not exists Expression (
	sensorID varchar(8),
    policyName varchar(100),
    actuatorID varchar(8),
    operator enum('>', '<', '>=', '<=', '==', '!='),
    rhsValue float,
    primary key (sensorID, policyName, actuatorID, operator, rhsValue),
    foreign key (sensorID, policyName, actuatorID) references Applies(sensorID, policyName, actuatorID)
);

create table if not exists Log (
	hardwareID VARCHAR(8),
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activity VARCHAR(255) NOT NULL,
    PRIMARY KEY (`hardwareID`, `timestamp`),
    FOREIGN KEY (hardwareID) REFERENCES Hardware(ID)
);
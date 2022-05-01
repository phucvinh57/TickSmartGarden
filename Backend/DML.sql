USE smartgarden;
SHOW TABLES;


SELECT * FROM Actuator;

INSERT INTO `Account` VALUES ('nhancu@gmail.com', 'Cù Đỗ Thanh Nhân', '123456');
INSERT INTO AdaClient VALUES 
('phucnguyensolver', 'aio_WdKD99iPo3Iz5esm4wu7n0F7tt4n');


INSERT INTO garden VALUES 
('12fe33', 'Vườn trồng rau', 'phucnguyensolver', 'nhancu@gmail.com', 'tl-garden', "Chăn rau sạch", '');

INSERT INTO hardware VALUES 
('111111', 'Máy bơm 1', '12fe33', 'tl-garden.pump-0', 'actuator');

insert into actuator VALUES ('111111', 60);
insert into `schedule` values
('111111', 'Bơm sáng', NOW(), 3, 'day', 5, 70);
insert into `schedule` values
('111111', 'Bơm Chiều', NOW(), 3, 'day', 5, 70);

SELECT 
	hardware.name AS hardwareName, 
    actuator.operatingTime as hardwareOpTime, 
	schedule.name, schedule.startTime,
    schedule.cycle
FROM
	actuator JOIN hardware ON actuator.hardwareID = hardware.ID
	JOIN schedule ON schedule.actuator_ID = actuator.hardwareID
WHERE hardware.gardenID = '12fe33' AND hardware.ID = '111111';


import serial.tools.list_ports
import time
import sys
from  Adafruit_IO import  MQTTClient
import json
import os

path = './Gateway/'
configFile = 'aio_information.json'

try:
    os.chdir(path)
    f = open(configFile)
    AIO_INFO = json.load(f)
    f.close()
except NotADirectoryError:
    print("{0} is not a directory".format(path))
except FileNotFoundError:
    print("File not Found!")

AIO_GROUP_ID = AIO_INFO["group_id"]
AIO_SUBSCRIBE_TOPIC = AIO_INFO["subscribe_topic"]

AIO_USERNAME = AIO_INFO["username"]
AIO_KEY = AIO_INFO["key"]
AIO_TEMP_FEED = AIO_INFO["temperature_feed"]
AIO_HUMI_FEED = AIO_INFO["humidity_feed"]
AIO_LIGHT_FEED = AIO_INFO["light_feed"]

def  connected(client):
    print("Ket noi thanh cong...")
    for actuator in AIO_SUBSCRIBE_TOPIC:
        client.subscribe(AIO_GROUP_ID + actuator)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + feed_id + " " + payload)
    if isMicrobitConnected:
        if(feed_id == (AIO_GROUP_ID + AIO_SUBSCRIBE_TOPIC[0])):
            ser.write((AIO_SUBSCRIBE_TOPIC[0] + "#" + str(payload)).encode())
        if(feed_id == (AIO_GROUP_ID + AIO_SUBSCRIBE_TOPIC[1])):
            ser.write((AIO_SUBSCRIBE_TOPIC[1] + "#" + str(payload)).encode())

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial( port=getPort(), baudrate=115200)
    isMicrobitConnected = True
    print("Microbit Connected!")


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[1] == "TEMP":
            client.publish(AIO_GROUP_ID + AIO_TEMP_FEED, splitData[2])
        elif splitData[1] == "HUMI":
            client.publish(AIO_GROUP_ID + AIO_HUMI_FEED, splitData[2])
        elif splitData[1] == "LIGHT":
            value = int(splitData[2]) / 10
            client.publish(AIO_GROUP_ID + AIO_LIGHT_FEED, str(int(value)))
    except:
        pass

mess = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

while True:
    if isMicrobitConnected:
        readSerial()

    time.sleep(1)
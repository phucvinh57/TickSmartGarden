import serial.tools.list_ports
import random
import time
import  sys
from  Adafruit_IO import  MQTTClient

AIO_FEED_ID = "tl-garden."
AIO_FEED_TOPIC = ["light-0", "pump"]

AIO_USERNAME = "cudothanhnhan"
AIO_KEY = "aio_gPao73GiQl2HHNfVrXApbcv1Kvwf"

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_TOPIC:
        client.subscribe(AIO_FEED_ID+feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        ser.write(( "#"+str(payload)).encode())

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
            client.publish(AIO_FEED_ID+"sensor-temperature", splitData[2])
        elif splitData[1] == "HUMI":
            client.publish(AIO_FEED_ID+"sensor-humidity", splitData[2])
        elif splitData[1] == "sensor-light":
            value = int(splitData[2]) / 10
            client.publish(AIO_FEED_ID + "sensor-light", str(int(value)))
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
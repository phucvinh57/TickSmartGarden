import { connect } from "@taoqf/react-native-mqtt";

function getMqttConnection(username, key) {
  const url = `mqtts://${username}:${key}@io.adafruit.com`;
  return connect(url);
}

class AdaClient {
  constructor(username, password, client) {
    this.username = username;
    this.password = password;
    this.client = client;
  }

  fetchLastData = async (_feedkey) => {
    const _username = this.username;
    const _adakey = this.password;
    const url = `https://io.adafruit.com/api/v2/${_username}/feeds/${_feedkey}/data/last?x-aio-key=${_adakey}`;
    // console.log(url)
    const response = await fetch(url);
    const status = await response.json();
    return status.value;
  };

  pub(key, message) {
    const topic = [this.username, "feeds", key].join("/");
    try {
      this.client.publish(topic, message);
    } catch (error) {
      console.log(error);
    }
  }

  subArray(keys, onMessage) {
    try {
      const topics = [...keys].map((key) => {
        return [this.username, "feeds", key].join("/");
      })
      
      this.client.subscribe(topics, (err) => {
        err && console.log(err);
        !err &&
          this.client.on("message", (incomeTopic, message) => {
            if (topics.includes(incomeTopic)) {
              console.log(
                `Message on topic ${incomeTopic}. Message: ${message}`
              );
              onMessage(incomeTopic, message);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  sub(key, onMessage) {
    try {
      const topic = [this.username, "feeds", key].join("/");
      this.client.subscribe(topic, (err) => {
        err && console.log(err);
        !err &&
          this.client.on("message", (incomeTopic, message) => {
            if (topic === incomeTopic) {
              console.log(
                `Message on topic ${incomeTopic}. Message: ${message}`
              );
              onMessage(incomeTopic, message);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

class ClientGroup {
  constructor() {
    this.clients = [];
  }

  addClient(options, callback = null) {
    if (
      this.clients.findIndex(
        (client) => client.username === options.username
      ) === -1
    ) {
      const client = getMqttConnection(options.username, options.password);
      client.on("error", (err) => {
        console.log("connection error", err);
      });
      client.on("connect", () => {
        console.log(`Connected to adaclient ${options.username}`);
        this.clients.push(
          new AdaClient(options.username, options.password, client)
        );
        callback && callback();
      });
    }
  }

  getAdaClient(username) {
    const numberOfClient = this.clients.length
    console.log({numberOfClient}) 
    const arr = this.clients.filter((client) => {
      return client.username === username
    })
    if (arr && arr != []) {
      return arr[0]
    }
    return null
  }
}

const GardenGroup = new ClientGroup();
export default GardenGroup
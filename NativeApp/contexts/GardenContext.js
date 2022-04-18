import { createContext, useEffect, useState } from 'react';
import { ADA_CLIENT, USER_KEY } from '../env';
import GardenGroup from './mqttClient'

const GardenContext = createContext()

const defaultGardenInfo = {
  gardenname: "Vườn trồng rau",
  auth: {
    username: ADA_CLIENT,
    password: USER_KEY,
  },
};

function GardenContextProvider({children}) {
  const [gardenInfo, setGardenInfo] = useState(defaultGardenInfo);
  const [adaClient, setAdaClient] = useState(null)

  const onGardenChange = (garden) => {
    setGardenInfo(garden)
  }

  useEffect(() => {
    const username = gardenInfo.auth.username
    const client = GardenGroup.getAdaClient(username)
    if (!client) {
      GardenGroup.addClient(gardenInfo.auth, () => {
        setAdaClient(GardenGroup.getAdaClient(username))
      })
    }
  }, [gardenInfo]);

  return (
    <GardenContext.Provider value={{gardenInfo, adaClient}}>
      {children}
    </GardenContext.Provider>
  );
}


export { GardenContext, GardenContextProvider }
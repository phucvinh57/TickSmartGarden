import { createContext, useState } from 'react';
import { ADA_CLIENT, USER_KEY, GROUP_KEY } from '../env';

const GardenContext = createContext()

const defaultGardenInfo = {
  gardenname: "Vườn trồng rau",
  adaclient: ADA_CLIENT,
  userkey: USER_KEY,
  groupkey: GROUP_KEY,
  auth: {
    username: ADA_CLIENT,
    password: USER_KEY,
  },
};

function GardenContextProvider({children}) {
  const [gardenInfo, setGardenInfo] = useState(defaultGardenInfo);

  return (
    <GardenContext.Provider value={gardenInfo}>
      {children}
    </GardenContext.Provider>
  );
}


export { GardenContext, GardenContextProvider }

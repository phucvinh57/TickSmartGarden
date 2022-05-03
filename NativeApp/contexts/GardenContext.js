// import { createContext, useEffect, useState } from 'react';
// import { ADA_CLIENT, USER_KEY } from '../env';
// import garden from '../services/garden';
// import GardenGroup from './mqttClient'

// const GardenContext = createContext()

// // Todo: Must be pass by QA's function
// // const gardenId = "12fe34";

// const defaultGardenInfo = {
//   ID: "",
//   name: "",
//   auth: {
//     username: ADA_CLIENT,
//     password: USER_KEY,
//   },
// };

// function GardenContextProvider({children}) {

//   const [gardenInfo, setGardenInfo] = useState(null);
//   const [adaClient, setAdaClient] = useState(null)


//   useEffect(() => {
//     if (!gardenInfo) return
//     const username = gardenInfo.auth.username
//     const client = GardenGroup.getAdaClient(username)
//     if (!client) {
//       GardenGroup.addClient(gardenInfo.auth, () => {
//         setAdaClient(GardenGroup.getAdaClient(username))
//       })
//     }
//   }, [gardenInfo]);

//   return (
//     <GardenContext.Provider value={{ gardenInfo, adaClient, setGardenInfo }}>
//       {children}
//     </GardenContext.Provider>
//   );
// }


// export { GardenContext, GardenContextProvider }

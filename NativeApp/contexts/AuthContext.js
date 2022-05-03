import { createContext, useEffect, useState } from "react";
import { ADA_CLIENT, USER_KEY } from '../env';
import GardenGroup from "./mqttClient";
import useLogging from "./useLogging";
// import garden from '../services/garden';
// import GardenGroup from './mqttClient'

const AuthContext = createContext();

const emptyAuth = {
  name: "",
  email: "",
  ada: {
    username: "",
    userkey: "",
  },
  gardenId: "",
  hardwareId: "",
};

const loginAPI = async(email) => {
  return email === "nhancu@gmail.com";
} 

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState();

  useLogging(null, auth)

  async function tryLogin(email) {
    const ok = await loginAPI(email) // TODO: call backend
    if (!ok) return false
    setAuth({
      name: "Quang Anh",
      email: email,
      ada: {
        username: ADA_CLIENT,
        userkey: USER_KEY,
      },
      hardwareId: null,
      gardenId: null,
    })
    return true
  }
  
  async function tryLogout() {
    setAuth(null)
    // setAdaClient(null)
  }
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, tryLogin, tryLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

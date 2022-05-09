import { AuthScreenNavigator } from "./Navigation";
import BottomTab from './BottomTab'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthTest() {
    const {auth} = useContext(AuthContext)
    const isSignedIn = auth ? true : false
    if(isSignedIn) return <BottomTab />
    return <AuthScreenNavigator />
}
import {useEffect, createContext, useContext, useState} from 'react'
import axios from "axios";
import { config } from "../services/config";

// create an empty context
const AuthContext = createContext()

function AuthProvider({children}) {
    // create state to store logged user information
    const [user, setUser] = useState(null)
    useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("Token in localStorage:", token);

  if (!token) return;

  axios.get(`${config.server}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    // console.log("Auth restore success:", res.data);
    setUser(res.data.data);
  })
  .catch((err) => {
    // console.error("Auth restore failed:", err.response?.status);
    localStorage.removeItem("token");
    setUser(null);
  });

}, []);

    const logout = () => {
        localStorage.removeItem("token");
         localStorage.removeItem("reservationId");
         localStorage.removeItem("cartItems");
         localStorage.removeItem("finalPayable");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// expose the context using custom hook
export function useAuth() {
    return useContext(AuthContext) 
}
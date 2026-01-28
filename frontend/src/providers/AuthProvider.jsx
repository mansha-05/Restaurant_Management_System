import {createContext, useContext, useState} from 'react'

// create an empty context
const AuthContext = createContext()

function AuthProvider({children}) {
    // create state to store logged user information
    const [user, setUser] = useState(null)

    const logout = () => {
        localStorage.removeItem("token");
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
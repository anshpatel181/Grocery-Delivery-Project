import { createContext, useContext, useState } from "react";
import type { User } from "../types/types";

// interface authContextType {

// }

const authContext = createContext<any>(undefined);

export const AuthProvider = ({children}: any) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("auth_user")
        return saved ? JSON.parse(saved) : false
    })
    return <authContext.Provider value={user}>{children}</authContext.Provider>
}

export function useAuth()  {
    const context = useContext(authContext)
    return context;
}
import { createContext } from "react"
import { User } from "../model/user"

export type AuthContextType = {
    user : User | null,
    signin: (login:string, password: string) => Promise<boolean>,
    signout: () => any,
    authenticated : boolean
}

export const AuthContext = createContext<AuthContextType>(null!)
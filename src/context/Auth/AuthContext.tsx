import React, { createContext, useState } from "react";
import axios from "../../api/axios";
import { User } from "../../types/user";

export type AuthContextType = {
    user : User | null,
    signin: (login:string, password:string) => Promise<boolean>
    signout : () => {},
    authenticated : boolean
}


export const AuthContext = createContext<AuthContextType>(null!);
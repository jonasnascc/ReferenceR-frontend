import { useEffect, useState } from "react"
import { User } from "../../types/user";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../../api/useAuth";

export const AuthProvider = ({children} : {children : JSX.Element}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const api = useAuth();

    useEffect(() => {
        let validate = async () => {
            const token = localStorage.getItem("token");

            if(token){
                if(await validateToken(token)) {
                    setAuthenticated(true);
                }
            }
        }
        validate();
    }, [])

    const signin = async (login:string, password:string) => {
        const data = await api.signin(login, password);

        if(data.token) {
            if(await validateToken(data.token)){
                localStorage.setItem('token', data.token);
                setAuthenticated(true);
                return true;
            }
        }
        setAuthenticated(false);
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
        setAuthenticated(false);
    }

    const validateToken = async (token : string) => {
        const userReq = await api.validateToken(token)
        if(userReq){
            setUser({id: userReq.id, name: userReq.name, role: userReq.role});
            return true;
        }
        return false;
    }

    return (
        <AuthContext.Provider value={{user, signin, signout, authenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

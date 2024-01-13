import axios from "axios";

const api =  axios.create({
    baseURL : process.env.REACT_APP_API
})

export const useApi = () => ({
    validateToken : async (token:string) => {
        const response = await api.get("users/token/validate", {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    },
    signin : async  (login:string, password:string) => {
        const response = await api.post("users/login", {login, password});
        return response.data;
    },
    logout : async () => {
        const response = await api.post("users/logout");
        return response.data;
    }
})
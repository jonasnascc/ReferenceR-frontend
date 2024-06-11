import api from "./axios";

export const useAuth = () => ({
    validateToken : async (token:string) => {
        let response : any = null;
        await api.get("users/token/validate", {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then((resp) => response = resp)
        .catch((err) => console.log(err));

        if(response != null)
            return response.data;
        return null;
    },
    signin : async  (login:string, password:string) => {
        const response = await api.post("users/login", {login, password}).catch((err) => {
            throw new Error(JSON.stringify(err))
        });
        return response.data;
    },
    logout : async () => {
        const response = await api.post("users/logout", null, {sendToken:true});
        return response.data;
    }
})
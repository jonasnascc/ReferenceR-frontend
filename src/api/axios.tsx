import axios from "axios";

declare module 'axios' {
    export interface AxiosRequestConfig {
      provider ?: string;
      sendToken?: boolean;
    }
  }

const axiosInstance =  axios.create({
    baseURL : process.env.REACT_APP_API
})

axiosInstance.interceptors.request.use(config => {
    if(config.sendToken){
        const token = localStorage.getItem("token");
        
        config.headers.Authorization = token;
    }
    if(config.provider) {
      config.headers["Resources-provider"] = config.provider;
    }
    return config;
})


export default axiosInstance;
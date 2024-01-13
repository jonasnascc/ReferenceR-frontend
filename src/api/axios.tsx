import axios from "axios";

declare module 'axios' {
    export interface AxiosRequestConfig {
      sendToken?: boolean;
    }
  }

const axiosInstance =  axios.create({
    baseURL : "http://localhost:8080/api"
})

axiosInstance.interceptors.request.use(config => {
    if(config.sendToken){
        const token = localStorage.getItem("token");
        config.headers.Authorization = token;
        console.log(config);
    }
    return config;
})


export default axiosInstance;
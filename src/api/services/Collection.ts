import axios from "../axios"

export const createCollection = async (collection : {name:string, description?:string}) => {
    return await axios.post("user/collections", collection , {sendToken: true})
        .then(resp => resp.data)
}
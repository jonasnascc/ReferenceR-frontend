import axios from "../axios"

export const getAuthorProfile = async (authorName:string, provider:string) => {
    return await axios.get(`author/${authorName}`, {
        sendToken : true, provider : provider}
    ).then((response) => response.data)
}

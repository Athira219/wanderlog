import axios from "axios"

export const commonApi = async (httpmethod, url, body, header) => {
    const reqConfig = {
        method: httpmethod,
        url,
        data: body,
        headers: header ? header : { "Content-Type": "application/json" }

    }
    return axios(reqConfig).then((result) => {
        return result
    }).catch((err) => {
        console.log(`${err}`);
        return err
    })

}
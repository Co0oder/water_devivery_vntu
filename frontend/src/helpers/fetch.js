import {getFromLocal} from "./localStorage";


export default function(url, params) {
    const token = getFromLocal('token');
    return fetch(url, {
        ...params,
        headers: {
            ...params.headers,
            Authorization: token
        },
    })
}

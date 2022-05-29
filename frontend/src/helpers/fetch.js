import {getFromLocal} from "./localStorage";

const token = getFromLocal('token');

export default function(url, params) {
    return fetch(url, {
        ...params,
        headers: {
            ...params.headers,
            Authorization: token
        },
    })
}

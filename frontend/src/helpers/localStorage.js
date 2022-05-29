const setToLocal = (params) => {
    Object.keys(params).map(key => {
        localStorage.setItem(key, params[key])
    })
}

const getFromLocal = (params) => {
    return localStorage.getItem(params);
}


export {
    setToLocal,
    getFromLocal,
}

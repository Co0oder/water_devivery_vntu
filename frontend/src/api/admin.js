export async function getSesId() {
    const response = await fetch('http://139.59.128.142/api/admin',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}

export async function logoutAction() {
    const response = await fetch('http://139.59.128.142/api/logout',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}

export async function loginAction(params) {
    if (!params) throw new Error('No params!');

    const response = await fetch('http://139.59.128.142/api/admin/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(params),
        })
    return response.json();
}

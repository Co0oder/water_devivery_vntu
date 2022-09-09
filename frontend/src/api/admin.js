import urls from './urls/urls';

export async function getSesId() {
    const response = await fetch( urls.session,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}

export async function logoutAction() {
    const response = await fetch(urls.logout,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    window.localStorage.clear();
    window.location.reload(false);
    return response.json();
}

export async function loginAction(params) {
    if (!params) throw new Error('No params!');

    const response = await fetch(urls.login,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(params),
        })
    return response.json();
}

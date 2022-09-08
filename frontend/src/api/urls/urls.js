const baseUrl = "http://ec2-44-210-138-69.compute-1.amazonaws.com";

const urls = {
    orders: `${baseUrl}/orders/`,
    calls: `${baseUrl}/colls`,
    customers: `${baseUrl}/customers`,
    items: `${baseUrl}/items`,
    regions: `${baseUrl}/regions`,
    history: `${baseUrl}/history`,
    reviews: `${baseUrl}/reviews`,
    logout: `${baseUrl}/logout`,
    login: `${baseUrl}/login`,
    session: `${baseUrl}/admin`
}

export default urls;

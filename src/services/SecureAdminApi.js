const BASE_URL = 'http://localhost:8080/api/v1/admin';

const ApiUrls = Object.freeze({
    PENDING_SELLERS: `${BASE_URL}/pending-sellers`,
    SELLER: `${BASE_URL}/seller/`,
    APPROVE: '/approve',
    REJECT: '/reject',
    REVIEW: `${BASE_URL}/review`,
});

async function makeApiCall(
    method,
    url,
    params = {},
    body = null,
    accessToken = null,
) {
    console.log('HTTP Method:', method);
    console.log('URL:', url);
    console.log('Query Parameters:', params);
    console.log('Request Body:', body);
    console.log('Access Token:', accessToken);

    const fullUrl = new URL(url);
    Object.keys(params).forEach((key) =>
        fullUrl.searchParams.append(key, params[key]),
    );

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return await fetch(fullUrl.toString(), options);
}

async function getPendingSellers(token) {
    return await makeApiCall(
        'GET',
        ApiUrls.PENDING_SELLERS,
        {},
        null,
        token,
    );
}

export default { getPendingSellers };

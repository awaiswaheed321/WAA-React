import { setAllCookies } from '../cookies/AuthCookie';

const BASE_URL = 'http://localhost:8080/api/v1/auth';

const ApiUrls = Object.freeze({
    SIGNUP: `${BASE_URL}/signup`,
    LOGIN: `${BASE_URL}/login`,
    REFRESH: `${BASE_URL}/refreshToken`,
});

async function makeApiCall(method, url, params = {}, body = null) {
    const fullUrl = new URL(url);
    Object.keys(params).forEach((key) =>
        fullUrl.searchParams.append(key, params[key]),
    );
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    return await fetch(fullUrl.toString(), options);
}

async function signup(body) {
    return await makeApiCall('POST', ApiUrls.SIGNUP, {}, body);
}

async function login(body) {
    return await makeApiCall('POST', ApiUrls.LOGIN, {}, body);
}

async function refreshAccessToken(body) {
    const res = await makeApiCall('POST', ApiUrls.REFRESH, {}, body);
    if (!res.ok) {
        const error = await res.json();
        console.log('Error in refreshing token: ', error);
        return false;
    } else {
        const body = await res.json();
        setAllCookies(body.accessToken, body.refreshToken, body.user);
        return true;
    }
}

export default { signup, login, refreshAccessToken };

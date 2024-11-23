import { makeApiCall } from "./APICalls";

const BASE_URL = 'http://localhost:8080/api/v1/auth';

const ApiUrls = Object.freeze({
    SIGNUP: `${BASE_URL}/signup`,
    LOGIN: `${BASE_URL}/login`,
    REFRESH: `${BASE_URL}/refreshToken`,
});

async function signup(body) {
    return await makeApiCall('POST', ApiUrls.SIGNUP, {}, body);
}

async function login(body) {
    return await makeApiCall('POST', ApiUrls.LOGIN, {}, body);
}

export default { signup, login };

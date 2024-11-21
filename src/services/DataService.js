const BASE_URL = 'http://localhost:8080/api/v1';

const ApiUrls = Object.freeze({
    AUTH: `${BASE_URL}/auth`,
    SIGNUP: '/signup',
});

async function signup(params) {
    const url = new URL(
        `${ApiUrls.AUTH}${ApiUrls.SIGNUP}`,
    );
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return await response.json();
}

export default { signup };
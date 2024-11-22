// Helper function to handle common logic
async function makeApiCallBase(method, url, params = {}, body = null, accessToken = null) {
    const fullUrl = new URL(url);

    Object.keys(params).forEach((key) => fullUrl.searchParams.append(key, params[key]));
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
    const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    };
    return await fetch(fullUrl.toString(), options);
}

// The secure API call function (with token)
async function makeSecureApiCall(method, url, params = {}, body = null, accessToken) {
    return await makeApiCallBase(method, url, params, body, accessToken);
}

// The regular API call function (without token)
async function makeApiCall(method, url, params = {}, body = null) {
    return await makeApiCallBase(method, url, params, body);
}

async function uploadFile(url, file, accessToken = null) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const options = {
        method: 'POST',
        headers,
        body: formData,
    };

    return await fetch(url, options);
}


export { makeApiCall, makeSecureApiCall, uploadFile };


import { makeSecureApiCall } from './APICalls';

// Base URL for the API
const BASE_URL = 'http://localhost:8080/api/v1/admin';

// API URLs grouped logically
const ApiUrls = Object.freeze({
    BASE_URL,
    PENDING_SELLERS: `${BASE_URL}/pending-sellers`,
    SELLER: (id) => `${BASE_URL}/seller/${id}`,
    APPROVE: 'approve',
    REJECT: 'reject',
    REVIEW: `${BASE_URL}/review`,
    REVIEW_DELETE: (id) => `${BASE_URL}/review/${id}`,
    CATEGORY: '/category',
});

// Function to build the full URL for approving or rejecting a seller
const buildApproveRejectUrl = (id, action) =>
    `${ApiUrls.SELLER(id)}/${ApiUrls[action]}`;

async function getPendingSellers(token) {
    return await makeSecureApiCall(
        'GET',
        ApiUrls.PENDING_SELLERS,
        {},
        null,
        token,
    );
}

async function approveSeller(token, id) {
    const url = buildApproveRejectUrl(id, 'APPROVE');
    return await makeSecureApiCall('PUT', url, {}, null, token);
}

async function rejectSeller(token, id) {
    const url = buildApproveRejectUrl(id, 'REJECT');
    return await makeSecureApiCall('DELETE', url, {}, null, token);
}

async function getReviews(token) {
    return await makeSecureApiCall('GET', ApiUrls.REVIEW, {}, null, token);
}

async function deleteReview(token, id) {
    const url = ApiUrls.REVIEW_DELETE(id);
    return await makeSecureApiCall('DELETE', url, {}, null, token);
}

async function addCategory(token, body) {
    return await makeSecureApiCall(
        'POST',
        `${ApiUrls.BASE_URL}${ApiUrls.CATEGORY}`,
        {},
        body,
        token,
    );
}

async function deleteCategory(token, id) {
    return await makeSecureApiCall(
        'DELETE',
        `${ApiUrls.BASE_URL}${ApiUrls.CATEGORY}/${id}`,
        {},
        null,
        token,
    );
}

export default {
    getPendingSellers,
    approveSeller,
    rejectSeller,
    deleteReview,
    getReviews,
    addCategory,
    deleteCategory
};

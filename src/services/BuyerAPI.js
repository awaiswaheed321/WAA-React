import { makeSecureApiCall } from './APICalls';

const BASE_URL = 'http://localhost:8080/api/v1';

const ApiUrls = Object.freeze({
    PRODUCTS: `${BASE_URL}/buyer/product`,
    ORDER: `${BASE_URL}/buyer/order`,
    CANCEL: '/cancel',
    REVIEW: '/review',
    CART: `${BASE_URL}/buyer/cart`,
    ADD: '/add',
});

async function getProducts(token, params) {
    return await makeSecureApiCall(
        'GET',
        ApiUrls.PRODUCTS,
        params,
        null,
        token,
    );
}

async function getProductById(token, id) {
    return await makeSecureApiCall(
        'GET',
        `${ApiUrls.PRODUCTS}/${id}`,
        {},
        null,
        token,
    );
}

async function getBuyerOrders(token) {
    return await makeSecureApiCall('GET', ApiUrls.ORDER, {}, null, token);
}

async function getBuyerOrderById(token, id) {
    return await makeSecureApiCall(
        'GET',
        `${ApiUrls.ORDER}/${id}`,
        {},
        null,
        token,
    );
}

async function cancelOrder(token, id) {
    return await makeSecureApiCall(
        'DELETE',
        `${ApiUrls.ORDER}/${id}${ApiUrls.CANCEL}`,
        {},
        null,
        token,
    );
}

async function reviewOrder(token, body) {
    return await makeSecureApiCall(
        'POST',
        `${ApiUrls.ORDER}${ApiUrls.REVIEW}`,
        {},
        body,
        token,
    );
}

async function addToCart(token, body) {
    return await makeSecureApiCall(
        'POST',
        `${ApiUrls.CART}${ApiUrls.ADD}`,
        {},
        body,
        token,
    );
}

export default {
    getProducts,
    getProductById,
    getBuyerOrders,
    getBuyerOrderById,
    cancelOrder,
    reviewOrder,
    addToCart,
};

import { makeSecureApiCall, uploadFile } from './APICalls';

const BASE_URL = 'http://localhost:8080/api/v1';

const ApiUrls = Object.freeze({
    CATEGORY: `${BASE_URL}/category`,
    PRODUCTS: `${BASE_URL}/seller/products`,
    IMAGE: `${BASE_URL}/images/upload/`,
    STOCK: '/stock',
});

async function getCategories(token) {
    return await makeSecureApiCall('GET', ApiUrls.CATEGORY, {}, null, token);
}

async function getProducts(token, params) {
    return await makeSecureApiCall(
        'GET',
        ApiUrls.PRODUCTS,
        params,
        null,
        token,
    );
}

async function addToProductStock(token, id, stock) {
    return await makeSecureApiCall(
        'PUT',
        `${ApiUrls.PRODUCTS}/${id}${ApiUrls.STOCK}`,
        { stock: stock },
        null,
        token,
    );
}

async function updateProductById(token, id, body) {
    return await makeSecureApiCall(
        'PUT',
        `${ApiUrls.PRODUCTS}/${id}`,
        {},
        body,
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

async function deleteProductById(token, id) {
    return await makeSecureApiCall(
        'DELETE',
        `${ApiUrls.PRODUCTS}/${id}`,
        {},
        null,
        token,
    );
}

async function createProduct(token, body) {
    return await makeSecureApiCall('POST', ApiUrls.PRODUCTS, {}, body, token);
}

async function uploadImage(token, productId, file) {
    return await uploadFile(`${ApiUrls.IMAGE}${productId}`, file, token);
}

export default {
    getCategories,
    createProduct,
    uploadImage,
    getProducts,
    getProductById,
    deleteProductById,
    addToProductStock,
    updateProductById,
};

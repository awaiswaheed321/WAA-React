import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

const ApiUrls = Object.freeze({
    POSTS: `${BASE_URL}/post`
});

// Create an Axios instance for easier reuse and configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" }
});

// Helper function for error handling
const handleRequest = (request) =>
    request
        .then((response) => response.data)
        .catch((error) => {
            alert(error.message);
            throw error;
        });

// Function to get all posts
function getAllPosts() {
    return handleRequest(axiosInstance.get(ApiUrls.POSTS));
}

// Function to get a single post by ID
function getPost(id) {
    return handleRequest(axiosInstance.get(`${ApiUrls.POSTS}/${id}`));
}

// Function to delete a post by ID
function deletePost(id) {
    return handleRequest(axiosInstance.delete(`${ApiUrls.POSTS}/${id}`));
}

export default { getAllPosts, getPost, deletePost };

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const ApiUrls = Object.freeze({
    STUDENTS: `${BASE_URL}/students`,
});

// Create an Axios instance for easier reuse and configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
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
function getAllStudents(params) {
    return handleRequest(
        axiosInstance.get(ApiUrls.STUDENTS, {
            params: params,
        }),
    );
}

// Function to get a single post by ID
function getStudent(id) {
    return handleRequest(axiosInstance.get(`${ApiUrls.STUDENTS}/${id}`));
}

// Function to delete a post by ID
function deleteStudent(id) {
    return handleRequest(axiosInstance.delete(`${ApiUrls.STUDENTS}/${id}`));
}

function createStudent(post) {
    return handleRequest(axiosInstance.post(ApiUrls.STUDENTS, post));
}

export default { getAllStudents, getStudent, deleteStudent, createStudent };

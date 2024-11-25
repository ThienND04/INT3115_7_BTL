import axios from './axiosConfig';
import Post from '../model/post.js'

// Lấy danh sách tin tức
export const createPost = async (postData) => {
    try {
        const response = await axiosInstance.post('/post', postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response.data);
        throw error;
    }
};

// export const updatePost = async (postId, updatedData) => {
//     try {
//         const response = await axiosInstance.put(`/post/${postId}`, updatedData);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating post:', error.response.data);
//         throw error;
//     }
// };

export const deletePost = async (postId) => {
    try {
        await axiosInstance.delete(`/post`, postId);
        return true; // Success
    } catch (error) {
        console.error('Error deleting post:', error.response.data);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post by ID:', error.response.data);
        throw error;
    }
};

export const getPostsByCategory = async (category, page, perPage) => {
    try {
        const response = await axiosInstance.get(`/posts/newPostByCategory?category=${category}&page=${page}&perpage=${perPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by category:', error.response.data);
        throw error;
    }
};
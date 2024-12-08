import axiosInstance from './axiosConfig';

// tạo post
export const createPost = async (title, content, category) => {
    try {
        const response = await axiosInstance.put('/post', {
            'postId': 0, 
            'title': title,
            'content': content,
            'category': category, 
            'date': getCurrentDate,
            'viewCount': Math.floor(Math.random() * 1000)
        });
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
        const response = await axiosInstance.get(`/post/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post by ID:', error.response.data);
        throw error;
    }
};

export const getPostsByCategory = async (category, page, perPage) => {
    try {
        const response = await axiosInstance.get(`/post/newPostByCategory?category=${category}&page=${page}&perPage=${perPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by category:', error.response.data);
        throw error;
    }
};

export const getNewPosts = async (page, perPage) => {
    try {
        const response = await axiosInstance.get(`/post/newPost?page=${page}&perPage=${perPage}`);
        return response.data; // Assumes the API returns a list of posts
    } catch (error) {
        console.error('Error fetching new posts:', error.response?.data || error.message);
        throw error;
    }
};

const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
}
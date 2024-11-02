import * as post from '../Domain/post.js'

export const createNewPost = async (title, content, user_id) => {
    try {
        await post.createPost(title, content, user_id);
        return ('Post created!');
    } catch (e) {
        return ('Error received trying to create post : ' + e);
    }
}

export const upvotePost = async (post_id, user_id) => {
    try {
        await post.upvotePostX(post_id, user_id);
        return ('Post upvoted!');
    } catch (e) {
        return ('Error received trying to upvote post : ' + e);
    }
}

export const downvotePost = async (post_id, user_id) => {
    try {
        await post.downvotePostX(post_id, user_id);
        return ('Post downvoted!');
    } catch (e) {
        return ('Error received trying to downvote post : ' + e);
    }
}

export const readAllPostsByUserId = async (user_id) => {
    try {
        return await post.readAllPostsByUser(user_id);
    } catch (e) {
        return ('Error received trying to read posts : ' + e);
    }
}

export const deletePost = async (post_id, user_id) => {
    try {
        await post.deletePostX(post_id, user_id);
        return ('Post deleted!');
    } catch (e) {
        return ('Error received trying to delete post : ' + e);
    }
}

export const updatePostTitle = async (post_id, new_title, user_id) => {
    try {
        await post.updatePostTitleX (post_id, new_title, user_id);
        return ('Post title updated!');
    } catch (e) {
        return ('Error received trying to update post title : ' + e);
    }
}

export const updatePostContent = async (post_id, new_content, user_id) => {
    try {
        await post.updatePostContentX (post_id, new_content, user_id);
        return ('Post content updated!');
    } catch (e) {
        return ('Error received trying to update post content : ' + e);
    }
}
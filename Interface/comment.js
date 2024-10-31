import * as comment from "../Domain/comment.js";

export const createComment = async (id, user_id, post_id, content) => {
    try {
        const comment_id =  await comment.createComment(id, user_id, post_id, content);
        return ("Comment created!");
    } catch (e) {
        throw ("Error while creating comment : " + e);
    }
}

export const readCommentsByPostId = async (post_id) => {
    try {
        return await comment.readCommentsByPostId(post_id);
    } catch (e) {
        throw ("Error while reading comments : " + e);
    }
}
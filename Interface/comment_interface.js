import * as comment from "../Domain/comment_domain.js";

export const createComment = async (id, user_id, post_id, content) => {
    try {
        const comment_id =  await comment.createComment(id, user_id, post_id, content);
        return ("Comment created!");
    } catch (e) {
        return ("Error while creating comment : " + e);
    }
}

export const readCommentsByPostId = async (post_id) => {
    try {
        return await comment.readCommentsByPostId(post_id);
    } catch (e) {
        return ("Error while reading comments : " + e);
    }
}

export const upvoteComment = async (comment_id, user_id) => {
    try {
        await comment.upvoteComment(comment_id, user_id);
        return ("Comment upvoted!");
    } catch (e) {
        return ("Error while upvoting comment : " + e);
    }
}

export const downvoteComment = async (comment_id, user_id) => {
    try {
        await comment.downvoteComment(comment_id, user_id);
        return ("Comment downvoted!");
    } catch (e) {
        return ("Error while downvoting comment : " + e);
    }
}

export const deleteComment = async (comment_id, user_id) => {
    try {
        await comment.deleteComment(comment_id, user_id);
        return ("Comment deleted!");
    } catch (e) {
        return ("Error while deleting comment : " + e);
    }
}

export const updateCommentContent = async (comment_id, content, user_id) => {
    try {
        await comment.updateCommentContent(comment_id, content, user_id);
        return ("Comment content updated!");
    } catch (e) {
        return ("Error while updating comment content : " + e);
    }
}
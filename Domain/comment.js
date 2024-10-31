import * as db from "../Database/comment.js";

export const createComment = async (user_id, post_id, content) => {
    const comment = {
        user_id: user_id,
        post_id: post_id,
        content: content,
        upvotes: [],
        downvotes: []
    }

    const id = await db.insertComment(comment);
    return id.Comment_id;
}

export const readCommentsByPostId = async (post_id) => {
    return await db.readCommentsByPostId(post_id);
}


import * as db from "../Database/comment.js";
import * as helper from "../Helpers/comment.js";

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
    const db_comments = await db.readCommentsByPostId(post_id);
    return db_comments.map(helper.mapToFrontEndType);
}

export const upvoteComment = async (comment_id, user_id) => {
    const comment = await readCommentById(comment_id);
    if (!comment) {
        throw "Comment not found when trying to upvote. Comment Id : " + comment_id;
    } else {
        const upvotes = comment.upvotes;
        if (!upvotes.includes(user_id)) {
            upvotes.push(user_id);
            await db.updateCommentUpvote(comment_id, upvotes);
        } else {
            throw "User already upvoted this comment";
        }
    }
}

export const downvoteComment = async (comment_id, user_id) => {
    const comment = await readCommentById(comment_id);
    if (!comment) {
        throw "Comment not found when trying to downvote. Comment Id : " + comment_id;
    } else {
        const downvotes = comment.downvotes;
        if (!downvotes.includes(user_id)) {
            downvotes.push(user_id);
            await db.updateCommentDownVote(comment_id, downvotes);
        } else {
            throw "User already downvoted this comment";
        }
    }
}

const readCommentById = async (comment_id) => {
    const db_comment = await db.readCommentById(comment_id);
    return helper.mapToDomainType(db_comment);
}


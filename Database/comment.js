import {sql} from "./db.js";

export const insertComment = async (comment) => {
    const comment_id =
        await sql `
           insert into comments
               (user_id, post_id, content, upvotes, downvotes)
           values
               (${comment.user_id}
               , ${comment.post_id}
               , ${comment.content}
               , ${comment.upvotes}
               , ${comment.downvotes})
           returning comment_id
        `
    return comment_id[0];
}

export const readCommentsByPostId = async (post_id) => {
    const comments = await sql `
        select * from comments where post_id = ${post_id}
    `
    return comments;
}

export const readCommentById = async (comment_id) => {
    const comment = await sql `
        select * from comments where comment_id = ${comment_id}
    `
    return comment[0];
}

export const updateCommentUpvote = async (comment_id, upvotes) => {
    await sql `
        update comments
        set upvotes = ${upvotes}
        where comment_id = ${comment_id}
    `
}

export const updateCommentDownVote = async (comment_id, downvotes) => {
    await sql `
        update comments
        set downvotes = ${downvotes}
        where comment_id = ${comment_id}
    `
}
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
import {sql} from "./db.js";

export const readPostsByUserId = async (user_id) => {
    const posts =
        await sql`
            select 
               post_id,post_title, post_content, created_by, upvoteArray, downvoteArray
            from posts
            where created_by = ${user_id}   
        `
    return posts;
}

export const readPostByPostId = async (post_id) => {
    const posts =
        await sql`
            select 
               post_id,post_title, post_content, created_by, upvoteArray, downvoteArray
            from posts
            where post_id = ${post_id}   
        `
    return posts[0]
}

export const insertPost = async (post) => {
    const post_id =
        await sql `
           insert into posts
               (post_title, post_content, created_by, upvoteArray, downvoteArray)
           values
               (${post.post_title}
               , ${post.post_content}
               , ${post.created_by}
               , ${post.upvoteArray}
               , ${post.downvoteArray})
           returning post_id
        `
    return post_id[0];
}

export const updatePostUpvote = async (post_id, upvoteArr) => {
    const update = await
        sql `
         update posts
            set upvoteArray = ${upvoteArr}
            where post_id = ${post_id}
        `;
    return update[0];
}

export const updatePostDownVote = async (post_id, downvoteArr) => {
    const update = await
        sql `
         update posts
            set downvoteArray = ${downvoteArr}
            where post_id = ${post_id}
        `;
    return update[0];
}

export const updatePostTitle = async (post_id, new_title) => {
    const update = await
        sql `
         update posts
            set post_title = ${new_title}
            where post_id = ${post_id}
        `;
    return update[0];
}

export const updatePostContent = async (post_id, new_content) => {
    const update = await
        sql `
         update posts
            set post_content = ${new_content}
            where post_id = ${post_id}
        `;
    return update[0];
}

export const deletePost = async (post_id) => {
    const deletePost = await sql`
            delete from posts
            where post_id = ${post_id}
        `
    return deletePost[0];
}

export const readPostActivityByUserId = async (user_id) => {
    const posts =
        await sql`
            select * from user_votes 
            where 
               downvoter_id = ${user_id} or 
               upvoter_id = ${user_id} or 
               post_owner_id = ${user_id}
        `
    return posts;
}
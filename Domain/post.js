
// public method
import {sql} from "../Helpers/databaseController.js";

export const createPost = async (title, content, user_id) => {
    let post = {
        post_id: 1, // placeholder
        post_title: title,
        post_content: content,
        created_by: user_id,
        upvoteArray:[],
        downvoteArray:[]
    }
    const post_id = await insertPost(post);
    return post_id;
}

const createVoteArrayFromDatabase = (jsonString) => {
    let arr;
    try {
        // Replace curly braces with square brackets and remove double quotes around numbers
        const formattedString = jsonString.replace(/{/g, '[').replace(/}/g, ']').replace(/\"/g, '');
        arr = JSON.parse(formattedString);
        if (!Array.isArray(arr)) {
            console.log("JSON did not return an array");
            arr = [];
        }
    } catch (e) {
        console.log("Error parsing JSON: " + e);
        arr = [];
    }

    return arr.map(Number);
}

export const upvotePostX = async (post_id, user_id) => {
    let post_to_update = await readPostsByPostId(post_id);
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let upArr = createVoteArrayFromDatabase(post_to_update['upvotearray'])
        console.log("Checking : " + upArr + "For : " + user_id);
        const exist = upArr.includes(user_id)
        if (!exist){
            upArr.push(user_id)
            await updatePostUpvote(post_id, upArr);
        } else {
            throw "User already up voted this post";
        }
    }
}

export const downvotePostX = async (post_id, user_id) => {
    let post_to_update = await readPostsByPostId(post_id);
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let downArr = createVoteArrayFromDatabase(post_to_update['downvotearray'])
        console.log("Checking : " + downArr + "For : " + user_id);
        const exist = downArr.includes(user_id)
        if (!exist){
            downArr.push(user_id)
            await updatePostDownVote(post_id, downArr);
        } else {
            throw "User already up voted this post";
        }
    }
}

export const deletePostX = async (post_id, user_id) => {
    let posts = await readPosts();
    let new_posts = posts.filter(p => confirmPostDeletionX(p, user_id, post_id))
    return await rewriteToFileStream(filename, headerMap, new_posts);
}

export const updatePostContentX = async (post_id, new_content, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        if (user_id === post_to_update.created_by){
            let updated_post = {
                post_id : post_to_update.post_id,
                post_title: post_to_update.post_title,
                post_content: new_content,
                created_by: post_to_update.created_by,
                upvoteArray: post_to_update.upvoteArray,
                downvoteArray: post_to_update.downvoteArray
            }
            return await updatePostDatabase(updated_post);
        } else {
            throw "User not authorised to update post content"
        }
    }
}
export const updatePostTitleX = async (post_id, new_title, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        if (user_id === post_to_update.created_by){
            let updated_post = {
                post_id : post_to_update.post_id,
                post_title: new_title,
                post_content: post_to_update.post_content,
                created_by: post_to_update.created_by,
                upvoteArray: post_to_update.upvoteArray,
                downvoteArray: post_to_update.downvoteArray
            }
            return await updatePostDatabase(updated_post);
        } else {
            throw "User not authorised to update post title"
        }
    }
}
export const readAllPostsByUser = async (user_id) => {
    const all_posts = await readPosts()
    return all_posts.filter(p => p.created_by === user_id);
}
// Private methods
const editPost = (post, new_post) => {
    if (post.post_id === new_post.post_id){
        return new_post
    } else {
        return post
    }
}
const confirmPostDeletionX = (post, user_id, post_to_delete_id) => {
    if (post.post_id === post_to_delete_id) {
        if (post.created_by === user_id) {
            return true
        } else {
            throw "User not authorised to delete post"
        }
    } else {
        return false
    }
}
const arrayToParsableString = (arr) => {
    return arr.join('|');
}
const stringToArray = (s) => {
    console.log("Parsing : " + s)
    if (!s || s.trim() === '') {
        console.log("Dealing with empty string");
        return [];
    }
    else {
        console.log("String found parsing to array");
        return s.split('|').map(Number);
    }
}
const readPostsByUserId = async (user_id) => {
    const posts =
        await sql`
            select 
               post_id,post_title, post_content, created_by, upvoteArray, downvoteArray
            from posts
            where created_by = ${user_id}   
        `
    return posts

}

const readPostsByPostId = async (post_id) => {
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
const updatePostUpvote = async (post_id, upvoteArr) => {
    const update = await
        sql `
         update posts
            set upvoteArray = ${upvoteArr}
            where post_id = ${post_id}
        `;
    return update;
}

const updatePostDownVote = async (post_id, downvoteArr) => {
    const update = await
        sql `
         update posts
            set downvoteArray = ${downvoteArr}
            where post_id = ${post_id}
        `;
    return update;
}

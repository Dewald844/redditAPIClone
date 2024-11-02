import * as db from "../Database/post.js";
import * as user_domain from "../Domain/user.js";
import * as helpers from "../Helpers/post.js";

// public functions

export const createPost = async (title, content, user_id) => {
    let post = {
        post_title: title,
        post_content: content,
        created_by: user_id,
        upvoteArray:[],
        downvoteArray:[]
    }
    return await db.insertPost(post);
}

export const upvotePostX = async (post_id, user_id) => {
    let post_to_update = await db.readPostByPostId(post_id);
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let upArr = helpers.createVoteArrayFromDatabase(post_to_update['upvotearray'])
        console.log("Checking : " + upArr + "For : " + user_id);
        const exist = upArr.includes(user_id)
        if (!exist){
            upArr.push(user_id)
            await db.updatePostUpvote(post_id, upArr);
        } else {
            throw "User already up voted this post";
        }
    }
}

export const downvotePostX = async (post_id, user_id) => {
    let post_to_update = await db.readPostByPostId(post_id);
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let downArr = helpers.createVoteArrayFromDatabase(post_to_update['downvotearray'])
        console.log("Checking : " + downArr + "For : " + user_id);
        const exist = downArr.includes(user_id)
        if (!exist){
            downArr.push(user_id)
            await db.updatePostDownVote(post_id, downArr);
        } else {
            throw "User already up voted this post";
        }
    }
}

export const deletePostX = async (post_id, user_id) => {
    const raw_post = await db.readPostByPostId(post_id);
    const post = helpers.mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await db.deletePost(post_id);
    } else {
        throw "User not authorised to delete post"
    }
}

export const updatePostContentX = async (post_id, new_content, user_id) => {
    const raw_post = await db.readPostByPostId(post_id);
    const post = helpers.mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await db.updatePostContent(post_id, new_content);
    } else {
        throw "User not authorised to update post content"
    }
}

export const updatePostTitleX = async (post_id, new_title, user_id) => {
    const raw_post = await db.readPostByPostId(post_id);
    const post = helpers.mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await db.updatePostTitle(post_id, new_title);
    } else {
        throw "User not authorised to update post title"
    }
}

export const readAllPostsByUserId = async (user_id) => {
    const raw_posts = await db.readPostsByUserId(user_id);
    return await Promise.all(raw_posts.map(await helpers.mapToFrontEndType))
}

export const readAllPostsByUserEmail = async (email) => {
    const user_id = await user_domain.readUserIdByEmail(email);
    return await readAllPostsByUserId(user_id);

}

const confirmPostEditX = (post_id, post_user_id, editing_user_id, post_to_edit_id) => {
    return post_user_id === editing_user_id && post_id === post_to_edit_id;
}
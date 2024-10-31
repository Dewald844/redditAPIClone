
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

export const upvotePostX = async (post_id, user_id) => {
    let post_to_update = await readPostByPostId(post_id);
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
    let post_to_update = await readPostByPostId(post_id);
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
    const raw_post = await readPostByPostId(post_id);
    const post = mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await deletePost(post_id);
    } else {
        throw "User not authorised to delete post"
    }
}

export const updatePostContentX = async (post_id, new_content, user_id) => {
    const raw_post = await readPostByPostId(post_id);
    const post = mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await updatePostContent(post_id, new_content);
    } else {
        throw "User not authorised to update post content"
    }
}
export const updatePostTitleX = async (post_id, new_title, user_id) => {
    const raw_post = await readPostByPostId(post_id);
    const post = mapToDomainType(raw_post);
    if (confirmPostEditX(post_id, post.created_by, user_id, post_id)){
        return await updatePostTitle(post_id, new_title);
    } else {
        throw "User not authorised to update post title"
    }
}

export const readAllPostsByUser = async (user_id) => {
    const raw_posts = await readPostsByUserId(user_id);
    return raw_posts.map(mapToFrontEndType);
}
// Private methods

const mapToFrontEndType = (raw) => {
    return {
        post_id : Number(raw['post_id']),
        post_title : raw['post_title'],
        post_content : raw['post_content'],
        created_by : Number(raw['created_by']),
        upvoteCount : createVoteArrayFromDatabase(raw['upvotearray']).length,
        downvoteCount : createVoteArrayFromDatabase(raw['downvotearray']).length
    }
}

const mapToDomainType = (raw) => {
    return {
        post_id : Number(raw['post_id']),
        post_title : raw['post_title'],
        post_content : raw['post_content'],
        created_by : Number(raw['created_by']),
        upvoteCount : createVoteArrayFromDatabase(raw['upvotearray']),
        downvoteCount : createVoteArrayFromDatabase(raw['downvotearray'])
    }
}

const confirmPostEditX = (post_id, post_user_id, editing_user_id, post_to_edit_id) => {
    if (post_id === post_to_edit_id) {
        if (post_user_id === editing_user_id) {
            return true
        } else {
            throw "User not authorised to delete post"
        }
    } else {
        return false
    }
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

const readPostByPostId = async (post_id) => {
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
    return update[0];
}

const updatePostDownVote = async (post_id, downvoteArr) => {
    const update = await
        sql `
         update posts
            set downvoteArray = ${downvoteArr}
            where post_id = ${post_id}
        `;
    return update[0];
}

const updatePostTitle = async (post_id, new_title) => {
    const update = await
        sql `
         update posts
            set post_title = ${new_title}
            where post_id = ${post_id}
        `;
    return update[0];
}

const updatePostContent = async (post_id, new_content) => {
    const update = await
        sql `
         update posts
            set post_content = ${new_content}
            where post_id = ${post_id}
        `;
    return update[0];
}

const deletePost = async (post_id) => {
    const deletePost = await sql`
            delete from posts
            where post_id = ${post_id}
        `
    return deletePost;
}

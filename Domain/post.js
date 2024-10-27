import { appendToFileStream, readFromFileStream, rewriteToFileStream } from "../Helpers/databaseController.js";


// public methods

export const createPost = async (title, content, user_id) => {
    const existing_posts = await readPosts()
    const new_post_id = existing_posts.length + 1
    console.log('New post id' + new_post_id);
    let post = {
        post_id: new_post_id,
        post_title: title,
        post_content: content,
        created_by: user_id,
        upvoteArray:'',
        downvoteArray:''
    }
    return post;
}

export const upvotePostX = async (post_id, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let upvotedArray = stringToArray(post_to_update.upvoteArray);
        upvotedArray.push(user_id)
        let updated_post = {
            post_id : post_to_update.post_id,
            post_title: post_to_update.post_title,
            post_content: post_to_update.post_content,
            created_by: post_to_update.created_by,
            upvoteArray: arrayToParsableString(upvotedArray),
            downvoteArray: post_to_update.downvoteArray
        }
        updatePostDatabase(updated_post).then(() => {
            return;
        });

    }
}

export const downvotePostX = async (post_id, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let downvoteArr = stringToArray(post_to_update.downvoteArray);
        downvoteArr.push(user_id);
        let updated_post = {
            post_id : post_to_update.post_id,
            post_title: post_to_update.post_title,
            post_content: post_to_update.post_content,
            created_by: post_to_update.created_by,
            upvoteArray: post_to_update.upvoteArray,
            downvoteArray: arrayToParsableString(downvoteArr),
        }
        return await updatePostDatabase(updated_post);
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

export const readAllPostsbyUser = async (user_id) => {
    const all_posts = await readPosts()
    let user_posts = all_posts.filter(p => p.created_by === user_id);
    return user_posts;
}

// Private methods

const editPost = (post, new_post) => {
    if (post.post_id == new_post.post_id){
        return new_post
    } else {
        return post
    }
}

const confirmPostDeletionX = (post, user_id, post_to_delete_id) => {
    if (post.post_id == post_to_delete_id) {
        if (post.created_by == user_id) {
            return true
        } else {
            throw "User not autorized to delete post"
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

// Database methods

const headerMap = [
    {id: 'post_id', title: 'post_id'},
    {id: 'post_title', title: 'post_title'},
    {id: 'post_content', title: 'post_content'},
    {id: 'created_by', title: 'created_by'},
    {id: 'upvoteArray', title: 'upvoteArray'},
    {id: 'downvoteArray', title: 'downvoteArray'}
];

const filename = 'Database/posts.csv';

const readPosts = async () => {
    return await readFromFileStream(filename)
}

export const writePosts = async (post) => {
    return await appendToFileStream(filename, headerMap, post);
}

const updatePostDatabase = async (new_post) => {
    const current_posts = await readPosts();
    const updated_posts = current_posts.map(p => editPost(p, new_post));
    return await rewriteToFileStream(filename, headerMap, updated_posts);
}
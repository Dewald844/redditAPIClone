import { appendToFileStream, readFromFileStream, rewriteToFileStream } from "../Helpers/databaseController"


// public methods

export const createPost = async (title, content, user_id) => {
    const new_post_id = await readPosts().length + 1
    let post = {
        post_id: new_post_id,
        post_title: title,
        post_content: content,
        created_by: user_id,
        upvoteCount: [],
        downvoteCount:[]
    }
    return post;
}

export const upvotePostX = async (post_id, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let updated_post = {
            post_id : post_to_update.post_id,
            post_title: post_to_update.post_title,
            post_content: post_to_update.post_content,
            created_by: post_to_update.created_by,
            upvoteCount: post_to_update.upvoteCount.push(user_id),
            downvoteCount: post_to_update.downvoteCount
        }
        return await updatePostDatabase(updated_post);
    }
}

export const downvotePostX = async (post_id, user_id) => {
    const posts = await readPosts();
    let post_to_update = posts.find(p => p.post_id === post_id)
    if (!post_to_update){
        throw ("Post not found when trying to upvote. Post Id : " + post_id );
    } else {
        let updated_post = {
            post_id : post_to_update.post_id,
            post_title: post_to_update.post_title,
            post_content: post_to_update.post_content,
            created_by: post_to_update.created_by,
            upvoteCount: post_to_update.upvoteCount,
            downvoteCount: post_to_update.downvoteCount.push[user_id]
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
                upvoteCount: post_to_update.upvoteCount,
                downvoteCount: post_to_update.downvoteCount
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
                upvoteCount: post_to_update.upvoteCount,
                downvoteCount: post_to_update.downvoteCount
            }
            return await updatePostDatabase(updated_post);
        } else {
            throw "User not authorised to update post title"
        }
    }
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

// Database methods

const headerMap = [
    {id: 'post_id', title: 'post_id'},
    {id: 'post_title', title: 'post_title'},
    {id: 'post_content', title: 'post_content'},
    {id: 'created_by', title: 'created_by'},
    {id: 'upvoteCount', title: 'upvoteCount'},
    {id: 'downvoteCount', title: 'downvoteCount'}
];

const filename = 'Database/posts.csv';

const readPosts = async () => {
    return await readFromFileStream(filename)
}

const writePosts = async (post) => {
    return await appendToFileStream(filename, headerMap, post);
}

const updatePostDatabase = async (new_post) => {
    const current_posts = await readPosts();
    const updated_posts = current_posts.map(p => editPost(p, new_post));
    return await rewriteToFileStream(filename, headerMap, updated_posts);
}

const readAllPostsbyUser = async (user_id) => {
    const all_posts = await readPosts()
    let user_posts = all_posts.filter(p => p.created_by === user_id);
    return user_posts;
}
import express from 'express';

import * as user from "./Interface/user.js";
import * as post from "./Interface/post.js";

const app = express();
const port = 3000;

// ======================= User API calls =====================

// User create API
app.post('/user/create/name/:name/email/:email/password/:password', async (req, res) => {
   const name     = req.params.name;
   const email    = req.params.email;
   const password = req.params.password;
   const response = await user.createNewUser(name, email, password);
   res.send(response);
});

//User log in API
app.post('/user/login/email/:email/password/:password', async (req, res) => {
    const email    = req.params.email;
    const password = req.params.password;
    const response = await user.logInUser(email, password);
    res.send(response);
});

// ======================= Post API calls =====================

// Post create API
app.post('/post/create/title/:title/content/:content/user/:user', async (req, res) => {
    const title = req.params.title;
    const content = req.params.content;
    const user_id = Number(req.params.user);
    const response = await post.createNewPost(title, content, user_id);
    res.send(response);
});

// Upvote Post API
app.post('/post/upvote/post/:post/user/:user', async (req, res) => {
    const post_id = Number(req.params.post);
    const user_id = Number(req.params.user);
    const response = await post.upvotePost(post_id, user_id);
    res.send(response);
});

// Down vote Post API
app.post('/post/downvote/post/:post/user/:user', async (req, res) => {
    const post_id = req.params.post;
    const user_id = Number(req.params.user);
    const response = await post.downvotePost(post_id, user_id);
    res.send(response);
});

// Read all posts by user
app.get('/post/read/user/:user', async (req, res) => {
    const user_id = Number(req.params.user);
    const response = await post.readAllPostsByUserId(user_id);
    res.send(response);
})

// Delete post API
app.delete('/post/delete/post/:post/user/:user', async (req, res) => {
    const post_id = Number(req.params.post);
    const user_id = Number(req.params.user);
    const response = await post.deletePost (post_id, user_id);
    res.send(response);
});

// Update post content API
app.post('/post/update/title/:title/post/:post/user/:user', async (req, res) => {
    const post_id = Number(req.params.post);
    const user_id = Number(req.params.user);
    const new_title = req.params.title;
    const response = await post.updatePostTitle(post_id, new_title, user_id);
    res.send(response);
});

// Update post content API
app.post('/post/update/content/:content/post/:post/user/:user', async (req, res) => {
    console.log("trying to update post content");
    const post_id = Number(req.params.post);
    const user_id = Number(req.params.user);
    const new_content = req.params.content;
    const response = await post.updatePostContent(post_id, new_content, user_id);
    res.send(response);
});

// =======================  Startup code  =====================
app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
})
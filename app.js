import express from 'express';
import bodyParser from 'body-parser';
import * as user from "./Interface/user.js";
import * as post from "./Interface/post.js";
import * as comment from "./Interface/comment.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// ======================= User API calls =====================

// User create API
app.post('/user/create', async (req, res) => {
    const { name, email, password } = req.body;
    const response = await user.createNewUser(name, email, password);
    res.send(response);
});

// User log in API
app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await user.logInUser(email, password);
        res.send(response);
    } catch (error) {
        res.status(401).send({ error: error });
    }
});

// ======================= Post API calls =====================

// Post create API
app.post('/post/create', user.verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.user_id;
    const response = await post.createNewPost(title, content, user_id);
    res.send(response);
});

// Upvote Post API
app.post('/post/upvote', user.verifyToken, async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user_id;
    const response = await post.upvotePost(post_id, user_id);
    res.send(response);
});

// Downvote Post API
app.post('/post/downvote', user.verifyToken, async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user_id;
    const response = await post.downvotePost(post_id, user_id);
    res.send(response);
});

// Read all posts by user
app.get('/post/read', user.verifyToken, async (req, res) => {
    const user_id = req.user_id;
    const response = await post.readAllPostsByUserId(user_id);
    res.send(response);
});

// Read all posts by user email
app.get('/post/read/email', user.verifyToken, async (req, res) => {
    const { email } = req.body;
    const response = await post.readPostByUserEmail(email);
    res.send(response);
});

// Delete post API
app.delete('/post/delete', user.verifyToken, async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user_id;
    const response = await post.deletePost(post_id, user_id);
    res.send(response);
});

// Update post title API
app.post('/post/update/title', user.verifyToken, async (req, res) => {
    const { post_id, new_title } = req.body;
    const user_id = req.user_id;
    const response = await post.updatePostTitle(post_id, new_title, user_id);
    res.send(response);
});

// Update post content API
app.post('/post/update/content', user.verifyToken, async (req, res) => {
    const { post_id, new_content } = req.body;
    const user_id = req.user_id;
    const response = await post.updatePostContent(post_id, new_content, user_id);
    res.send(response);
});

// ======================= Comment API calls =====================

// Comment create API
app.post('/comment/create', user.verifyToken, async (req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.user_id;
    const response = await comment.createComment(post_id, user_id, content);
    res.send(response);
});

// Read comments by post API
app.get('/comment/read', user.verifyToken, async (req, res) => {
    const { post_id } = req.body;
    const response = await comment.readCommentsByPostId(post_id);
    res.send(response);
});

// Upvote comment API
app.post('/comment/upvote', user.verifyToken, async (req, res) => {
    const { comment_id } = req.body;
    const user_id = req.user_id;
    const response = await comment.upvoteComment(comment_id, user_id);
    res.send(response);
});

// Downvote comment API
app.post('/comment/downvote', user.verifyToken, async (req, res) => {
    const { comment_id } = req.body;
    const user_id = req.user_id;
    const response = await comment.downvoteComment(comment_id, user_id);
    res.send(response);
});

// Delete comment API
app.delete('/comment/delete', verifyToken, async (req, res) => {
    const { comment_id } = req.body;
    const user_id = req.user_id;
    const response = await comment.deleteComment(comment_id, user_id);
    res.send(response);
});

// Update comment content API
app.post('/comment/update', user.verifyToken, async (req, res) => {
    const { comment_id, content } = req.body;
    const user_id = req.user_id;
    const response = await comment.updateCommentContent(comment_id, content);
    res.send(response);
});

// =======================  Startup code  =====================
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
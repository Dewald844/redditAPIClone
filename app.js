import express from 'express';

import { createUser, writeUsers, userLogin } from './Domain/user.js';
import { createPost, downvotePostX, upvotePostX, writePosts } from './Domain/post.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ======================= User API calls =====================
// User create API
app.post('/user/create/name/:name/email/:email/password/:password', async (req, res) => {
    const name     = req.params.name;
    const email    = req.params.email;
    const password = req.params.password;
    const newUser = await createUser(name, email, password);
    writeUsers(newUser).then(() => {
        res.send('User created! Your user id : ' + newUser.user_id);
    });
});

// User log in API
app.post('/user/login/email/:email/password/:password', async (req, res) => {
    const email    = req.params.email;
    const password = req.params.password;
    const user = await userLogin(email, password);
    if (!user){
        res.send('User not found!');
    } else {
        res.send('Welcome ' + user.user_name +'!, your id : ' + user.user_id);
    }
});

// ======================= Post API calls =====================
// Post create API
app.post('/post/create/title/:title/content/:content/user/:user', async (req, res) => {
    let title = req.params.title;
    let content = req.params.content;
    let user_id = req.params.user;
    const post = await createPost(title, content, user_id);
    if (!post){
        res.send("Post not created successfully");
    } else {
        writePosts(post).then(() => {
            res.send("Post created successfully");
        })
    }
});

app.post('/post/upvote/post/:post/user/:user', async (req, res) => {
    console.log("trying to upvote post");
    let post_id = req.params.post
    let user_id = req.params.user
    try {
        upvotePostX(post_id, user_id).then(() => {
            res.send("Post upvoted!")
        })
    } catch (error) {
        res.send("Error encountered upvoting post :" + error);
    }
});

app.post('/post/downvote/post/:post/user/:user', async (req, res) => {
    console.log("trying to upvote post");
    let post_id = req.params.post
    let user_id = req.params.user
    try {
        downvotePostX(post_id, user_id).then(() => {
            res.send("Post upvoted!")
        })
    } catch (error) {
        res.send("Error encountered downvoting post :" + error);
    }
});

// =======================  Startup code  =====================
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
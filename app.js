import express from 'express';

import { createUser, userLogin } from './Domain/user.js';
import { createPost, upvotePostX, downvotePostX } from './Domain/post.js';

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
   res.send('User create with id :' + newUser);
});

//User log in API
app.post('/user/login/email/:email/password/:password', async (req, res) => {
    const email    = req.params.email;
    const password = req.params.password;
    try {
        const user = await userLogin(email, password);
        console.log(user);
        res.send('Welcome '+ user[0] + '!, your id : ' + user[1]);
    } catch (e) {
        res.send('Error received trying to sign you in : ' + e);
    }
});

// ======================= Post API calls =====================
// Post create API
app.post('/post/create/title/:title/content/:content/user/:user', async (req, res) => {
    let title = req.params.title;
    let content = req.params.content;
    let user_id = Number(req.params.user);
    const post = await createPost(title, content, user_id);
    if (!post){
        res.send("Post not created successfully");
    } else {
        res.send("Post created successfully");
    }
});

app.post('/post/upvote/post/:post/user/:user', async (req, res) => {
    console.log("trying to upvote post");
    let post_id = req.params.post;
    let user_id = Number(req.params.user);
    try {
        await upvotePostX(post_id, user_id)
        res.send("Post down voted!")
    } catch (error) {
        res.send(error);
    }
});

app.post('/post/downvote/post/:post/user/:user', async (req, res) => {
    console.log("trying to upvote post");
    let post_id = req.params.post;
    let user_id = Number(req.params.user);
    try {
        await downvotePostX(post_id, user_id);
        res.send("Post upvoted!");
    } catch (error) {
        res.send("Error encountered downvoting post :" + error);
    }
});

 // =======================  Startup code  =====================
 app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
})
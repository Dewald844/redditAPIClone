import express from 'express';

import { createUser, writeUsers, userLogin } from './Domain/user.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user/create/name/:name/email/:email/password/:password', async (req, res) => {
    const name     = req.params.name;
    const email    = req.params.email;
    const password = req.params.password;

    const newUser = await createUser(name, email, password);

    writeUsers(newUser).then(() => {
        res.send('User created! Your user id : ' + id);
    });
});

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
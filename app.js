import express from 'express';

import { createUser, readUsers, writeUsers, userLogin } from './Domain/user.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user/create/name/:name/email/:email/password/:password', async (req, res) => {

    let users = await readUsers();

    console.log('users loaded : ' + users.length);

    const id       = users.length + 1;
    const name     = req.params.name;
    const email    = req.params.email;
    const password = req.params.password;

    const newUser = await createUser(id, name, email, password);

    writeUsers(newUser).then(() => {
        res.send('User created! Your user id : ' + id);
    });
});

app.post('/user/login/email/:email/password/:password', async (req, res) => {

    const email    = req.params.email;
    const password = req.params.password;

    let users = await readUsers();

    console.log('users loaded : ' + users);

    let user = users.find(u => u.email_address.trim().toLowerCase() === email.trim().toLowerCase());

    if (!user) {
        res.send(email + ' not found!');
    } else {
        if (await userLogin(email, password, user.user_password)) {
            res.send('User logged in!, your id : ' + user.user_id);
        } else {
            res.send('User not logged in!');
        }
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
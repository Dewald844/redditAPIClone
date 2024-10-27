import express from 'express';

import { createUser, readUsers, writeUsers, userLogin } from './Domain/user.js';

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user/create/name/:name/email/:email/password/:password', async (req, res) => { 

    readUsers().then( async (users) => {

        const id       = users.length + 1;
        const name     = req.params.name;
        const email    = req.params.email;
        const password = req.params.password;

        createUser(id, name, email, password).then( async (newUser) => {
            users.push(newUser);
            await writeUsers(users);
        });

        res.send('User created!' + JSON.stringify(users));
    });
});

app.post('/user/login/email/:email/password/:password', async (req, res) => { 

    const email    = req.params.email;
    const password = req.params.password;

    readUsers().then( async (users) => {

        let user = users.find(user => user.email_address === email);

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

    let user = users.find(user => user.email_address === email);

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
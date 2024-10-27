import bcrypt from 'bcrypt';
import {readFromFileStream, writeToFileStream} from '../Helpers/databaseController.js';

// User domain model and methods

// Public methods
export const createUser = async (name, email, password) => {
    const new_user_id = await readUsers().length + 1;
    const hashedPassword = await generateHashedPassword(password);
    let user = {
        user_id: new_user_id,
        user_name: name,
        email_address: email,
        user_password: hashedPassword
    };

    return user;
}

const confirmLogin = async (enteredPassword, passwordFromDatabase) => {
    if (await comparePassword(enteredPassword, passwordFromDatabase)) {
        return true
    } else {
        return "Invalid email or password";
    }
}

export const userLogin = async (email, password) => {
    let users = await readUsers();

    console.log('users loaded : ' + users);

    let user = users.find(u => u.email_address.trim().toLowerCase() === email.trim().toLowerCase());

    if (!user) {
        res.send(email + ' not found!');
    } else {
        if (await userLogin(email, password, user.user_password)) {
            return user
        } else {
            return null
        }
    }
}

// Private methods

const comparePassword = async (password, hashed_password) => {
    bcrypt.compare(password, hashed_password, (err, result) => {
        if (err) {
            console.log("Error encountered comparing user password" + err);
        } else {
            return result;
        }
    })
}

const generateHashedPassword = async (password) => {
    try {
        const salt = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject("Error encountered generating user password salt: " + err);
                } else {
                    resolve(salt);
                }
            });
        });

        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject("Error encountered hashing user password: " + err);
                } else {
                    resolve(hash);
                }
            });
        });

        return hash;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Reader methods

export const readUsers = async () => {
    return await readFromFileStream('Database/users.csv');
}

// Writer methods

export const writeUsers = async (user) => {
    const headerMap = [
        {id: 'user_id', title: 'user_id'},
        {id: 'user_name', title: 'user_name'},
        {id: 'email_address', title: 'email_address'},
        {id: 'user_password', title: 'user_password'}
    ];

    await writeToFileStream('Database/users.csv', headerMap, user);
}

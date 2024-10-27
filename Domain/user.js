import bcrypt from 'bcrypt';
import {readFromFileStream, writeToFileStream} from '../Helpers/databaseController.js';

// User domain model and methods

// Public methods
export const createUser = async (id, name, email, password) => {
    const hashedPassword = await generateHashedPassword(password);
    let user = {
        user_id: id,
        user_name: name,
        email_address: email,
        user_password: hashedPassword
    };

    return user;
}

export const userLogin = async (enteredPassword, passwordFromDatabase) => {
    if (await comparePassword(enteredPassword, passwordFromDatabase)) {
        return true
    } else {
        return "Invalid email or password";
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

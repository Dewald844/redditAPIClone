import bcrypt from 'bcrypt';
import {sql} from "../Helpers/databaseController.js";
// User domain model and methods

// Public methods
export const createUser = async (name, email, password) => {
    const hashedPassword = await generateHashedPassword(password);
    let new_user =  {
        user_id: 1, // placeholder
        user_name: name,
        email_address: email,
        user_password: hashedPassword
    };

    const new_id = await insertUser(new_user);
    return new_id.user_id;
}

export const userLogin = async (email, password) => {

    let user = await readUserByEmail(email);

    if (!user) {
        throw "User not found in database , please ensure email is correct";
    } else {
        if (await confirmLogin(password, user.user_password)) {
            return [user.user_name, user.user_id];
        } else {
            throw "Email and or password does not match"
        }
    }
}

// Private methods

const comparePassword = async (password, hashed_password) => {
    try {
        const result = await bcrypt.compare(password, hashed_password);
        console.log("Compare result : " + result);
        return result;
    } catch (err) {
        console.log("Error encountered comparing user password: " + err);
        return false;
    }
}

const confirmLogin = async (enteredPassword, passwordFromDatabase) => {
    if (await comparePassword(enteredPassword, passwordFromDatabase)) {
        return true
    } else {
        throw "Invalid email or password";
    }
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

// Database methods
export const readUserByEmail = async (email) => {
    const users  =
        await sql`
            select 
            user_id, user_name, email_address, user_password
            from users
            where email_address = ${email}
        `
    return users[0];
}

export const insertUser = async (user) => {
    const new_id =
        await sql`
            insert into users
               (user_name, email_address, user_password)
            values 
               (${user.user_name}, ${user.email_address}, ${user.user_password})
            returning user_id
        `
    return new_id[0];
}

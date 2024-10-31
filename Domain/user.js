import bcrypt from 'bcrypt';
import * as db from '../Database/user.js';
import * as helpers from "../Helpers/user.js";

// Public functions

export const createUser = async (name, email, password) => {
    const hashedPassword = await helpers.generateHashedPassword(password);
    let new_user =  {
        user_name: name,
        email_address: email,
        user_password: hashedPassword
    };

    const new_id = await db.insertUser(new_user);
    return new_id.user_id;
}

export const userLogin = async (email, password) => {

    let user = await db.readUserByEmail(email);

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

// Private functions

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


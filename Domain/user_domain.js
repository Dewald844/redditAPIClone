import * as db from '../Database/user_database.js';
import * as helpers from "../Helpers/user_helpers.js";

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
        if (await helpers.confirmLogin(password, user.user_password)) {
            return [user.user_name, user.user_id];
        } else {
            throw "Email and or password does not match"
        }
    }
}

export const readUserIdByEmail = async (email) => {
    const user =  await db.readUserByEmail(email);
    if (!user) {
        throw "User not found in database , please ensure email is correct";
    }
    return user['user_id'];
}



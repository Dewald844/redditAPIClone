import * as user from "../Domain/user.js";

// These functions should only return user-friendly responses

export const createNewUser = async (name, email, password) => {
    try {
        const new_user = await user.createUser(name, email, password);
        return ('User created with id : ' + new_user);
    } catch (e) {
        return ('Error received trying to create user : ' + e);
    }
}

export const logInUser = async (email, password) => {
    try {
        const returned_u = await user.userLogin(email, password);
        return ('Welcome '+ returned_u[0] + '!, your id : ' + returned_u[1]);
    } catch (e) {
        return ('Error received trying to sign you in : ' + e);
    }
}
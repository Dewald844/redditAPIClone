import * as user from "../Domain/user.js";
import * as db from "../Database/user.js";
import jwt from 'jsonwebtoken';
const jwt_salt = "";

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
    let user = await db.readUserByEmail(email);

    if (!user) {
        throw "User not found in database, please ensure email is correct";
    } else {
        if (await helpers.confirmLogin(password, user.user_password)) {
            const token = jwt.sign({ user_id: user.user_id, user_name: user.user_name }, secretKey, { expiresIn: '1h' });
            return { token };
        } else {
            throw "Email and/or password does not match";
        }
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to authenticate token' });
        }
        req.user_id = decoded.user_id;
        next();
    });
};
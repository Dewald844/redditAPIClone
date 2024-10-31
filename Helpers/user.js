import bcrypt from "bcrypt";

export const generateHashedPassword = async (password) => {
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

        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject("Error encountered hashing user password: " + err);
                } else {
                    resolve(hash);
                }
            });
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
};
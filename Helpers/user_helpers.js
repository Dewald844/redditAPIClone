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

export const confirmLogin = async (enteredPassword, passwordFromDatabase) => {
    if (await comparePassword(enteredPassword, passwordFromDatabase)) {
        return true
    } else {
        throw "Invalid email or password";
    }
}
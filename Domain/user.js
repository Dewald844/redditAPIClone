import bcrypt from 'bcrypt';
import csv_reader from 'csv-parser';
import csv_writer from 'csv-writer';
import fs from 'fs';

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

export const readUsers = async () =>  {

    let users = [];

    fs.createReadStream('Database/users.csv')
        .pipe(csv_reader())
        .on('data', (row) => {
            users.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        })
        .on('error', (error) => {
            console.log("Error encountered reading users from database" + error);
        });

    return users;
}

// Writer methods

export const writeUsers = async (users) => {
    const csvWriter = csv_writer.createObjectCsvWriter({
        path: 'Database/users.csv',
        header: [
            {id: 'user_id', title: 'USER_ID'},
            {id: 'user_name', title: 'USER_NAME'},
            {id: 'email_address', title: 'EMAIL_ADDRESS'},
            {id: 'user_password', title: 'USER_PASSWORD'}
        ]
    });

    try {
        await csvWriter.writeRecords(users);
        console.log("CSV file successfully written");
    } catch (err) {
        console.log("Error writing CSV file: " + err);
    }
}

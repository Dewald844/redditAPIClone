import {sql} from "./db.js";

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
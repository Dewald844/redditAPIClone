import postgres from "postgres";
import {neon} from "@neondatabase/serverless";
"use server";

export const sql = neon(process.env.DATABASE_URL);
//https://github.com/porsager/postgres
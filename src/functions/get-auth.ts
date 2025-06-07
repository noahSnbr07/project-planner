"use server";

import auth from "@/interfaces/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// This function returns the decoded data if valid, or null if invalid
export default async function getAuth(): Promise<auth | null> {

    //retrieve key, token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value as string;
    const key = process.env.JWT_SECRET as string;

    try {

        //decode token
        const decoded = jwt.verify(token, key);
        if (decoded) return decoded as auth;
    } catch {

        //error
        return null;
    }

    //error
    return null;
}

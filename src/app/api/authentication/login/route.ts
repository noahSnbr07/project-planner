import APIResponse from '@/interfaces/api-response';
import database from '@/lib/database';
import { NextResponse, NextRequest } from 'next/server';
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";
import { cookies } from 'next/headers';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    // retrieve form data
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    //retrieve jwt secret for signing
    const secret = process.env.JWT_SECRET as string;

    const cookieStore = await cookies();

    //check validity
    const validFormData: boolean =
        name !== null && name.length > 0 && password !== null && password.length > 1;

    if (!validFormData) return NextResponse.json({
        success: false,
        data: null,
        message: "Invalid form schema",
        status: 400,
    });

    try {

        //retrieve target user
        const target = await database.user.findUnique({ where: { name } });
        if (!target) return NextResponse.json({
            success: false,
            data: null,
            message: "User not found",
            status: 404,
        });

        //compare hashes
        const match: boolean = await compare(password, target.hash);
        if (!match) return NextResponse.json({
            success: false,
            data: null,
            message: "Password incorrect",
            status: 200,
        });


        //write jwt to cookies
        const token = sign({
            id: target.id,
            name: target.id,
            suspended: target.id,
            superuser: target.id,
            workspaceId: target.id,
        }, secret, { expiresIn: "24h" });
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            maxAge: (24 * 60 * 60),
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            priority: "high",
        });

        return NextResponse.json({
            success: true,
            data: null,
            message: "Success",
            status: 200,
        });


    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null,
            error: error instanceof Error && error || null,
            message: "Success",
            status: 500
        });
    }
}
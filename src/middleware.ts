import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import APIResponse from './interfaces/api-response';
import getPrefix from './functions/get-prefix';

export async function middleware(request: NextRequest) {
    const prefix = getPrefix();

    const url: URL = new URL(`${prefix}api/authentication/verify`, request.url);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                cookie: request.headers.get("cookie") || ""
            }
        });

        const data: APIResponse = await response.json();

        if (data.success) return NextResponse.next();

        return NextResponse.redirect(new URL('/authentication', request.url));

    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/authentication', request.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/project/:id'],
};
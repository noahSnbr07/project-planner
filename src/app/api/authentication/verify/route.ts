import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    const auth = await getAuth();

    return NextResponse.json({
        success: auth !== null,
        data: null,
        message: "",
        status: 200,
    });
}
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<APIResponse>> {

    const auth = await getAuth();

    return NextResponse.json({
        success: auth !== null,
        data: null,
        message: "",
        status: 200,
    });
}
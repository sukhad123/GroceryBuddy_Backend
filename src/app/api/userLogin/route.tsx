import { NextResponse } from 'next/server';
import { validateUser } from "../../../lib/prisma";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();

    // 2. Validate user
    const res = await validateUser(data.email, data.password);

    // 3. Handle validation response
    if (res?.error) {
      return NextResponse.json(
        { error: res.error },
        { status: 400 }
      );
    }

    // 4. Return success response
    return NextResponse.json(
      { success: true, data: res },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  // Handle preflight request with consistent CORS headers
  return NextResponse.json(
    {},
    { 
      status: 200,
      headers: corsHeaders
    }
  );
}
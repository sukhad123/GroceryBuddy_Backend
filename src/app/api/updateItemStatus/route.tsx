import { NextResponse } from 'next/server';
import { updateItemStatus } from "../../../lib/prisma";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();
const id = Number(data.id);
console.log("coming",id);
//lets update the status of the item
await updateItemStatus(id);

    return NextResponse.json(
      { success: true, data: data },
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
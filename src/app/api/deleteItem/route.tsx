import { NextResponse } from 'next/server';
import { deleteItem,getGroupID } from "../../../lib/prisma"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();
    const id: number = Number(data.id);

    await deleteItem(id)
    
    return NextResponse.json(
        { success: true,},
        { status: 200 }
      );
   

//add user

//const groupId: number = (await getGroupID(data.adminUser)) ?? 0; // Default to 0 if null or undefined



  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
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
import { NextResponse } from 'next/server';
import { addUser,getGroupID } from "../../../lib/prisma"


const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();
    console.log('Received data:', data);
    
   

//add user
const groupId = await getGroupID(data.adminUser)??0;
;

const user = await addUser(groupId,data.newUserEmail);
    // 2. Return response
    return NextResponse.json(
      { success: true, data: user },
      { status: 200 }
    );
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
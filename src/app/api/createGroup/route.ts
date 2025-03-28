import { NextResponse } from 'next/server';
import { createGroup,addUser } from "../../../lib/prisma"

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
    
   

   const group = await createGroup(data.groupName);
//add the user in that newly created group
console.log(group);
const email:string = data.user.current;
console.log("Provided email",email);
const user = await addUser(group,email);
//update the user in that group


    // 2. Return response
    return NextResponse.json(
      { success: true },
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
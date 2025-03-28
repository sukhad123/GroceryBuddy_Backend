import { NextResponse } from 'next/server';
import { addItem,getGroupID } from "../../../lib/prisma"

export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();
    console.log('Received data:', data);
    
   

//add user
const groupId:number = await getGroupID(data.adminUser);

console.log(groupId);
const price = 100;
const item = await addItem(data.itemName,data.category, price, groupId);
//const user = await addUser(groupId,data.newUserEmail);
    // 2. Return response
    return NextResponse.json(
      { success: true, data: groupId },
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
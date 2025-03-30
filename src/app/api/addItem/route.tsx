import { NextResponse } from 'next/server';
import { addItem,getGroupID } from "../../../lib/prisma"

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:8080/',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    // 1. Get data from request
    const data = await request.json();
    console.log('Received data:', data);
    
   

//add user

const groupId: number = (await getGroupID(data.adminUser)) ?? 0; // Default to 0 if null or undefined


const price = 100;
if(groupId){
const item = await addItem(data.itemName,data.category, price, groupId);}
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
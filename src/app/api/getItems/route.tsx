import { NextResponse } from 'next/server';
import { getAllUsers, getAllUserwithGroupId, getGroupID , getItems} from "../../../lib/prisma"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Adjust this as needed for your application
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: Request) {
    let items: Array<{ name: string , category: string , price:number}> 
        [];
  try {
    // 1. Get data from request
    const data = await request.json();
    const adminUser:string = data.adminUser;
   let groupId:number = await getGroupID(adminUser)??0;
   if(groupId){
    const items = await getItems(groupId);
    console.log(items);
    return NextResponse.json(
      { success: true,items:items},
      { status: 200, headers: corsHeaders }
    );

   }

   


    // 2. Return response
   
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500, headers: corsHeaders }
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
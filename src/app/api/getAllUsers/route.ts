import { NextResponse } from 'next/server';
import { getAllUsers, getAllUserwithGroupId,getGroupName } from "../../../lib/prisma"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Adjust this as needed for your application
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: Request) {
    let userEmails: Array<{ id: string | number, email: string }> 
        [];
  try {
    // 1. Get data from request
    
    const data = await request.json();
    console.log(data);
    const adminUser:string = data.adminUser;
    let users = await getAllUsers(adminUser);
    let friends = await getAllUserwithGroupId(adminUser);
    console.log(friends);


    //get the groupName
    let groupName = await getGroupName(adminUser);

   if(users){
    const userEmails: Array<{ id: string | number, email: string }> = users?.map(user => ({ id: user.id, email: user.email })) || [];
    return NextResponse.json(
        { success: true, data: userEmails, friends:friends,groupName:groupName},
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
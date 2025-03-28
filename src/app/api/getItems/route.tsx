import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    //get the items for the user
    const { name, email } = await req.json();

    return NextResponse.json({ message: 'Data received', data: { name, email } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';

//store the items for the user
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    return NextResponse.json({ message: 'Data received', data: { name, email } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 400 });
  }
}

// pages/api/_middleware.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export function middleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  // Allow requests from specific origin
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.14:8080');  // Adjust to match your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Allow the request to pass through
  next();
}

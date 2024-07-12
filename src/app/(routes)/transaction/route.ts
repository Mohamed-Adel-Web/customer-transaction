import { NextResponse } from 'next/server';
import { transactions } from './data';
export async function GET() {
  return NextResponse.json(transactions);
}

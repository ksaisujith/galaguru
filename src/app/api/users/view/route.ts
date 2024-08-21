// app/api/users/route.ts
import { NextResponse } from 'next/server';
import pool from '../../db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public."Users"');
    client.release();
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

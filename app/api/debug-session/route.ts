import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }
    
    return NextResponse.json({
      session: {
        user: session.user,
        expires: session.expires
      }
    });
  } catch (error) {
    console.error('Debug session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
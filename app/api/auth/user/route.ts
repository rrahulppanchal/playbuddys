import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/authOptions';
import dbConnect from '@/lib/mongodb';
import User from '../model';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Remove sensitive fields if any
  const { _id, __v, ...userData } = user;
  return NextResponse.json(userData);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const data = await req.json();
  // Only update allowed fields
  const allowedFields = [
    'username', 'phone', 'bio', 'website', 'twitter', 'instagram', 'displayName', 'name', 'image'
  ];
  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      // Map displayName to name in DB
      if (key === 'displayName') {
        user.name = data[key];
      } else {
        (user as any)[key] = data[key];
      }
    }
  }
  await user.save();
  const { _id, __v, ...userData } = user.toObject();
  return NextResponse.json(userData);
} 
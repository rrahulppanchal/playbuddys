import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import dbConnect from '@/lib/mongodb';
import Event from '../model';
import User from '../../auth/model';
import { z } from 'zod';

// Zod validation schema for creating events
const createEventSchema = z.object({
  gameName: z.string().min(1, "Game name is required").max(100, "Game name too long"),
  description: z.string().min(1, "Description is required").max(1000, "Description too long"),
  peopleNeeded: z.number().int().min(1, "At least 1 person is required").max(1000, "Too many people"),
  state: z.string().min(1, "State is required").max(50, "State name too long"),
  city: z.string().min(1, "City is required").max(50, "City name too long"),
  address: z.string().min(1, "Address is required").max(200, "Address too long"),
  addressLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  sport: z.number().int().min(1, "Sport is required"),
  types: z.array(z.string()).min(1, "Select at least one type"),
  coverPhoto: z.string().optional(),
  privacy: z.enum(["public", "private"]).default("public"),
  eventPassword: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Get user ID from session
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    
    // Validate request body with Zod
    const validationResult = createEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Validation failed',
        details: validationResult.error.issues 
      }, { status: 400 });
    }

    const data = validationResult.data;

    // Additional business logic validation
    if (data.privacy === 'private' && !data.eventPassword) {
      return NextResponse.json({ 
        error: 'Event password is required for private events' 
      }, { status: 400 });
    }

    // Create new event
    const eventData = {
      ...data,
      createdBy: user._id,
    };

    const event = new Event(eventData);
    await event.save();

    // Return the created event without sensitive fields
    const { _id, __v, ...eventResponse } = event.toObject();
    
    return NextResponse.json({
      message: 'Event created successfully',
      event: eventResponse
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

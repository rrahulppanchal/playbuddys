import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import dbConnect from '@/lib/mongodb';
import Event from '../model';
import User from '../../auth/model';
import { z } from 'zod';

// Zod validation schema for updating events
const updateEventSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  gameName: z.string().min(1, "Game name is required").max(100, "Game name too long").optional(),
  description: z.string().min(1, "Description is required").max(1000, "Description too long").optional(),
  peopleNeeded: z.number().int().min(1, "At least 1 person is required").max(1000, "Too many people").optional(),
  state: z.string().min(1, "State is required").max(50, "State name too long").optional(),
  city: z.string().min(1, "City is required").max(50, "City name too long").optional(),
  address: z.string().min(1, "Address is required").max(200, "Address too long").optional(),
  addressLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  date: z.string().min(1, "Date is required").optional(),
  time: z.string().min(1, "Time is required").optional(),
  sport: z.number().int().min(1, "Sport is required").optional(),
  types: z.array(z.string()).min(1, "Select at least one type").optional(),
  coverPhoto: z.string().optional(),
  privacy: z.enum(["public", "private"]).optional(),
  eventPassword: z.string().optional(),
});

// Zod validation schema for query parameters
const queryParamsSchema = z.object({
  page: z.string().transform(val => parseInt(val)).pipe(z.number().int().min(1)).default(1),
  limit: z.string().transform(val => parseInt(val)).pipe(z.number().int().min(1).max(100)).default(10),
  sport: z.string().transform(val => parseInt(val)).pipe(z.number().int().min(1)).optional(),
  city: z.string().min(1).max(50).optional(),
  state: z.string().min(1).max(50).optional(),
  privacy: z.enum(["public", "private"]).optional(),
});

// GET all fixtures (with optional filtering)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    
    const getStr = (key: string) => {
      const val = searchParams.get(key);
      return val === null ? undefined : val;
    };

    // Validate query parameters with Zod
    const queryValidation = queryParamsSchema.safeParse({
      page: getStr('page'),
      limit: getStr('limit'),
      sport: getStr('sport'),
      city: getStr('city'),
      state: getStr('state'),
      privacy: getStr('privacy'),
    });

    if (!queryValidation.success) {
      return NextResponse.json({ 
        error: 'Invalid query parameters',
        details: queryValidation.error.issues 
      }, { status: 400 });
    }

    const { page, limit, sport, city, state, privacy } = queryValidation.data;

    // Build filter object
    const filter: any = {};
    if (sport) filter.sport = sport;
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (state) filter.state = { $regex: state, $options: 'i' };
    if (privacy) filter.privacy = privacy;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get events with pagination and filtering
    const events = await Event.find(filter)
      .populate({ path: 'createdBy', select: 'name email image' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Event.countDocuments(filter);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// PATCH to update a specific fixture
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const body = await req.json();
    
    // Validate request body with Zod
    const validationResult = updateEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Validation failed',
        details: validationResult.error.issues 
      }, { status: 400 });
    }

    const { eventId, ...updateData } = validationResult.data;

    // Get user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the event and check ownership
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if user is the creator of the event
    if (event.createdBy.toString() !== (user as any)._id.toString()) {
      return NextResponse.json({ 
        error: 'You can only update your own events' 
      }, { status: 403 });
    }

    // Additional business logic validation
    if (updateData.privacy === 'private' && !updateData.eventPassword) {
      return NextResponse.json({ 
        error: 'Event password is required for private events' 
      }, { status: 400 });
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { ...updateData },
      { new: true, runValidators: true }
    ).populate({ path: 'createdBy', select: 'name email image' });

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }

    const { _id, __v, ...eventResponse } = updatedEvent.toObject();
    
    return NextResponse.json({
      message: 'Event updated successfully',
      event: eventResponse
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 
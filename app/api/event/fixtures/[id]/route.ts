import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import dbConnect from '@/lib/mongodb';
import Event from '../../model';
import User from '../../../auth/model';
import { z } from 'zod';

// Zod validation schema for event ID
const eventIdSchema = z.object({
  id: z.string().min(1, "Event ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format"),
});

// GET specific fixture by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate event ID with Zod
    const idValidation = eventIdSchema.safeParse({ id: params.id });
    if (!idValidation.success) {
      return NextResponse.json({ 
        error: 'Invalid event ID',
        details: idValidation.error.issues 
      }, { status: 400 });
    }

    await dbConnect();
    
    const event = await Event.findById(params.id)
      .populate({ path: 'createdBy', select: 'name email image' })
      .lean();

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if event is private and user is not the creator
    if (event.privacy === 'private') {
      const user = await User.findOne({ email: session.user.email });
      if (!user || event.createdBy._id.toString() !== (user as any)._id.toString()) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ event });

  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// DELETE specific fixture by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate event ID with Zod
    const idValidation = eventIdSchema.safeParse({ id: params.id });
    if (!idValidation.success) {
      return NextResponse.json({ 
        error: 'Invalid event ID',
        details: idValidation.error.issues 
      }, { status: 400 });
    }

    await dbConnect();
    
    // Get user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the event and check ownership
    const event = await Event.findById(params.id).populate({ path: 'createdBy', select: 'name email image' });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if user is the creator of the event
    if (event.createdBy.toString() !== (user as any)._id.toString()) {
      return NextResponse.json({ 
        error: 'You can only delete your own events' 
      }, { status: 403 });
    }

    // Delete the event
    await Event.findByIdAndDelete(params.id);
    
    return NextResponse.json({
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 
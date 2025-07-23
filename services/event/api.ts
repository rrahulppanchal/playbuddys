import { CreateEventInput, EventResponse, GetAllEventsResponse, Event } from './types';

export async function createEvent(data: CreateEventInput): Promise<EventResponse> {
  const res = await fetch('/api/event/create-fixture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create event');
  }

  return res.json();
}

export async function getAllEvents(params?: { page?: number; limit?: number; sport?: number; city?: string; state?: string; privacy?: 'public' | 'private' }) : Promise<GetAllEventsResponse> {
  const search = new URLSearchParams();
  if (params) {
    if (params.page) search.append('page', params.page.toString());
    if (params.limit) search.append('limit', params.limit.toString());
    if (params.sport) search.append('sport', params.sport.toString());
    if (params.city) search.append('city', params.city);
    if (params.state) search.append('state', params.state);
    if (params.privacy) search.append('privacy', params.privacy);
  }
  const res = await fetch(`/api/event/fixtures?${search.toString()}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch events');
  }
  return res.json();
}

export async function getEventById(id: string): Promise<Event> {
  const res = await fetch(`/api/event/fixtures/${id}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch event');
  }
  const data = await res.json();
  return data.event;
}

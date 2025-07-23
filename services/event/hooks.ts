import { useMutation, useQuery } from '@tanstack/react-query';
import { createEvent, getAllEvents, getEventById } from './api';
import { CreateEventInput, EventResponse, GetAllEventsResponse, Event } from './types';

export function useCreateEvent() {
  return useMutation<EventResponse, Error, CreateEventInput>({
    mutationFn: createEvent,
  });
}

export function useAllEvents(params?: { page?: number; limit?: number; sport?: number; city?: string; state?: string; privacy?: 'public' | 'private' }) {
  return useQuery<GetAllEventsResponse, Error>({
    queryKey: ['events', params],
    queryFn: () => getAllEvents(params),
  });
}

export function useEventById(id: string) {
  return useQuery<Event, Error>({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
}

export interface CreateEventInput {
  gameName: string;
  description: string;
  peopleNeeded: number;
  state: string;
  city: string;
  address: string;
  addressLink?: string;
  date: string;
  time: string;
  sport: number;
  types: string[];
  coverPhoto?: string;
  privacy: 'public' | 'private';
  eventPassword?: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Event {
  _id: string;
  gameName: string;
  description: string;
  peopleNeeded: number;
  state: string;
  city: string;
  address: string;
  addressLink?: string;
  date: string;
  time: string;
  sport: number;
  types: string[];
  coverPhoto?: string;
  privacy: 'public' | 'private';
  eventPassword?: string;
  createdBy: UserInfo;
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  message: string;
  event: Event;
}

export interface GetAllEventsResponse {
  events: Event[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

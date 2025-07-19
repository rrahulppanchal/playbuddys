import { Profile } from './types';

export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const res = await fetch('/api/auth/user');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const res = await fetch('/api/auth/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update profile');
    }
    return res.json();
  },
};
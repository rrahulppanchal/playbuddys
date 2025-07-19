import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { Profile } from './types';

export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
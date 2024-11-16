import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../BaseUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: '/login',
        method: 'POST',
        body: credential,
        credentials: 'include',
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/updateProfile',
        method: 'PUT',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (passwordCredentials) => ({
        url: '/updatePassword',
        method: 'PUT',
        body: passwordCredentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useDeleteItemMutation,
  useProfileQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
} = apiSlice;

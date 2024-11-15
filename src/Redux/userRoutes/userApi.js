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
    addItem: builder.mutation({
      query: (itemData) => ({
        url: '/items',
        method: 'POST',
        body: itemData,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: 'DELETE',
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useLoginMutation,
  useSignupMutation,
  useAddItemMutation,
  useDeleteItemMutation,
  useProfileQuery,
  useLogoutQuery,
} = apiSlice;

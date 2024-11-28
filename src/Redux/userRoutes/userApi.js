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
  tagTypes: ['Users'],
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
    deleteProfile: builder.mutation({
      query: () => ({
        url: '/delete',
        method: 'DELETE',
        credentials: 'include',
      }),
    }),

    // admin apis
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/deleteuser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, updatedUserData }) => ({
        url: `/updateuser/${id}`,
        method: 'POST',
        body: updatedUserData,
      }),
      invalidatesTags: ['Users'],
    }),
    forgotPasswordOtp: builder.mutation({
      query: (email) => ({
        url: '/forgetPassword',
        method: 'POST',
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/verifyOTP',
        method: 'POST',
        body: { email, otp },
      }),
    }),
    confirmResetPassword: builder.mutation({
      query: ({ newPassword, email }) => ({
        url: '/resetPassword',
        method: 'PUT',
        body: { newPassword, email },
      }),
    }),
    verifyUserOtp: builder.mutation({
      query: ({ email, userOtp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { email, userOtp },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useProfileQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useDeleteProfileMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordOtpMutation,
  useVerifyOtpMutation,
  useConfirmResetPasswordMutation,
  useVerifyUserOtpMutation,
} = apiSlice;

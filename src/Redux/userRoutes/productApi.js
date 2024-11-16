import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../BaseUrl';

export const productApi = createApi({
  reducerPath: 'product',
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
    getAllProducts: builder.query({
      query: () => ({
        url: '/getAllProducts',
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
